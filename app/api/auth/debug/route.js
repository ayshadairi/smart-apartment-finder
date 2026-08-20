import authOptions from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        return NextResponse.json({
            isAuthenticated: !!session,
            session: session,
            message: session ? "User is signed in" : "User is not signed in"
        });
    } catch (error) {
        console.error("Debug error:", error);
        return NextResponse.json(
            { error: "Failed to get session", details: error.message },
            { status: 500 }
        );
    }
}