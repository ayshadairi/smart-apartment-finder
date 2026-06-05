export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-white mb-2">Smart Apartment Finder</h3>
            <p className="text-gray-500 text-sm">Find your perfect home with AI</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Quick Links</h3>
            <ul className="text-sm text-gray-500 space-y-1">
              <li><a href="/listings" className="hover:text-blue-400 transition">Listings</a></li>
              <li><a href="/recommendations" className="hover:text-blue-400 transition">Recommendations</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Contact</h3>
            <p className="text-gray-500 text-sm">📧 support@smartapartmentfinder.com</p>
            <p className="text-gray-500 text-sm">📍 Made with ❤️ by students</p>
          </div>
        </div>
        <div className="text-center pt-8 mt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">&copy; 2026 Smart Apartment Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}