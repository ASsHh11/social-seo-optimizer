// File: lib/prompts.js

export function buildPrompt(
  idea,
  platforms
) {

  return `
You are a world-class viral social media strategist.

Generate optimized content for:
${platforms.join(", ")}

USER IDEA:
${idea}

STRICT RULES:

1. RETURN ONLY ONE VALID JSON OBJECT
2. NO markdown
3. NO explanation
4. NO intro text
5. NO \`\`\`
6. ALL platforms INSIDE same JSON

Required format:

{
  "Instagram": {
    "titles": [
      {
        "text": "Title",
        "score": "96% Reach Score"
      },
      {
        "text": "Title",
        "score": "94% Reach Score"
      },
      {
        "text": "Title",
        "score": "92% Reach Score"
      }
    ],
    "caption": "SEO caption here",
    "hashtags": [
      "#viral",
      "#seo"
    ],
    "bestTime": "Friday 7 PM",
    "justification": "Reason here"
  },

  "TikTok": {
    "titles": [],
    "caption": "",
    "hashtags": [],
    "bestTime": "",
    "justification": ""
  }
}

Generate:
- emotional viral hooks
- platform specific captions
- SEO hashtags
- realistic upload timing
- 2026 algorithm optimization
`;
}