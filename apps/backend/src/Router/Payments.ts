import express from "express";
import crypto from "crypto";
import { TEST_KEY_SECRET } from "../config.js";

import { Router } from "express";

const paymentRoute = Router();

paymentRoute.post("/payment/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", TEST_KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.send({ success: true, message: "Payment verified" });
  } else {
    res.status(400).send({ success: false, message: "Invalid signature" });
  }
});

export default paymentRoute;