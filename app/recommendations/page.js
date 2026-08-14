"use client";
import { useState } from "react";

export default function Recommendations() {
    const [city, setCity] = useState("");
    const [budget, setBudget] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [lifestyle, setLifestyle] = useState("");
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setRecommendations(null);

        try {
            const response = await fetch("/api/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ city, budget, bedrooms, lifestyle }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to get recommendations");
            }

            setRecommendations(data.recommendations);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI Recommendations
                </h1>
                <p className="text-gray-400 mt-2">
                    Get personalized apartment matches based on your lifestyle
                </p>
            </div>

            {/* Search Form */}
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-6 border border-gray-700 mb-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            City *
                        </label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder="e.g., Toronto, Vancouver, Montreal"
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Monthly Budget (CAD)
                        </label>
                        <input
                            type="text"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="e.g., 1500"
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Bedrooms
                        </label>
                        <select
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                            <option value="">Any</option>
                            <option value="0">Studio</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="3">3 Bedrooms</option>
                            <option value="4">4+ Bedrooms</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Lifestyle
                        </label>
                        <select
                            value={lifestyle}
                            onChange={(e) => setLifestyle(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                            <option value="">Any</option>
                            <option value="quiet">Quiet & Peaceful</option>
                            <option value="nightlife">Nightlife & Entertainment</option>
                            <option value="family">Family-Friendly</option>
                            <option value="student">Student-Friendly</option>
                            <option value="pet">Pet-Friendly</option>
                            <option value="outdoors">Outdoors & Nature</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Finding Apartments..." : "Get AI Recommendations"}
                    </button>
                </form>
            </div>

            {/* Results */}
            {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
                    <p className="text-red-300">{error}</p>
                </div>
            )}

            {loading && (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 mt-4">AI is finding the best apartments for you...</p>
                </div>
            )}

            {recommendations && (
                <div className="space-y-6">
                    {(() => {
                        const withinBudget = recommendations.filter(apt => apt.withinBudget === true);
                        const overBudget = recommendations.filter(apt => apt.withinBudget === false);
                        
                        if (withinBudget.length === 0 && recommendations.length > 0) {
                            return (
                                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6 text-center">
                                    <p className="text-yellow-300 text-lg font-semibold">No apartments found within your budget</p>
                                    <p className="text-yellow-200/70 mt-2">
                                        We found {recommendations.length} apartments in {city}, but they exceed your budget of ${budget} CAD.
                                        Try increasing your budget or searching in a different city.
                                    </p>
                                    {overBudget.length > 0 && (
                                        <div className="mt-4 text-left">
                                            <p className="text-gray-400 text-sm mb-2">Apartments found (over budget):</p>
                                            {overBudget.map((apt, idx) => (
                                                <div key={idx} className="bg-gray-800/50 p-3 rounded mb-2 border border-gray-700">
                                                    <p className="text-white text-sm">{apt.title}</p>
                                                    <p className="text-gray-400 text-sm">{apt.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        
                        return (
                            <>
                                <h2 className="text-2xl font-semibold text-center mb-6">
                                    🎯 Your Matches ({withinBudget.length} of {recommendations.length} within budget)
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {withinBudget.map((apt, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800 rounded-xl overflow-hidden border border-green-500/30 hover:border-green-500 transition"
                                        >
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-semibold text-white">
                                                        {apt.title}
                                                    </h3>
                                                    <span className="text-green-400 font-bold">
                                                        {apt.price}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-sm mb-1">
                                                    📍 {apt.location}
                                                </p>
                                                <p className="text-gray-400 text-sm mb-3">
                                                    🛏️ {apt.bedrooms} Bedrooms
                                                </p>
                                                <p className="text-gray-300 text-sm mb-3">
                                                    {apt.description}
                                                </p>
                                                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3 mb-3">
                                                    <p className="text-blue-300 text-sm font-medium">
                                                        💡 {apt.reason}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-700/50 rounded-lg p-3">
                                                    <p className="text-gray-400 text-sm">
                                                        📊 {apt.neighborhoodInsight}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}