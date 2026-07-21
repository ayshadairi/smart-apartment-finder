import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import ApartmentCard from "@/app/components/ApartmentCard";
import { getMyApartments } from "@/app/actions";
import Link from "next/link";

export default async function Listings() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin");
    }
    const apartments = await getMyApartments();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* User Info */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-8 flex items-center gap-4">
                <img 
                    src={session.user.image} 
                    alt={session.user.name} 
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="text-white font-semibold">{session.user.name}</p>
                    <p className="text-gray-400 text-sm">{session.user.email}</p>
                    <p className="text-gray-500 text-xs mt-1">{apartments.length} apartments listed</p>
                </div>
            </div>

            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        My Apartments
                    </h1>
                    <p className="text-gray-400 mt-1">Manage your apartment listings</p>
                </div>
                
                <Link 
                    href="/apartments/new" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25 hover:scale-105 transform inline-flex items-center gap-2 whitespace-nowrap"
                >
                    <span className="text-xl leading-none">+</span> 
                    <span>Add Apartment</span>
                </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apartments.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                        <p className="text-gray-400">You haven't listed any apartments yet.</p>
                        <Link 
                            href="/apartments/new" 
                            className="text-blue-400 hover:text-blue-300 transition mt-2 inline-block"
                        >
                            Add your first listing →
                        </Link>
                    </div>
                ) : (
                    apartments.map((apartment) => (
                        <ApartmentCard key={apartment._id} apartment={apartment} />
                    ))
                )}
            </div>
        </div>
    );
}