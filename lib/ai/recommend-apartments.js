import "server-only";
import { generateText, Output } from "ai";
import { groqModels } from "./groq-models";
import { apartmentRecommendationSchema, RECOMMEND_COUNT } from "./recommendation-schema";

const SYSTEM_PROMPT = `
You are an apartment recommendation assistant for a rental platform called "Smart Apartment Finder".

Based on the user's preferences (city, budget, bedrooms, lifestyle), recommend REAL apartments that are currently or recently available for rent.

Important Rules:
- If the user enters a misspelled city name, correct it to the proper name
- If the user enters a country instead of a city, recommend apartments in the capital or largest city
- If the user enters a city that doesn't exist or is extremely small, recommend apartments in the nearest major city
- For example, if the user enters "Qatar" or "Doha", recommend apartments in Doha
- Use realistic prices and neighborhood names
- Provide a brief reason why each apartment matches the user's preferences
- Include a brief neighborhood insight (vibe, nearby amenities, commute options)
- Always return valid JSON matching the schema
- Show prices in LOCAL CURRENCY with CAD equivalent in parentheses
- The user has a MAXIMUM budget — recommend apartments within their budget
- If no apartments exist at that budget, return apartments that are close to the budget and mark withinBudget as false
- For small cities, expand your search to the nearest metropolitan area
- ALWAYS return exactly ${RECOMMEND_COUNT} recommendations
`.trim();

export async function recommendApartments(userPreferences) {
    let lastError = null;
 
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            console.log(`📤 Attempt ${attempt} - Sending request to Groq with preferences:`, userPreferences);
            let extraInstruction = "";
            if (attempt === 2) {
                extraInstruction = "IMPORTANT: Make sure to include ALL required fields: title, price, priceCAD, location, reason, neighborhoodInsight, bedrooms (as a number), description, withinBudget (as a boolean).";
            } else if (attempt === 3) {
                extraInstruction = "CRITICAL: You MUST return valid JSON. Only output the JSON object. No extra text. Include bedrooms as a number.";
            }

            const result = await generateText({
                model: groqModels("openai/gpt-oss-20b"),
                system: SYSTEM_PROMPT,
                prompt: `
User Preferences:
- City: ${userPreferences.city || "Any"}
- Budget: ${userPreferences.budget || "Any"} CAD
- Bedrooms: ${userPreferences.bedrooms || "Any"}
- Lifestyle: ${userPreferences.lifestyle || "Any (e.g., quiet, nightlife, family-friendly, student, pet-friendly)"}

CRITICAL BUDGET RULE - STRICTLY ENFORCE:
- The user's MAXIMUM monthly budget is: ${userPreferences.budget || "No maximum"} CAD
- If the budget is under $500 CAD, look for rooms, studios, or shared apartments
- If you find apartments within budget, set withinBudget = true
- If you find apartments that exceed budget, set withinBudget = false
- Convert all local currency prices to CAD
- Return EXACTLY ${RECOMMEND_COUNT} recommendations
- If you find fewer than ${RECOMMEND_COUNT} within budget, include the closest options that are just over budget

LOCATION:
- Find real apartments in or near "${userPreferences.city || "the user's city"}" 
- If the city is misspelled, correct it
- If the city doesn't exist, expand to the nearest major city

PRICE FORMAT:
- Show prices in LOCAL CURRENCY (e.g., QAR for Qatar, USD for US, EUR for Europe)
- Include CAD equivalent in parentheses: "2,500 QAR (~$920 CAD)"
- Include priceCAD as a number

REQUIRED FIELDS (ALL REQUIRED):
- title, price, priceCAD, location, reason, neighborhoodInsight, bedrooms, description, withinBudget

${extraInstruction}
                `,
                output: Output.object({
                    name: "apartment_recommendations",
                    description: "Real apartment recommendations based on user preferences",
                    schema: apartmentRecommendationSchema,
                }),
                maxRetries: 2,
                maxOutputTokens: 2000,
                providerOptions: {
                    groq: {},
                },
            });

            console.log(`✅ Attempt ${attempt} - AI response received`);
            return result.output;
            
        } catch (error) {
            lastError = error;
            console.error(`❌ Attempt ${attempt} failed:`, error.message);
            
            if (error.message.includes("Rate limit")) {
                console.log("⏳ Rate limit hit, waiting 5 seconds...");
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
            
            if (attempt === 3 || error.message.includes("Rate limit")) {
                break;
            }
        }
    }

    console.error("❌ All 3 attempts failed. Last error:", lastError?.message);
    throw new Error(`Failed to generate apartment recommendations after 3 attempts: ${lastError?.message || "Unknown error"}`);
}