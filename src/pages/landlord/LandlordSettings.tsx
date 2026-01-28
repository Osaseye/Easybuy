import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';

export const LandlordSettings = () => {
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'profile';

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                             <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                                <div className="relative group cursor-pointer">
                                    <img 
                                        src="/landlord.jpg" 
                                        alt="Profile" 
                                        className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50 dark:ring-gray-800"
                                    />
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white">photo_camera</span>
                                    </div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">John Landlord</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Landlord Account</p>
                                    <button className="mt-2 text-primary text-sm font-medium hover:underline">Change Profile Photo</button>
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue="John Landlord" 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        defaultValue="landlord@easybuy.com" 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        defaultValue="+234 801 234 5678" 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Agency Name (Optional)</label>
                                    <input 
                                        type="text" 
                                        defaultValue="Easy Homes Ltd." 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                             </div>

                             <div className="mt-8 flex justify-end">
                                <button className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/30 transition-all">
                                    Save Changes
                                </button>
                             </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Password & Security</h3>
                            
                            <div className="space-y-4 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                                    <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none text-gray-900 dark:text-white"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                    <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none text-gray-900 dark:text-white"/>
                                </div>
                                <div>
                                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                    <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none text-gray-900 dark:text-white"/>
                                </div>
                                <button className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-black dark:hover:bg-gray-600 transition">Update Password</button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
            <LandlordSidebar />
            
            <main className="flex-1 overflow-y-auto h-screen w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pt-24 md:pt-8">
                 <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
                    <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and security.</p>
                 </div>
                 
                 {renderContent()}
                </div>
            </main>
        </div>
    );
};
