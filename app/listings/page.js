"use client";
import { useState, useEffect } from "react";
import ApartmentCard from "@/app/components/ApartmentCard";
import Link from "next/link";

export default function Listings() {
  const[apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApartments() {
      try {
        const response = await fetch("/api/apartments");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setApartments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchApartments();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Apartment Listings
          </h1>
          <p className="text-gray-400 mt-2">Browse available apartments in your area</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-800 rounded-xl p-8 animate-pulse">
              <div className="h-32 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Apartment Listings
          </h1>
          <p className="text-gray-400 mt-2">Browse available apartments in your area</p>
        </div>
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
        <p className="text-red-300">Error loading apartments: {error}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-3 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Apartment Listings
          </h1>
          <p className="text-gray-400 mt-1">Browse available apartments in your area</p>
          <p className="text-gray-500 text-sm mt-1">Found {apartments.length} apartments</p>
        </div>
        
        <Link 
          href="/apartments/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25 hover:scale-105 transform inline-flex items-center gap-2 whitespace-nowrap"
        >
          <span className="text-xl leading-none">+</span> 
          <span>Add Apartment</span>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
}