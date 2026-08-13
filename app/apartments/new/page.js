"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewApartment() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState(null);
    
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [bedrooms, setBedrooms] = useState("2");
    const [features, setFeatures] = useState("");
    const [audience, setAudience] = useState("");
    const [notes, setNotes] = useState("");
    const [description, setDescription] = useState("");
    const [keyFeatures, setKeyFeatures] = useState([]);
    const [vibe, setVibe] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [generatedTitle, setGeneratedTitle] = useState("");

    async function generateDescription() {
        if (!title || !price || !location) {
            setError("Please fill in Title, Price, and Location first");
            return;
        }

        setGenerating(true);
        setError(null);

        try {
            const response = await fetch("/api/generate-description", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    price,
                    location,
                    bedrooms,
                    features,
                    audience,
                    notes,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate description");
            }

            setGeneratedTitle(data.description.title);
            setDescription(data.description.description);
            setKeyFeatures(data.description.keyFeatures || []);
            setVibe(data.description.vibe || "");
            setTargetAudience(data.description.targetAudience || "");
            
        } catch (err) {
            setError(err.message);
        } finally {
            setGenerating(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("title", generatedTitle || title);
        formData.append("price", price);
        formData.append("location", location);
        formData.append("bedrooms", bedrooms);
        formData.append("description", description);
        formData.append("features", keyFeatures.join(", "));
        formData.append("vibe", vibe);
        formData.append("targetAudience", targetAudience);

        try {
            const response = await fetch("/api/apartments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: generatedTitle || title,
                    price,
                    location,
                    bedrooms: parseInt(bedrooms),
                    description: description || "No description provided",
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to add apartment");
            }

            router.push("/listings");
            router.refresh();
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                List Your Apartment
            </h1>

            {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
                    <p className="text-red-300">{error}</p>
                </div>
            )}

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">🤖 AI Description Generator</h2>
                    <button
                        type="button"
                        onClick={generateDescription}
                        disabled={generating}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {generating ? "Generating..." : "✨ Generate Description"}
                    </button>
                </div>
                <p className="text-gray-400 text-sm">
                    Fill in the basic details below, then click "Generate Description" to let AI write a professional listing for you.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="e.g., Modern Downtown Loft"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Price *</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="e.g., $2,200/month"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Location *</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        placeholder="e.g., Downtown St. John's"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Bedrooms</label>
                    <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                        <option value="0">Studio</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2" selected>2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4+ Bedrooms</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Key Features (comma separated)</label>
                    <input
                        type="text"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                        placeholder="e.g., gym, pool, parking, balcony"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Target Audience</label>
                    <input
                        type="text"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="e.g., young professionals, students, families"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Additional Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows="2"
                        placeholder="Any extra details about the apartment..."
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>

                {/* AI-Generated Results */}
                {(generatedTitle || description || keyFeatures.length > 0) && (
                    <div className="border-t border-gray-700 pt-4 mt-4">
                        <h3 className="text-lg font-semibold text-blue-400 mb-3">✨ AI-Generated Content</h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Suggested Title</label>
                                <input
                                    type="text"
                                    value={generatedTitle}
                                    onChange={(e) => setGeneratedTitle(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-900 border border-purple-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-2 bg-gray-900 border border-purple-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                />
                            </div>

                            {keyFeatures.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Key Features</label>
                                    <div className="flex flex-wrap gap-2">
                                        {keyFeatures.map((feature, index) => (
                                            <span key={index} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {vibe && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Vibe</label>
                                    <input
                                        type="text"
                                        value={vibe}
                                        onChange={(e) => setVibe(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-900 border border-purple-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                    />
                                </div>
                            )}

                            {targetAudience && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Target Audience</label>
                                    <input
                                        type="text"
                                        value={targetAudience}
                                        onChange={(e) => setTargetAudience(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-900 border border-purple-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {loading ? "Adding Apartment..." : "Add Apartment"}
                </button>
            </form>
        </div>
    );
}