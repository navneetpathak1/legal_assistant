import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { prismaClient } from "@repo/db";
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { TEST_KEY_ID, TEST_KEY_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

if (!TEST_KEY_ID || !TEST_KEY_SECRET) {
  throw new Error('Razorpay credentials are not configured. Please set TEST_KEY_ID and TEST_KEY_SECRET in your config file');
}

const razorpay = new Razorpay({
  key_id: TEST_KEY_ID,
  key_secret: TEST_KEY_SECRET,
});

// Authentication middleware
const authenticateUser = (req: Request & { user?: any }, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create Razorpay order for lawyer consultation
router.post('/create-order/lawyer/:lawyerId', authenticateUser, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { lawyerId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    
    if (!lawyerId) {
      return res.status(400).json({ success: false, message: 'Lawyer ID is required' });
    }
    
    const lawyer = await prismaClient.lawyer.findUnique({
      where: { id: parseInt(lawyerId) },
      select: { charge: true }
    });
    
    if (!lawyer || lawyer.charge === null) {
      return res.status(404).json({ success: false, message: 'Lawyer not found or consultation fee not set' });
    }
    
    const amount = Math.round(lawyer.charge * 100); // Convert to paise
    const description = `Consultation with Lawyer ${lawyerId}`;
    
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
      notes: {
        userId: userId,
        lawyerId: lawyerId,
        type: 'consultation'
      }
    };
    
    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order,
      amount: amount / 100, // Convert back to rupees for frontend
      description
    });
    
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create Razorpay order for pro subscription
router.post('/create-order/pro-subscription', authenticateUser, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { lawyerId } = req.params;
    const userId = req.user?.id; // Now properly typed with our extended Request type
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    
    // Calculate amount based on whether it's a lawyer consultation or pro subscription
    let amount = 29900; // Default pro subscription amount in paise (₹299)
    let description = 'LegalAssist Pro Subscription';
    
    if (lawyerId && lawyerId !== '1') {
      const lawyer = await prismaClient.lawyer.findUnique({
        where: { id: parseInt(lawyerId) },
      });
      
      if (!lawyer) {
        return res.status(404).json({ success: false, message: 'Lawyer not found' });
      }
      
      amount = (lawyer.charge || 1000) * 100; // Convert to paise
      description = `Consultation with ${lawyer.name}`;
    }

    const options = {
      amount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
      notes: {
        type: lawyerId ? 'consultation' : 'subscription',
        lawyerId: lawyerId || null,
      },
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      description,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Verify payment
router.post('/verify', authenticateUser, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing required payment details' });
    }

    // Verify the payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', TEST_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // Get order details
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const { notes } = order;

    // Validate notes exist and have required fields
    if (!notes || typeof notes !== 'object' || !('type' in notes) || !('userId' in notes)) {
      return res.status(400).json({ success: false, message: 'Invalid order details' });
    }

    // Type assertion since we've validated the shape
    const orderNotes = notes as { type: string; userId: string; lawyerId?: string };
    const orderUserId = parseInt(orderNotes.userId);
    
    if (isNaN(orderUserId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID in order' });
    }

    // Verify the user making the request matches the order user
    if (orderUserId !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to this order' });
    }
    // Update user subscription or create payment record
    if (orderNotes.type === 'subscription') {
      await prismaClient.user.update({
        where: { id: userId },
        data: { subscription: 'PREMIUM' },
      });
    } else if (orderNotes.type === 'consultation' && orderNotes.lawyerId) {
      // For lawyer consultation
      await prismaClient.payment.create({
        data: {
          amount: Number(order.amount) / 100, // Convert to number and then to base unit
          senderId: userId,
          receiverId: parseInt(orderNotes.lawyerId),
          purpose: 'LAWYER_BOOKING',
          success: true,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and processed successfully',
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify payment',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
