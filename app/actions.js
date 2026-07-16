"use server";

import { connectToDB } from "@/lib/mongodb";
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

export async function updateApartment(id, formData) {
    const { db } = await connectToDB();
    const { ObjectId } = require('mongodb');
    
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
    const { db } = await connectToDB();
    const { ObjectId } = require('mongodb');
    
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