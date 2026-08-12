import { recommendApartments } from "@/lib/ai/recommend-apartments";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { city, budget, bedrooms, lifestyle } = body;
        
        // Validate required fields
        if (!city) {
            return NextResponse.json(
                { error: "City is required" },
                { status: 400 }
            );
        }
        
        const userPreferences = {
            city,
            budget: budget || "Any",
            bedrooms: bedrooms || "Any",
            lifestyle: lifestyle || "Any",
        };
        
        const result = await recommendApartments(userPreferences);
        
        return NextResponse.json({
            success: true,
            recommendations: result.recommendations,
        });
        
    } catch (error) {
        console.error("Recommendation API error:", error);
        return NextResponse.json(
            { 
                error: "Failed to generate recommendations", 
                details: error.message 
            },
            { status: 500 }
        );
    }
}