// File: lib/utils.js

export function safeJsonParse(text) {

  try {

    if (!text) {
      return null;
    }

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (primaryError) {
      // fallback to extracting embedded JSON
    }

    const matches = cleaned.match(/\{[\s\S]*\}/g);

    if (!matches || matches.length === 0) {
      throw new Error("No JSON found");
    }

    for (const match of matches) {
      try {
        return JSON.parse(match);
      } catch (err) {
        // continue to next match
      }
    }

    throw new Error("No valid JSON object could be parsed");

  } catch (err) {

    console.error("JSON PARSE ERROR:");
    console.error(err);

    return {
      error: true,
      raw: text
    };

  }

}