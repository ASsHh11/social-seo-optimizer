// File: lib/aiRouter.js

import Groq from "groq-sdk";

const isValidKey = (key) =>
  typeof key === "string" &&
  key.trim() !== "" &&
  !/^your[_-]/i.test(key) &&
  !/your .* key/i.test(key);

function getKeys() {
  // Sirf Groq ki keys uthayega kyunki ab sab kuch free engine par chalega
  return [
    process.env.GROQ_KEY_1,
    process.env.GROQ_KEY_2
  ].filter(isValidKey);
}

function assertKeysAvailable(keys) {
  if (keys.length === 0) {
    throw new Error(
      "No valid GROQ API keys configured. Please set GROQ_KEY_1 or GROQ_KEY_2 in .env.local."
    );
  }
}

// 1. GROQ TEXT ENGINE (For normal text prompts)
export async function runGroq(prompt) {
  const GROQ_KEYS = getKeys();
  assertKeysAvailable(GROQ_KEYS);

  for (const key of GROQ_KEYS) {
    try {
      console.log("Using GROQ Text Engine...");
      const groq = new Groq({ apiKey: key });

      const completion = await groq.chat.completions.create({
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
      console.error("GROQ TEXT ERROR, trying next key:", err.message);
      if (err?.status === 429) {
        continue; // Key 1 overload hui to Key 2 par shift ho jayega
      }
      throw err;
    }
  }

  throw new Error("All GROQ text keys failed");
}

// 2. 100% FREE GROQ VISION ENGINE (Gemini wrapper replacement for images)
export async function runGemini(prompt, media) {
  const GROQ_KEYS = getKeys();
  assertKeysAvailable(GROQ_KEYS);

  // Payload extraction safely
  let base64Data = "";
  let mimeType = "image/jpeg";

  if (typeof media === "string") {
    base64Data = media;
  } else if (media && media.data) {
    base64Data = media.data;
    if (media.mimeType) mimeType = media.mimeType;
  } else {
    // Agar koi media valid format mein nahi mila
    throw new Error("Invalid media payload configuration for Groq Vision.");
  }

  for (const key of GROQ_KEYS) {
    try {
      console.log("Using GROQ Vision Engine (Free Llama 3.2)...");
      const groq = new Groq({ apiKey: key });

      // Standard Groq Vision implementation
      const completion = await groq.chat.completions.create({
        model: "llama-3.2-11b-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64Data}`
                }
              }
            ]
          }
        ],
        temperature: 0.7
      });

      return completion.choices[0].message.content;
    } catch (err) {
      console.error("GROQ VISION ERROR, trying next key:", err.message);
      if (err?.status === 429) {
        continue;
      }
      throw err;
    }
  }

  throw new Error("All GROQ vision keys failed");
}