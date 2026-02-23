import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';

interface Property {
    id: string;
    title: string;
    price: number;
    city: string;
    state: string;
    propertyType: string;
    images: string[];
    status: string;
}

export const MyListings = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [listings, setListings] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            if (!currentUser) return;
            try {
                const q = query(collection(db, 'properties'), where('landlordId', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                const fetchedListings = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Property[];
                setListings(fetchedListings);
            } catch (error) {
                console.error("Error fetching listings:", error);
                toast.error("Failed to load listings");
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [currentUser]);

    const handleDelete = async (id: string) => {
        if(window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await deleteDoc(doc(db, 'properties', id));
                setListings(listings.filter(l => l.id !== id));
                toast.success('Listing deleted successfully');
            } catch (error) {
                console.error("Error deleting listing:", error);
                toast.error("Failed to delete listing");
            }
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
            <LandlordSidebar />

            <main className="flex-1 overflow-y-auto h-screen w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pt-24 md:pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">My Properties</h1>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Manage your active listings and drafts.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/landlord/upload')}
                        className="hidden md:inline-flex items-center justify-center p-3 md:px-6 md:py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg shadow-primary/25 text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                    >
                        <span className="material-symbols-outlined md:mr-2">add</span>
                        <span className="hidden md:inline">Add New Property</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
                        <button className="px-4 py-2 bg-white dark:bg-gray-700 rounded-md shadow-sm text-sm font-bold text-gray-900 dark:text-white">All</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Active</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Drafts</button>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400">search</span>
                        </span>
                        <input className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-gray-900 dark:text-white" placeholder="Search properties..." type="text" />
                    </div>
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : listings.length === 0 ? (
                    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">real_estate_agent</span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No properties listed yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">You haven't added any properties to your portfolio. Start listing your properties to reach potential tenants.</p>
                        <button 
                            onClick={() => navigate('/landlord/upload')}
                            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-primary/25 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">add_home</span>
                            Add Your First Property
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map((property) => (
                            <div key={property.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="relative h-48">
                                    <img 
                                        src={property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
                                        alt={property.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                        {property.status === 'available' ? 'Active' : 'Draft'}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{property.title}</h3>
                                        <p className="text-lg font-bold text-primary whitespace-nowrap ml-2">₦{property.price.toLocaleString()}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        {property.city}, {property.state}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                                            {property.propertyType}
                                        </span>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => navigate(`/property/${property.id}`)}
                                                className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <span className="material-symbols-outlined text-sm">visibility</span>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(property.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </main>
        </div>
    );
};
