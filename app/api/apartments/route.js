import { connectToDB } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { db } = await connectToDB();
        const apartments = await db.collection("apartments").find({}).toArray();

        const formattedApartments = apartments.map(apt => ({
            ...apt,
            _id: apt._id.toString()
        }));
        
        return NextResponse.json(formattedApartments);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch apartments", message: error.message },
            { status: 500 }
        );
    }
}
export async function POST(request) {
    try {
        const { db } = await connectToDB();
        const body = await request.json();
        
        const { title, price, location, bedrooms, description } = body;
        
        // Validation
        const errors = [];
        if (!title || title.trim() === "") errors.push("Title is required");
        if (!price || price.trim() === "") errors.push("Price is required");
        if (!location || location.trim() === "") errors.push("Location is required");
        
        if (errors.length > 0) {
            return NextResponse.json(
                { error: "Validation failed", details: errors },
                { status: 400 }
            );
        }
        
        const newApartment = {
            title: title.trim(),
            price: price.trim(),
            location: location.trim(),
            bedrooms: parseInt(bedrooms) || 0,
            description: description?.trim() || "",
            createdAt: new Date()
        };
        
        const result = await db.collection("apartments").insertOne(newApartment);
        
        return NextResponse.json({
            message: "Apartment added successfully",
            id: result.insertedId.toString(),
            apartment: newApartment
        }, { status: 201 });
        
    } catch (error) {
        console.error("POST /api/apartments error:", error);
        return NextResponse.json(
            { error: "Failed to add apartment", details: error.message },
            { status: 500 }
        );
    }
}