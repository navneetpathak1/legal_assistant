import { Router } from "express";
import { prismaClient } from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticateLawyer, type AuthRequest } from "../middleware/authLawyerMiddleware.js";
import type { Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
// Razorpay test keys - replace with your actual keys
const TEST_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_your_key_id";
const TEST_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "your_test_key_secret";

const lawyerRouter = Router();
const JWT_SECRET = "your_jwt_secret";  // we will update this in production

// REGISTER
lawyerRouter.post("/register", async (req, res) => {
  console.log("register route");
  console.log("Request body:", req.body);

  try {
    const { name, email, password, phone, country, specialization, availableFrom, availableTo, charge } = req.body;

    console.log("Extracted fields:", { name, email, password: "***", phone, country, specialization, availableFrom, availableTo, charge });

    if (!name || !email || !password || !country) {
      console.log("Validation failed - missing required fields");
      return res.status(400).json({ error: "Name, email, password, and country are required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle charge: convert to number, default to 1000 if not provided or invalid
    let lawyerCharge = 1000; // default value
    if (charge) {
      const parsedCharge = Number(charge);
      if (!isNaN(parsedCharge) && parsedCharge > 0) {
        lawyerCharge = parsedCharge;
      }
    }
    console.log("Final charge value:", lawyerCharge);

    console.log("Attempting to create lawyer with data:", {
      name,
      email,
      phone,
      country,
      charge: lawyerCharge,
      specialization,
      availableFrom: availableFrom ? new Date(availableFrom) : null,
      availableTo: availableTo ? new Date(availableTo) : null,
    });

    const newLawyer = await prismaClient.lawyer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        country,
        charge: lawyerCharge,
        specialization,
        availableFrom: availableFrom ? new Date(availableFrom) : null,
        availableTo: availableTo ? new Date(availableTo) : null,
      },
    });

    console.log("Lawyer created successfully:", newLawyer.id);

    res.status(201).json({ message: "Lawyer registered successfully", lawyer: newLawyer });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

// LOGIN    
lawyerRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const lawyer = await prismaClient.lawyer.findUnique({ where: { email } });
    if (!lawyer) return res.status(404).json({ error: "Lawyer not found" });

    const passwordValid = await bcrypt.compare(password, lawyer.password);
    if (!passwordValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: lawyer.id, email: lawyer.email }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Profile
lawyerRouter.get("/profile", authenticateLawyer, async (req: AuthRequest, res) => {
  // all code in authMiddleware
  res.json(req.lawyer);
});

// update
lawyerRouter.put("/update", authenticateLawyer, async (req: AuthRequest, res) => {
  try {
    const { name, phone, country, specialization, availableFrom, availableTo, password } = req.body;

    const dataToUpdate: any = {};

    if (name) dataToUpdate.name = name;
    if (phone) dataToUpdate.phone = phone;
    if (country) dataToUpdate.country = country;
    if (specialization) dataToUpdate.specialization = specialization;
    if (availableFrom) dataToUpdate.availableFrom = new Date(availableFrom);
    if (availableTo) dataToUpdate.availableTo = new Date(availableTo);
    if (password) dataToUpdate.password = await bcrypt.hash(password, 10);

    const updatedLawyer = await prismaClient.lawyer.update({
      where: { id: req.lawyer.id },
      data: dataToUpdate,
    });

    res.json({ message: "Profile updated successfully", lawyer: updatedLawyer });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 

const razorpay = new Razorpay({
  key_id: TEST_KEY_ID!,
  key_secret: TEST_KEY_SECRET!,
});


// Create Order
lawyerRouter.post("/create-order/:lawyerId", async (req, res) => {
  try {
    const { lawyerId } = req.params;

    const lawyer = await prismaClient.lawyer.findUnique({
      where: { id: Number(lawyerId) },
    });

    if (!lawyer) return res.status(404).json({ error: "Lawyer not found" });

    const amount = lawyer.charge ?? 1000; // fallback if null

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `receipt_lawyer_${lawyerId}_${Date.now()}`,
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
lawyerRouter.post("/verify", authenticateLawyer, async (req: AuthRequest, res: Response) => {
  try {
    const { lawyer } = req;
    if (!lawyer) return res.status(401).json({ error: "Unauthorized" });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", TEST_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const dbLawyer = await prismaClient.lawyer.findUnique({
      where: { id: lawyer.id },
    });

    if (!dbLawyer?.userId) {
      return res.status(404).json({ error: "Lawyer not found in DB" });
    }

    const updatedLawyer = await prismaClient.lawyer.update({
      where: { id: dbLawyer.id },
      data: { subscription: "PREMIUM" },
    });

    await prismaClient.payment.create({
      data: {
        senderId: dbLawyer.userId,
        receiverId: dbLawyer.userId,
        amount: dbLawyer.charge ?? 1000, // ₹ not paise
        success: true,
        purpose: "SUBSCRIPTION",
      },
    });

    return res.json({
      success: true,
      message: "Payment successful, subscription upgraded",
      lawyer: updatedLawyer,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return res.status(500).json({ error: "Payment verification failed" });
  }
});


export default lawyerRouter;