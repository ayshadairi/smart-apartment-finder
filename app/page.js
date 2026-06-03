import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Smart Apartment Finder</h1>
      <p>Find your perfect apartment with AI-powered recommendations.</p>
      
      <Image 
        src="/next.svg" 
        alt="Apartment search" 
        width={200} 
        height={200}
      />
      
      <Link href="/listings">Browse Listings</Link>
    </div>
  );
}
