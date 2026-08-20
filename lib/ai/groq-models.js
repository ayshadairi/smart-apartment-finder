import "server-only";
import { createGroq } from "@ai-sdk/groq";

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
    throw new Error("GROQ_API_KEY is not configured in .env.local");
}

export const groqModels = createGroq({
    apiKey: groqApiKey,
});