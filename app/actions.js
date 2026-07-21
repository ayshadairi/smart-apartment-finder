"use server";

import { connectToDB } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getMyApartments() {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        throw new Error("You must be signed in to view your apartments");
    }
    
    const { db } = await connectToDB();
    const apartments = await db.collection("apartments")
        .find({ userId: session.user.id })
        .sort({ createdAt: -1 })
        .toArray();
    
    return apartments.map(apt => ({
        ...apt,
        _id: apt._id.toString(),
        createdAt: apt.createdAt?.toISOString()
    }));
}
export async function addApartment(formData) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        throw new Error("You must be signed in to add an apartment");
    }
    
    const { db } = await connectToDB();
    
    const newApartment = {
        title: formData.get("title"),
        price: formData.get("price"),
        location: formData.get("location"),
        bedrooms: parseInt(formData.get("bedrooms")) || 0,
        description: formData.get("description"),
        userId: session.user.id,
        userName: session.user.name,
        userEmail: session.user.email,
        createdAt: new Date()
    };
    
    await db.collection("apartments").insertOne(newApartment);
    
    revalidatePath("/listings");
    redirect("/listings");
}
export async function updateApartment(id, formData) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        throw new Error("You must be signed in to update an apartment");
    }
    
    const { db } = await connectToDB();
    const { ObjectId } = require('mongodb');
    const existing = await db.collection("apartments").findOne({ _id: new ObjectId(id) });
    
    if (!existing) {
        throw new Error("Apartment not found");
    }
    
    if (existing.userId !== session.user.id) {
        throw new Error("You don't have permission to update this apartment");
    }
    
    const updatedApartment = {
        title: formData.get("title"),
        price: formData.get("price"),
        location: formData.get("location"),
        bedrooms: parseInt(formData.get("bedrooms")) || 0,
        description: formData.get("description"),
        updatedAt: new Date()
    };
    
    await db.collection("apartments").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedApartment }
    );
    
    revalidatePath("/listings");
    redirect("/listings");
}
export async function deleteApartment(id) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        throw new Error("You must be signed in to delete an apartment");
    }
    
    const { db } = await connectToDB();
    const { ObjectId } = require('mongodb');
    const existing = await db.collection("apartments").findOne({ _id: new ObjectId(id) });
    
    if (!existing) {
        throw new Error("Apartment not found");
    }
    
    if (existing.userId !== session.user.id) {
        throw new Error("You don't have permission to delete this apartment");
    }
    
    await db.collection("apartments").deleteOne({ _id: new ObjectId(id) });
    
    revalidatePath("/listings");
}
export async function getApartmentById(id) {
    const { db } = await connectToDB();
    const { ObjectId } = require('mongodb');
    
    const apartment = await db.collection("apartments").findOne({ _id: new ObjectId(id) });
    
    if (!apartment) {
        throw new Error("Apartment not found");
    }
    
    return {
        ...apartment,
        _id: apartment._id.toString()
    };
}