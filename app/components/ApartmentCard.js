"use client";
import Link from "next/link";
import { deleteApartment } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function ApartmentCard({ apartment }) {
    const router = useRouter();

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this apartment?")) {
            try {
                await deleteApartment(apartment._id);
                router.refresh();
            } catch (error) {
                console.error("Failed to delete:", error);
            }
        }
    }

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all hover:transform hover:scale-[1.02] duration-300">
            <div className="h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 text-sm">photo placeholder</span>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{apartment.title}</h3>
                    <span className="text-blue-400 font-bold">{apartment.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{apartment.location}</p>
                <p className="text-gray-400 text-sm mb-3">{apartment.bedrooms} Bedrooms</p>
                <p className="text-gray-300 text-sm mb-4">{apartment.description}</p>
                
                <div className="flex gap-2">
                    <Link 
                        href={`/apartments/${apartment._id}/edit`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium text-center"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={handleDelete}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}