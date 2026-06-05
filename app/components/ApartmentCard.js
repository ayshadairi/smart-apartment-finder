export default function ApartmentCard({ apartment }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all">
      <div className="h-48 bg-gray-700"></div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white">{apartment.title}</h3>
      </div>
    </div>
  );
}