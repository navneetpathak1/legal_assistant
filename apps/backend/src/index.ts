import express from "express";
import lawyerRouter from './Router/lawyerRouter.js';
import userRouter  from './Router/userRouter.js';

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/lawyers", lawyerRouter);


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
});
