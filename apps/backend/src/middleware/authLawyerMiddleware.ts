import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export interface AuthRequest extends Request {
  lawyer?: any; // You can keep it `any` or type with Prisma type if needed
}

export const authenticateLawyer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token missing" });

    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string };

    const lawyer = await prismaClient.lawyer.findUnique({ where: { id: payload.id } });
    if (!lawyer) return res.status(401).json({ error: "Lawyer not found" });

    req.lawyer = lawyer;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
