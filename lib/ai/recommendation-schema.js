import { z } from "zod";

export const RECOMMEND_COUNT = 3;

export const apartmentRecommendationSchema = z.object({
    recommendations: z.array(
        z.object({
            title: z.string().min(1).describe("The title of the recommended apartment"),
            price: z.string().min(1).describe("The monthly rent price"),
            location: z.string().min(1).describe("The neighborhood or area"),
            reason: z.string().min(10).max(300).describe("Why this apartment matches the user's preferences"),
            neighborhoodInsight: z.string().min(10).max(200).describe("A brief insight about the neighborhood"),
            bedrooms: z.number().int().min(0).describe("Number of bedrooms"),
        })
    ).length(RECOMMEND_COUNT),
});