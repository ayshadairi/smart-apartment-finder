import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Find Your Perfect Apartment
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            AI-powered recommendations based on your lifestyle, budget, and preferences
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/listings" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Browse Listings
            </Link>
            <Link href="/recommendations" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition">
              Get AI Recommendations
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
              <p className="text-gray-400">Get personalized apartment matches based on your lifestyle and preferences</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Commute Predictions</h3>
              <p className="text-gray-400">Real-time commute time estimates to work or school</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Cost of Living</h3>
              <p className="text-gray-400">Calculate total living costs including utilities and transport</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}