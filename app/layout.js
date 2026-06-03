import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
