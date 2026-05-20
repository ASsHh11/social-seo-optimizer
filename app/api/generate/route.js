// File: app/api/generate/route.js

import { NextResponse } from "next/server";

import {
  runGroq,
  runGemini
} from "@/lib/aiRouter";

import {
  buildPrompt
} from "@/lib/prompts";

import {
  safeJsonParse
} from "@/lib/utils";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      idea,
      platforms,
      media
    } = body;

    // Validation
    if (!idea || platforms.length === 0) {

      return NextResponse.json(
        {
          error: true,
          message: "Idea and platform selection required"
        },
        {
          status: 400
        }
      );

    }

    // Build AI Prompt
    const prompt = buildPrompt(
      idea,
      platforms
    );

    let rawResponse = "";

    // ROUTING LOGIC
    if (media) {

      console.log("Using Gemini Model");

      rawResponse = await runGemini(
        prompt,
        media
      );

    } else {

      console.log("Using Groq Model");

      rawResponse = await runGroq(prompt);

    }

    // DEBUGGING
    console.log("========== RAW AI RESPONSE ==========");
    console.log(rawResponse);
    console.log("=====================================");

    // Parse JSON safely
    const parsed = safeJsonParse(
      rawResponse
    );

    // If parsing failed
    if (parsed?.error) {

      return NextResponse.json(
        {
          error: true,
          message: "AI returned invalid JSON",
          raw: rawResponse
        },
        {
          status: 500
        }
      );

    }

    return NextResponse.json(parsed);

  } catch (error) {

    console.error("API ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        error: true,
        message: error.message || "Internal Server Error"
      },
      {
        status: 500
      }
    );

  }

}