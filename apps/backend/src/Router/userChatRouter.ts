import { Router } from "express";
import { prismaClient } from "@repo/db";
import { GOOGLE_API_KEY } from "../config.js";

const chatRouter = Router();

const GEMINI_API_KEY = GOOGLE_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

chatRouter.post("/send", async (req, res) => {
  try {
    const { userId, message, country, conversationId } = req.body;

    let conversation;

    if (!conversationId) {
      conversation = await prismaClient.conversation.create({
        data: {
          userId,
          title: message.slice(0, 30) + "...",
        },
      });
    } else {
      conversation = await prismaClient.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
    }

    const count = await prismaClient.chat.count({
      where: { conversationId: conversation.id },
    });

    if (count >= conversation.limit) {
      return res.status(403).json({
        error: "Chat limit reached for this conversation (30 messages).",
        conversationId: conversation.id,
      });
    }

    await prismaClient.chat.create({
      data: {
        conversationId: conversation.id,
        role: "user",
        message,
      },
    });

    const chats = await prismaClient.chat.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: "asc" },
      take: 30,
    });

    const contents = chats.map((c) => ({
      role: c.role === "user" ? "user" : "model",
      parts: [{ text: c.message }],
    }));

    const contentsAdd = `You are a helpful legal assistant for all people. Think according to the people of ${country}. 
    The question is: ${message} and please consider previous chat also: ${contents} and reply like I am 15 year old. 
    Answer clearly and in simpler language so that everyone can understand. 
    And Also mansion according to which law or rules your replay is based`;

    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    await prismaClient.chat.create({
      data: {
        conversationId: conversation.id,
        role: "bot",
        message: reply,
      },
    });

    res.json({
      reply,
      conversationId: conversation.id,
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
});

export default chatRouter;
