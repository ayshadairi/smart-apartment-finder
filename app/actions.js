"use server";

import { connectToDB } from "@/app/api/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllApartments() {
    const { db } = await connectToDB();
    const apartments = await db.collection("apartments").find({}).toArray();
    
    return apartments.map(apt => ({
        ...apt,
        _id: apt._id.toString()
    }));
}

export async function addApartment(formData) {
    const { db } = await connectToDB();
    
    const newApartment = {
        title: formData.get("title"),
        price: formData.get("price"),
        location: formData.get("location"),
        bedrooms: parseInt(formData.get("bedrooms")) || 0,
        description: formData.get("description"),
        createdAt: new Date()
    };
    
    await db.collection("apartments").insertOne(newApartment);
    
    revalidatePath("/listings");
    redirect("/listings");
}