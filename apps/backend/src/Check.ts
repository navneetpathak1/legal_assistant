import axios from "axios";
import { GOOGLE_API_KEY } from "./config.js";

async function run() {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`,
    {
      contents: [{ role: "user", parts: [{ text: "Hello Gemini!" }] }],
    },
    { headers: { "Content-Type": "application/json" } }
  );
  const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("Gemini says:", text);
}

run();
