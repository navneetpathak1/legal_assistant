import { Router } from "express";
import type { Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { prismaClient } from "@repo/db";
import { authenticateLawyer } from "../middleware/authLawyerMiddleware.js";
import type { AuthRequest } from "../middleware/authLawyerMiddleware.js";
import { TEST_KEY_ID, TEST_KEY_SECRET } from "../config.js";

const paymentRouter = Router();

const razorpay = new Razorpay({
  key_id: TEST_KEY_ID!,
  key_secret: TEST_KEY_SECRET!,
});


// Create Order
paymentRouter.post("/create-order/:lawyerId", async (req, res) => {
  try {
    const { lawyerId } = req.params;

    const lawyer = await prismaClient.lawyer.findUnique({
      where: { id: Number(lawyerId) },
    });

    if (!lawyer) {
      return res.status(404).json({ error: "Lawyer not found" });
    }

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
paymentRouter.post("/verify", authenticateLawyer, async (req: AuthRequest, res: Response) => {
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
        amount: (dbLawyer.charge ?? 1000), // ₹ not paise
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


export default paymentRouter;
