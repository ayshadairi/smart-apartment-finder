import "server-only";
import { generateText, Output } from "ai";
import { groqModels } from "./groq-models";
import { apartmentDescriptionSchema } from "./description-schema";

const SYSTEM_PROMPT = `
You are a professional real estate listing writer for a rental platform called "Smart Apartment Finder".

Based on the apartment details provided by the landlord, write a compelling and attractive listing description.

Rules:
- Write in a professional but welcoming tone
- Highlight the best features of the apartment
- Be specific and descriptive
- Target the right audience based on the apartment's features
- Do not exaggerate or make false claims
- Keep the description clear and easy to read
`.trim();

export async function generateApartmentDescription(apartmentDetails) {
    try {
        const result = await generateText({
            model: groqModels("openai/gpt-oss-20b"),
            system: SYSTEM_PROMPT,
            prompt: `
Apartment Details:
- Title: ${apartmentDetails.title || "Not provided"}
- Price: ${apartmentDetails.price || "Not provided"}
- Location: ${apartmentDetails.location || "Not provided"}
- Bedrooms: ${apartmentDetails.bedrooms || "Not provided"}
- Key Features: ${apartmentDetails.features || "Not provided"}
- Target Audience: ${apartmentDetails.audience || "Not provided"}
- Additional Notes: ${apartmentDetails.notes || "None"}

Please generate a complete listing description.
            `,
            output: Output.object({
                name: "apartment_description",
                description: "A professional apartment listing description",
                schema: apartmentDescriptionSchema,
            }),
            maxRetries: 0,
            maxOutputTokens: 1000,
            providerOptions: {
                groq: {},
            },
        });

        return result.output;
    } catch (error) {
        console.error("Description generation error:", error);
        throw new Error("Failed to generate apartment description");
    }
}