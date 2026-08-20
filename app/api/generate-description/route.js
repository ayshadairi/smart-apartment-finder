import { generateApartmentDescription } from "@/lib/ai/generate-description";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { title, price, location, bedrooms, features, audience, notes } = body;
        
        if (!title || !price || !location) {
            return NextResponse.json(
                { error: "Title, price, and location are required" },
                { status: 400 }
            );
        }
        
        const apartmentDetails = {
            title,
            price,
            location,
            bedrooms: bedrooms || "Not specified",
            features: features || "",
            audience: audience || "",
            notes: notes || "",
        };
        
        const result = await generateApartmentDescription(apartmentDetails);
        
        return NextResponse.json({
            success: true,
            description: result,
        });
        
    } catch (error) {
        console.error("Description API error:", error);
        return NextResponse.json(
            { 
                error: "Failed to generate description", 
                details: error.message 
            },
            { status: 500 }
        );
    }
}