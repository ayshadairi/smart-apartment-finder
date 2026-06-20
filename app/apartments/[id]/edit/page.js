import { getApartmentById } from "@/app/actions";
import { updateApartment } from "@/app/actions";

export default async function EditApartment({ params }) {
    const { id } = await params;
    const apartment = await getApartmentById(id);

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Edit Apartment
            </h1>
            
            <form action={updateApartment.bind(null, id)} className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                    <input
                        type="text"
                        name="title"
                        required
                        defaultValue={apartment.title}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Price *</label>
                    <input
                        type="text"
                        name="price"
                        required
                        defaultValue={apartment.price}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Location *</label>
                    <input
                        type="text"
                        name="location"
                        required
                        defaultValue={apartment.location}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Bedrooms</label>
                    <select
                        name="bedrooms"
                        defaultValue={apartment.bedrooms}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                        <option value="0">Studio</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4+ Bedrooms</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        defaultValue={apartment.description}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    ></textarea>
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Update Apartment
                </button>
            </form>
        </div>
    );
}