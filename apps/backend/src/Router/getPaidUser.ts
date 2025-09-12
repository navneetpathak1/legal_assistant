import { Router } from "express";
import type { Response } from "express";
import { prismaClient } from "@repo/db";
import { authenticateLawyer } from "../middleware/authLawyerMiddleware.js";
import type { AuthRequest } from "../middleware/authLawyerMiddleware.js";

const lawyerServiceRouter = Router();

// Get all users who paid this lawyer
lawyerServiceRouter.get(
  "/clients",
  authenticateLawyer,
  async (req: AuthRequest, res: Response) => {
    try {
      const { lawyer } = req;
      if (!lawyer) return res.status(401).json({ error: "Unauthorized" });
      
      const payments = await prismaClient.payment.findMany({
        where: {
          receiverId: lawyer.userId!, // lawyer is linked to a User
          purpose: "LAWYER_BOOKING",
          success: true,
        },
        include: {
          sender: true, // get payer info
        },
      });

      const clients = payments.map((p) => ({
        id: p.sender.id,
        name: p.sender.name,
        email: p.sender.email,
        country: p.sender.country,
        amountPaid: p.amount,
        paymentDate: p.paymentTime,
      }));

      return res.json({ success: true, clients });
    } catch (error) {
      console.error("Error fetching clients:", error);
      return res.status(500).json({ error: "Failed to fetch clients" });
    }
  }
);

export default lawyerServiceRouter;
