import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Find Your Perfect Home
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stop searching dozens of websites. We gather all rental listings in one place and use AI to find your perfect match.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/listings" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg shadow-blue-500/25">
              Browse Listings
            </Link>
            <Link href="/recommendations" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105">
              Get AI Recommendations
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400">10K+</div>
              <div className="text-gray-400 mt-2">Listings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">500+</div>
              <div className="text-gray-400 mt-2">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">98%</div>
              <div className="text-gray-400 mt-2">Match Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">24/7</div>
              <div className="text-gray-400 mt-2">Support</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Renters Love Us</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">We make apartment hunting simple, smart, and stress-free</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-gray-400">Get personalized recommendations based on your lifestyle, budget, and must-haves</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Smart Commute Predictions</h3>
              <p className="text-gray-400">Real-time traffic analysis shows you exactly how long your commute will be</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">💰</div>
              <h3 className="text-xl font-semibold mb-2">Total Cost Calculator</h3>
              <p className="text-gray-400">See the full picture including utilities, internet, and transportation costs</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Dream Apartment?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of happy renters who found their perfect home with us</p>
          <Link href="/recommendations" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 inline-block">
            Start Your Search → 
          </Link>
        </div>
      </section>
    </div>
  );
}