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
        
        const newApartment = {
            title: body.title,
            price: body.price,
            location: body.location,
            bedrooms: parseInt(body.bedrooms) || 0,
            description: body.description || "",
            createdAt: new Date()
        };
        
        const result = await db.collection("apartments").insertOne(newApartment);
        
        return NextResponse.json({
            message: "Apartment added successfully",
            id: result.insertedId.toString()
        }, { status: 201 });
        
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to add apartment" },
            { status: 500 }
        );
    }
}