"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/listings", label: "Listings" },
        { href: "/recommendations", label: "Recommendations" },
        { href: "/about", label: "About" },
    ];

    return (
        <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition">
                        🏠 Smart Apartment Finder
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                    pathname === link.href
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        {/* Auth Section */}
                        {session ? (
                            <div className="flex items-center gap-3 ml-4">
                                <img 
                                    src={session.user.image} 
                                    alt={session.user.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-gray-300 text-sm hidden lg:block">{session.user.name}</span>
                                <button 
                                    onClick={() => signOut()}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => signIn("google")}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm transition ml-4"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-300 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-800">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-2 rounded-lg transition ${
                                        pathname === link.href
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-300 hover:bg-gray-800"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {/* Mobile Auth */}
                            {session ? (
                                <div className="flex items-center gap-3 px-4 py-2">
                                    <img 
                                        src={session.user.image} 
                                        alt={session.user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-gray-300 text-sm">{session.user.name}</span>
                                    <button 
                                        onClick={() => signOut()}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => signIn("google")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition text-left"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}