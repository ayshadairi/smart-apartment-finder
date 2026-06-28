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