import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';
import { useDashboardStats, useLandlordListings } from '../../hooks/useData';

export const LandlordDashboard = () => {
    const navigate = useNavigate();
    const { stats } = useDashboardStats();
    const { listings } = useLandlordListings();

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
            <LandlordSidebar />

            <main className="flex-1 overflow-y-auto h-screen w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pt-24 md:pt-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
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
                        { label: 'Total Properties', icon: 'home_work' },
                        { label: 'Active Listings', icon: 'real_estate_agent' },
                        { label: 'Total Views', icon: 'visibility' },
                        { label: 'Total Inquiries', icon: 'chat' }
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
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">0</h3>
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
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">real_estate_agent</span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No active properties</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6">You haven't listed any properties yet. Start adding your properties to reach potential tenants.</p>
                                <button onClick={() => navigate('/landlord/upload')} className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                                    List New Property
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Activity / Notifications */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center justify-center text-center">
                            <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 mb-3">notifications_off</span>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity to show.</p>
                        </div>

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