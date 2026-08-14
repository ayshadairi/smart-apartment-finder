import { recommendApartments } from "@/lib/ai/recommend-apartments";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { city, budget, bedrooms, lifestyle } = body;
        
        console.log("📥 Received request:", { city, budget, bedrooms, lifestyle });
        
        if (!city || city.trim() === "") {
            return NextResponse.json(
                { error: "City is required" },
                { status: 400 }
            );
        }
       
        let parsedBudget = "Any";
        if (budget && budget.trim() !== "") {
            const budgetNum = parseInt(budget.replace(/[^0-9]/g, ""));
            if (!isNaN(budgetNum) && budgetNum > 0) {
                if (budgetNum < 100) {
                    return NextResponse.json(
                        { 
                            error: "Budget seems too low. Please enter a monthly budget in USD (e.g., 1000 for $1,000/month)",
                            details: "For reference: studio apartments in most cities start at $500-800/month"
                        },
                        { status: 400 }
                    );
                }
                parsedBudget = `$${budgetNum}`;
            }
        }
        
        let parsedBedrooms = "Any";
        if (bedrooms && bedrooms.trim() !== "") {
            const bedroomNum = parseInt(bedrooms);
            if (!isNaN(bedroomNum) && bedroomNum >= 0 && bedroomNum <= 10) {
                parsedBedrooms = bedroomNum.toString();
            }
        }
        
        const validLifestyles = ["quiet", "nightlife", "family", "student", "pet", "outdoors", ""];
        let parsedLifestyle = "Any";
        if (lifestyle && validLifestyles.includes(lifestyle.toLowerCase())) {
            parsedLifestyle = lifestyle.toLowerCase();
        }
        
        const userPreferences = {
            city: city.trim(),
            budget: parsedBudget,
            bedrooms: parsedBedrooms,
            lifestyle: parsedLifestyle,
        };
        
        const result = await recommendApartments(userPreferences);
        
        return NextResponse.json({
            success: true,
            recommendations: result.recommendations,
        });
        
    } catch (error) {
        console.error("❌ Recommendation API error:", error);
        return NextResponse.json(
            { 
                error: "Failed to generate recommendations", 
                details: error.message 
            },
            { status: 500 }
        );
    }
}