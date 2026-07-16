import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
    title: "Smart Apartment Finder",
    description: "Find your perfect apartment with AI-powered recommendations",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}