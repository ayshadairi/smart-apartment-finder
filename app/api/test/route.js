import { connectToDB } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { db } = await connectToDB();
        const collections = await db.listCollections().toArray();
        
        return NextResponse.json({
            success: true,
            message: "Connected to MongoDB successfully!",
            collections: collections.map(c => c.name)
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to connect to MongoDB",
            error: error.message
        }, { status: 500 });
    }
}