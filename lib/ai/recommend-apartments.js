import "server-only";
import { generateText, Output } from "ai";
import { groqModels } from "./groq-models";
import { apartmentRecommendationSchema, RECOMMEND_COUNT } from "./recommendation-schema";

const SYSTEM_PROMPT = `
You are an apartment recommendation assistant for a rental platform called "Smart Apartment Finder".

Based on the user's preferences (city, budget, bedrooms, lifestyle), recommend ${RECOMMEND_COUNT} REAL apartments that are currently or recently available for rent.

Rules:
- Recommend ONLY real apartments that exist in the real world
- Use real neighborhood names and realistic prices
- Provide a brief reason why each apartment matches the user's preferences
- Include a brief neighborhood insight (vibe, nearby amenities, commute options)
- Do not invent apartment listings — base them on real market data
- Be specific with location details (neighborhood, nearby landmarks)
`.trim();

export async function recommendApartments(userPreferences) {
    try {
        console.log("📤 Sending request to Groq with preferences:", userPreferences);
        
        const result = await generateText({
            model: groqModels("llama-3.3-70b-versatile"),
            system: SYSTEM_PROMPT,
            prompt: `
User Preferences:
- City: ${userPreferences.city || "Any"}
- Budget: ${userPreferences.budget || "Any"}
- Bedrooms: ${userPreferences.bedrooms || "Any"}
- Lifestyle: ${userPreferences.lifestyle || "Any (e.g., quiet, nightlife, family-friendly, student, pet-friendly)"}

Please recommend ${RECOMMEND_COUNT} real apartments that match these preferences.
            `,
            output: Output.object({
                name: "apartment_recommendations",
                description: "Real apartment recommendations based on user preferences",
                schema: apartmentRecommendationSchema,
            }),
            maxRetries: 0,
            maxOutputTokens: 2000,
            providerOptions: {
                groq: {},
            },
        });

        console.log("✅ AI response received:", result);
        return result.output;
    } catch (error) {
        console.error("❌ AI recommendation error - Full details:", {
            message: error.message,
            stack: error.stack,
            cause: error.cause,
            text: error.text,
            usage: error.usage,
        });
        throw new Error(`Failed to generate apartment recommendations: ${error.message}`);
    }
}