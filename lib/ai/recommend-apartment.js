import "server-only";
import { generateText, Output } from "ai";
import { groqModels } from "./groq-models";
import { apartmentRecommendationSchema, RECOMMEND_COUNT } from "./recommendation-schema";
import { connectToDB } from "@/lib/mongodb";

const SYSTEM_PROMPT = `
You are an apartment recommendation assistant for a rental platform called "Smart Apartment Finder".

Based on the user's preferences (city, budget, bedrooms, lifestyle), recommend ${RECOMMEND_COUNT} apartments from the available listings.

Rules:
- Only recommend apartments from the provided listings
- Match the user's budget, bedroom requirements, and location preferences as closely as possible
- Provide a brief reason why each apartment is a good match
- Include a brief neighborhood insight for each recommendation
- Do not invent apartments — only use the ones provided
`.trim();

export async function recommendApartments(userPreferences) {
    const { db } = await connectToDB();
    const apartments = await db.collection("apartments").find({}).toArray();
    
    const formattedApartments = apartments.map(apt => ({
        title: apt.title,
        price: apt.price,
        location: apt.location,
        bedrooms: apt.bedrooms,
        description: apt.description || "No description available",
    }));

    try {
        const result = await generateText({
            model: groqModels("llama-3.3-70b-versatile"),
            system: SYSTEM_PROMPT,
            prompt: `
User Preferences:
- City: ${userPreferences.city || "Any"}
- Budget: ${userPreferences.budget || "Any"}
- Bedrooms: ${userPreferences.bedrooms || "Any"}
- Lifestyle: ${userPreferences.lifestyle || "Any"}

Available Apartments:
${JSON.stringify(formattedApartments, null, 2)}
            `,
            output: Output.object({
                name: "apartment_recommendations",
                description: "Apartment recommendations based on user preferences",
                schema: apartmentRecommendationSchema,
            }),
            maxRetries: 0,
            maxOutputTokens: 2000,
            providerOptions: {
                groq: {
                    reasoningEffort: "low",
                },
            },
        });

        return result.output;
    } catch (error) {
        console.error("AI recommendation error:", error);
        throw new Error("Failed to generate apartment recommendations");
    }
}