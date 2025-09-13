import express from "express";
import type { Application } from "express";
import cors from "cors";

import lawyerRouter from "./Router/lawyerRouter.js";
import userRouter from "./Router/userRouter.js";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5175", "http://localhost:3000"], 
    credentials: true, 
  })
);

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/lawyers", lawyerRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
