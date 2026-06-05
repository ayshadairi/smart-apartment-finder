export default function Listings() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Apartment Listings
        </h1>
        <p className="text-gray-400 mt-2">Browse available apartments in your area</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700 col-span-full">
          <p className="text-gray-400">Loading apartment listings...</p>
        </div>
      </div>
    </div>
  );
}