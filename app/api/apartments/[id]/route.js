import { connectToDB } from "@/app/api/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
    try {
        const { db } = await connectToDB();
        const { id } = await params;
    
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid apartment ID" },
                { status: 400 }
            );
        }
        
        const body = await request.json();
        const { title, price, location, bedrooms, description } = body;
        
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
        
        const updatedApartment = {
            title: title.trim(),
            price: price.trim(),
            location: location.trim(),
            bedrooms: parseInt(bedrooms) || 0,
            description: description?.trim() || "",
            updatedAt: new Date()
        };
        
        const result = await db.collection("apartments").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedApartment }
        );
        
        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "Apartment not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json({
            message: "Apartment updated successfully",
            id: id,
            apartment: updatedApartment
        });
        
    } catch (error) {
        console.error("PUT /api/apartments/[id] error:", error);
        return NextResponse.json(
            { error: "Failed to update apartment", details: error.message },
            { status: 500 }
        );
    }
}
export async function DELETE(request, { params }) {
    try {
        const { db } = await connectToDB();
        const { id } = await params;
        
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid apartment ID" },
                { status: 400 }
            );
        }
        
        const result = await db.collection("apartments").deleteOne(
            { _id: new ObjectId(id) }
        );
        
        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: "Apartment not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json({
            message: "Apartment deleted successfully",
            id: id
        });
        
    } catch (error) {
        console.error("DELETE /api/apartments/[id] error:", error);
        return NextResponse.json(
            { error: "Failed to delete apartment", details: error.message },
            { status: 500 }
        );
    }
}