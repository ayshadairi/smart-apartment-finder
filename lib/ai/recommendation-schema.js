import { z } from "zod";

export const RECOMMEND_COUNT = 5;

export const apartmentRecommendationSchema = z.object({
    recommendations: z.array(
        z.object({
            title: z.string().min(1).describe("The title of the recommended apartment"),
            price: z.string().min(1).describe("The monthly rent price in LOCAL CURRENCY with CAD equivalent"),
            priceCAD: z.number().min(0).describe("The price converted to CAD as a number"),
            location: z.string().min(1).describe("The neighborhood and city"),
            reason: z.string().min(10).max(300).describe("Why this apartment matches the user's preferences"),
            neighborhoodInsight: z.string().min(10).max(200).describe("A brief insight about the neighborhood"),
            bedrooms: z.number().int().min(0).describe("Number of bedrooms"),
            description: z.string().min(10).max(300).describe("A brief description of the apartment"),
            withinBudget: z.boolean().describe("Whether this apartment is within the user's budget"),
            latitude: z.number().min(-90).max(90).describe("Latitude coordinate of the apartment"),
            longitude: z.number().min(-180).max(180).describe("Longitude coordinate of the apartment"),
        })
    ).min(1).max(10).describe(`Array of apartment recommendations (1-10 items)`),
});