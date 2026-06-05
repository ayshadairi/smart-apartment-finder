import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export const metadata = {
  title: "Smart Apartment Finder",
  description: "Find your perfect apartment with AI-powered recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}