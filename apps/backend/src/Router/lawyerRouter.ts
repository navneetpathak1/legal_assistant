import { Router } from "express";
import { prismaClient } from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticateLawyer, type AuthRequest } from "../middleware/authLawyerMiddleware.js";

const lawyerRouter = Router();
const JWT_SECRET = "your_jwt_secret";  // we will update this in production

// REGISTER
lawyerRouter.post("/register", async (req, res) => {
    console.log("register routes");
    
  try {
    const { name, email, password, phone, country, specialization, availableFrom, availableTo } = req.body;

    if (!name || !email || !password || !country) {
      return res.status(400).json({ error: "Name, email, password, and country are required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newLawyer = await prismaClient.lawyer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        country,
        specialization,
        availableFrom: availableFrom ? new Date(availableFrom) : null,
        availableTo: availableTo ? new Date(availableTo) : null,
      },
    });

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

export default lawyerRouter;