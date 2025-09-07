import { prismaClient } from '@repo/db';
import express from "express";

const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { name, email, country } = req.body;

    if (!name || !email || !country) {
      return res.status(400).json({ error: "Name, email, and country are required" });
    }

    const user = await prismaClient.user.create({
      data: { name, email, country },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Prisma unique constraint violation
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
});
