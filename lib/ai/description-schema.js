import { z } from "zod";

export const apartmentDescriptionSchema = z.object({
    title: z.string().min(5).max(100).describe("A catchy title for the apartment listing"),
    description: z.string().min(50).max(500).describe("A well-written description of the apartment highlighting its best features"),
    keyFeatures: z.array(z.string()).min(3).max(6).describe("3-6 key features or selling points"),
    targetAudience: z.string().min(10).max(100).describe("Who this apartment is best suited for (e.g., young professionals, students, families)"),
    vibe: z.string().min(5).max(50).describe("The overall vibe or atmosphere of the apartment"),
});