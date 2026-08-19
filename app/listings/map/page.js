"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MapView from "@/app/components/MapView";

export default function MapPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApartment, setSelectedApartment] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);
    useEffect(() => {
        async function fetchApartments() {
            try {
                const response = await fetch("/api/apartments");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                const withCoords = data.filter(apt => apt.latitude && apt.longitude);
                setApartments(withCoords);
            } catch (error) {
                console.error("Error fetching apartments:", error);
            } finally {
                setLoading(false);
            }
        }

        if (session) {
            fetchApartments();
        }
    }, [session]);

    const handleMarkerClick = (apartment) => {
        setSelectedApartment(apartment);
        if (window.innerWidth < 768) {
            document.getElementById("apartment-details")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4">Loading map...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        🗺️ Apartment Map
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {apartments.length} apartments with locations
                    </p>
                </div>
                <Link
                    href="/listings"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition text-sm"
                >
                    ← Back to Listings
                </Link>
            </div>

            {/* Map */}
            <MapView apartments={apartments} onMarkerClick={handleMarkerClick} />

            {/* Selected Apartment Details */}
            {selectedApartment && (
                <div id="apartment-details" className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-semibold text-white">{selectedApartment.title}</h3>
                            <p className="text-blue-400 font-bold">{selectedApartment.price}</p>
                            <p className="text-gray-400 text-sm">📍 {selectedApartment.location}</p>
                            <p className="text-gray-400 text-sm">🛏️ {selectedApartment.bedrooms} bedrooms</p>
                            {selectedApartment.description && (
                                <p className="text-gray-300 text-sm mt-2">{selectedApartment.description}</p>
                            )}
                        </div>
                        <Link
                            href={`/apartments/${selectedApartment._id}/edit`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            )}

            {/* No apartments message */}
            {apartments.length === 0 && (
                <div className="mt-6 bg-yellow-900/30 border border-yellow-700 rounded-lg p-6 text-center">
                    <p className="text-yellow-300 text-lg">No apartments with locations found</p>
                    <p className="text-yellow-200/70 text-sm mt-2">
                        Add latitude and longitude to your apartments to see them on the map.
                    </p>
                    <Link
                        href="/apartments/new"
                        className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Add an Apartment
                    </Link>
                </div>
            )}
        </div>
    );
}