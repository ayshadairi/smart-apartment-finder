import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link href="/">Smart Apartment Finder</Link>
        <div>
          <Link href="/">Home</Link>
          <Link href="/listings">Listings</Link>
          <Link href="/recommendations">Recommendations</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}