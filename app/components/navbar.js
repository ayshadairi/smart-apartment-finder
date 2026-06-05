"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Apartment Finder
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link href="/listings" className="text-gray-300 hover:text-white transition">Listings</Link>
            <Link href="/recommendations" className="text-gray-300 hover:text-white transition">Recommendations</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/listings" className="text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Listings</Link>
              <Link href="/recommendations" className="text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Recommendations</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>About</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}