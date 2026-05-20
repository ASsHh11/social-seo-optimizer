// File: lib/aiRouter.js

import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const isValidKey = (key) =>
  typeof key === "string" &&
  key.trim() !== "" &&
  !/^your[_-]/i.test(key) &&
  !/your .* key/i.test(key);

function getKeys(provider) {
  if (provider === "groq") {
    return [
      process.env.GROQ_KEY_1,
      process.env.GROQ_KEY_2
    ].filter(isValidKey);
  }

  return [
    process.env.GEMINI_KEY_1,
    process.env.GEMINI_KEY_2,
    process.env.GEMINI_KEY_3
  ].filter(isValidKey);
}

function assertKeysAvailable(keys, provider) {
  if (keys.length === 0) {
    throw new Error(
      `No valid ${provider.toUpperCase()} API keys configured. Set ${provider.toUpperCase()}_KEY_1 or ${provider.toUpperCase()}_KEY_2 in .env.local.`
    );
  }
}

// GROQ
export async function runGroq(prompt) {

  const GROQ_KEYS = getKeys("groq");
  assertKeysAvailable(GROQ_KEYS, "groq");

  for (const key of GROQ_KEYS) {

    try {

      console.log("Using GROQ KEY");

      const groq = new Groq({
        apiKey: key
      });

      const completion =
        await groq.chat.completions.create({

          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "user",
              content: prompt
            }
          ],

          temperature: 0.7

        });

      return completion.choices[0].message.content;

    } catch (err) {

      console.error("GROQ ERROR:");
      console.error(err);

      if (err?.status === 429) {
        continue;
      }

      throw err;

    }

  }

  throw new Error("All GROQ keys failed");

}

// GEMINI
export async function runGemini(
  prompt,
  media
) {

  const GEMINI_KEYS = getKeys("gemini");
  assertKeysAvailable(GEMINI_KEYS, "gemini");

  for (const key of GEMINI_KEYS) {

    try {

      console.log("Using GEMINI KEY");

      console.log("Using GEMINI KEY");

      const genAI =
        new GoogleGenerativeAI({
          apiKey: key
        });

      const model =
        genAI.getGenerativeModel({
          model: "gemini-1.5-flash"
        });

      const result =
        await model.generateContent([
          prompt,
          {
            inlineData: {
              mimeType: "audio/mp3",
              data: media
            }
          }
        ]);

      return result.response.text();

    } catch (err) {

      console.error("GEMINI ERROR:");
      console.error(err);

      if (err.status === 429) {
        continue;
      }

      throw err;

    }

  }

  throw new Error("All GEMINI keys failed");

}