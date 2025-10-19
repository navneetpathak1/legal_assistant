import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { prismaClient } from "@repo/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

const userRouter = Router();
const JWT_SECRET = "your_jwt_secret";

// REGISTER 
userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, country } = req.body;

    if (!name || !email || !password || !country) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: { name, email, password: hashedPassword, country },
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN 
userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// AUTH MIDDLEWARE
const authenticateUser = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// PROFILE
userRouter.get("/profile", authenticateUser, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        createdAt: true,
        subscription: true,
        conversations: { 
          select: {
            id: true,
            title: true,
            createdAt: true,
            chats: {  
              select: {
                id: true,
                role: true,
                message: true,
                createdAt: true,
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ profile: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// meeting
userRouter.get("/availableProfile", authenticateUser, async (req, res) => {
  try {
    const now = new Date();
    const lawyers = await prismaClient.lawyer.findMany({
      where: {
        availableFrom: { lte: now },
        availableTo: { gte: now },
      },
      orderBy: [
        { subscription: 'desc' },
        { availableTo: 'desc' }  
      ],
      select: {
        id: true,
        name: true,
        email: true,
        password: false,      
        phone: true,
        country: true,
        specialization: true,
        availableFrom: true,
        availableTo: true,
        subscription: true,
      }
    });

    res.json(lawyers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || '';
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

userRouter.post("/send", async (req, res) => {
  try {
    const { userId, message, country, conversationId } = req.body;

    let conversation;

    if (!conversationId) {
      conversation = await prismaClient.conversation.create({
        data: {
          userId,
          title: message.slice(0, 30) + "...",
        },
      });
    } else {
      conversation = await prismaClient.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
    }

    const count = await prismaClient.chat.count({
      where: { conversationId: conversation.id },
    });

    if (count >= conversation.limit) {
      return res.status(403).json({
        error: "Chat limit reached for this conversation (30 messages).",
        conversationId: conversation.id,
      });
    }

    await prismaClient.chat.create({
      data: {
        conversationId: conversation.id,
        role: "user",
        message,
      },
    });

    const chats = await prismaClient.chat.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: "asc" },
      take: 30,
    });

    const contents = chats.map((c) => ({
      role: c.role === "user" ? "user" : "model",
      parts: [{ text: c.message }],
    }));

    const contentsAdd = `You are a helpful legal assistant for all people. Think according to the people of ${country}. 
    The question is: ${message} and please consider previous chat also: ${contents} and reply like I am 15 year old. 
    Answer clearly and in simpler language so that everyone can understand. 
    And Also mansion according to which law or rules your replay is based`;

    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentsAdd }),
    });

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    await prismaClient.chat.create({
      data: {
        conversationId: conversation.id,
        role: "bot",
        message: reply,
      },
    });

    res.json({
      reply,
      conversationId: conversation.id,
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
});

// payment route

// Create order for user subscription
userRouter.post("/create-order/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const price = 20000; // Subscription price in rupees

    const user = await prismaClient.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const amount = price; // Use fixed subscription price

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `receipt_user_${userId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Verify Payment
userRouter.post("/verify", authenticateUser, async (req, res: Response) => {
  try {
    const { user } = req;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const dbUser = await prismaClient.user.findUnique({
      where: { id: parseInt(user.userId) },
    });

    if (!dbUser) {
      return res.status(404).json({ error: "User not found in DB" });
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: dbUser.id },
      data: { subscription: "PREMIUM" },
    });

    await prismaClient.payment.create({
      data: {
        senderId: dbUser.id,
        receiverId: dbUser.id,
        amount: 20000, // ₹ not paise
        success: true,
        purpose: "SUBSCRIPTION",
      },
    });

    return res.json({
      success: true,
      message: "Payment successful, subscription upgraded",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return res.status(500).json({ error: "Payment verification failed" });
  }
});



export default userRouter;
