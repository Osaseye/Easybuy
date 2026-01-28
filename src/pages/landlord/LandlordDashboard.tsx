import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';

export const LandlordDashboard = () => {
    const navigate = useNavigate();

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
                        { label: 'Total Listings', value: '12', trend: '+2 this month', icon: 'apartment', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                        { label: 'Total Views', value: '8.4k', trend: '+12% vs last month', icon: 'visibility', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                        { label: 'Pending Inquiries', value: '24', trend: '5 new today', icon: 'chat', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
                        { label: 'Occupancy Rate', value: '92%', trend: 'Top 5% in area', icon: 'pie_chart', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                </div>
                                <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
                                    <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
                                    {stat.trend.split(' ')[0]}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
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
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="group bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all flex flex-col sm:flex-row gap-4">
                                    <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={`/properties/property-${item + 3}.jpg`} alt="Property" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-2 left-2 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                                            Active
                                        </div>
                                    </div>
                                    <div className="flex-1 py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Modern 3 Bedroom Apartment</h3>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                    Lekki Phase 1, Lagos
                                                </p>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </div>
                                        
                                        <div className="mt-4 flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                 <span className="material-symbols-outlined text-gray-400 text-sm">visibility</span>
                                                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">1.2k views</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                 <span className="material-symbols-outlined text-gray-400 text-sm">chat</span>
                                                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">12 inquiries</span>
                                            </div>
                                            <div className="ml-auto">
                                                <span className="text-lg font-bold text-primary">₦3.5M</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">/year</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Activity / Notifications */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-2">
                            {[
                                { user: 'Sarah Wilson', text: 'requested a tour for', property: 'Lekki Apartment', time: '2 mins ago', type: 'tour' },
                                { user: 'Mike Johnson', text: 'sent a message about', property: 'Ikeja Duplex', time: '1 hour ago', type: 'message' },
                                { user: 'System', text: 'Your property', property: 'Victoria Island Office', time: '3 hours ago', type: 'system' }
                            ].map((activity, i) => (
                                <div key={i} className="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors cursor-pointer border-b last:border-0 border-gray-100 dark:border-gray-700 border-dashed">
                                    <div className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center text-white ${
                                        activity.type === 'tour' ? 'bg-purple-500' : activity.type === 'message' ? 'bg-blue-500' : 'bg-gray-500'
                                    }`}>
                                        <span className="material-symbols-outlined text-sm">
                                            {activity.type === 'tour' ? 'calendar_today' : activity.type === 'message' ? 'mail' : 'info'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900 dark:text-white">
                                            <span className="font-bold">{activity.user}</span> {activity.text} <span className="font-medium text-primary">{activity.property}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                             <button className="w-full py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors border-t border-dashed border-gray-100 dark:border-gray-700 mt-1">
                                View All Notifications
                            </button>
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
