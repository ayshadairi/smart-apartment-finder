"use client";

import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
    return (
        <SessionProvider>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </SessionProvider>
    );
}