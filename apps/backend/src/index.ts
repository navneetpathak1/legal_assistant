import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import env from "dotenv";
import lawyerRouter from "./Router/lawyerRouter.js";
import userRouter from "./Router/userRouter.js";
import lawyerServiceRouter from "./Router/getPaidUser.js";
import paymentsRouter from "./Router/payments.js";
import jwt from "jsonwebtoken";

env.config();

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5175", "http://localhost:3000"],
    credentials: true, 
  })
);
app.use(express.json());

// Authentication middleware
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// API Routes
// v1
app.use("/api/v1/users", userRouter);
app.use("/api/v1/lawyers", lawyerRouter);
app.use("/api/v1/lawyers", lawyerServiceRouter);
app.use("/api/v1/payments", paymentsRouter);


// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 API Documentation: http://localhost:${PORT}/api-docs`);
});
