import { connectToDB } from "@/app/api/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET(request) {
    try {
        const { db } = await connectToDB();
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        
        let filter = {};
        if (location) {
            filter.location = { $regex: location, $options: 'i' };
        }
        
        const apartments = await db.collection("apartments")
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();
        
        const formattedApartments = apartments.map(apt => ({
            ...apt,
            _id: apt._id.toString(),
            createdAt: apt.createdAt?.toISOString()
        }));
        
        return NextResponse.json(formattedApartments);
    } catch (error) {
        console.error("GET /api/apartments error:", error);
        return NextResponse.json(
            { error: "Failed to fetch apartments", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { db } = await connectToDB();
        const body = await request.json();
        
        const { title, price, location, bedrooms, description, source, image } = body;
        
        const session = await getServerSession(authOptions);
        
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
            image: image || "",
            latitude: parseFloat(body.latitude) || null,
            longitude: parseFloat(body.longitude) || null,
            source: source || "Manual Entry",
            createdAt: new Date()
        };
        
        if (session) {
            newApartment.userId = session.user.id;
            newApartment.userName = session.user.name;
            newApartment.userEmail = session.user.email;
        }
        
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