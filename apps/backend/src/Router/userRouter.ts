import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { prismaClient } from "@repo/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    res.status(201).json({
      message: "User registered successfully",
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





export default userRouter;
