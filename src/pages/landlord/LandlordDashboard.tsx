import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
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
    createdAt: any;
}

export const LandlordDashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!currentUser) return;
            try {
                // Fetch properties for this landlord
                const q = query(
                    collection(db, 'properties'), 
                    where('landlordId', '==', currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                const fetchedProperties = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Property[];
                
                // Sort by createdAt descending in memory to avoid requiring a composite index
                fetchedProperties.sort((a, b) => {
                    const dateA = a.createdAt?.toMillis?.() || 0;
                    const dateB = b.createdAt?.toMillis?.() || 0;
                    return dateB - dateA;
                });
                
                setProperties(fetchedProperties);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [currentUser]);

    const activeListingsCount = properties.filter(p => p.status === 'available').length;
    const totalPropertiesCount = properties.length;
    // Mock data for views and inquiries since we don't have those collections yet
    const totalViews = totalPropertiesCount * 15; 
    const totalInquiries = totalPropertiesCount * 3;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
            <LandlordSidebar />

            <main className="flex-1 overflow-y-auto h-screen w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pt-24 md:pt-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome back, {currentUser?.displayName || 'Landlord'}!</h1>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Track your properties, performance, and tenant activities.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/landlord/upload')}
                        className="hidden md:inline-flex items-center justify-center p-3 md:px-6 md:py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg shadow-primary/25 text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:-translate-y-0.5"
                    >
                        <span className="material-symbols-outlined md:mr-2">add_home</span>
                        <span className="hidden md:inline">List New Property</span>
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { label: 'Total Properties', icon: 'home_work', value: totalPropertiesCount },
                        { label: 'Active Listings', icon: 'real_estate_agent', value: activeListingsCount },
                        { label: 'Total Views', icon: 'visibility', value: totalViews },
                        { label: 'Total Inquiries', icon: 'chat', value: totalInquiries }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-400">
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                </div>
                                <span className="flex items-center text-xs font-medium text-gray-400 bg-gray-50 dark:bg-gray-700 px-2.5 py-1 rounded-full">
                                    --
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {loading ? '...' : stat.value}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Listings */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Properties</h2>
                            <button onClick={() => navigate('/landlord/listings')} className="text-primary hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors">
                                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : properties.length === 0 ? (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">real_estate_agent</span>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No active properties</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6">You haven't listed any properties yet. Start adding your properties to reach potential tenants.</p>
                                    <button onClick={() => navigate('/landlord/upload')} className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                                        List New Property
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {properties.slice(0, 4).map(property => (
                                        <div key={property.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
                                            <div className="h-32 relative">
                                                <img src={property.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'} alt={property.title} className="w-full h-full object-cover" />
                                                <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-primary shadow-sm">
                                                    {property.status === 'available' ? 'Active' : 'Draft'}
                                                </div>
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">{property.title}</h4>
                                                <p className="text-primary font-bold text-sm mb-2">₦{property.price.toLocaleString()}/yr</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-auto">
                                                    <span className="material-symbols-outlined text-xs">location_on</span>
                                                    {property.city}, {property.state}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Activity / Notifications */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                        </div>
                        
                        {loading ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                        ) : properties.length > 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 space-y-4">
                                {properties.slice(0, 3).map((prop, idx) => (
                                    <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-lg shrink-0">
                                            <span className="material-symbols-outlined text-sm">add_home</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">Listed new property</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{prop.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center justify-center text-center">
                                <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 mb-3">notifications_off</span>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity to show.</p>
                            </div>
                        )}

                         {/* Quick Tip Card */}
                         <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="material-symbols-outlined text-[120px]">lightbulb</span>
                             </div>
                             <h3 className="text-lg font-bold mb-2 relative z-10">Pro Tip</h3>
                             <p className="text-blue-100 text-sm mb-4 relative z-10">Verification increases your property visibility by 60%. Get your account verified today.</p>
                             <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors relative z-10">
                                 Verify Account
                             </button>
                         </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
};