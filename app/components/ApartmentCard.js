export default function ApartmentCard({ apartment }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all hover:transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-700 flex items-center justify-center">
        <span className="text-gray-500 text-sm">photo placeholder</span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white">{apartment.title}</h3>
          <span className="text-blue-400 font-bold">{apartment.price}</span>
        </div>
        <p className="text-gray-400 text-sm mb-1">{apartment.location}</p>
        <p className="text-gray-400 text-sm mb-3">{apartment.bedrooms} Bedrooms</p>
        <p className="text-gray-300 text-sm mb-4">{apartment.description}</p>
      </div>
    </div>
  );
}