import React from 'react';
import { Sidebar } from '../../components/common/Sidebar';

export const LandlordProfile = () => {
  return (
    <div className="bg-surface-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto h-screen pb-24 md:pb-0 pt-20 md:pt-0">
        <section className="relative pt-8 pb-12 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
            <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/5 opacity-50 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <a className="hover:text-primary transition" href="/dashboard">Home</a>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <span className="text-gray-900 dark:text-white font-medium">Landlords</span>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Profile</span>
                </div>
                <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
                    <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
                        <div className="relative">
                            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full p-1 bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-100 dark:ring-gray-700 flex items-center justify-center text-gray-400">
                                <span className="material-symbols-outlined text-6xl">person</span>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-secondary text-white p-1.5 rounded-full ring-4 ring-white dark:ring-surface-dark shadow-lg" title="Identity Verified">
                                <span className="material-symbols-outlined text-xl leading-none">verified</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full text-center lg:text-left">
                        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 mb-6">
                            <div>
                                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">Landlord</h1>
                                    <span className="bg-blue-100 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 uppercase tracking-wide">
                                        Verified Owner
                                    </span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center lg:justify-start gap-2 mb-4">
                                    <span className="material-symbols-outlined text-lg">location_on</span> Location Not Provided
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8">
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Total Listings</p>
                                        <p className="text-2xl font-bold text-navy dark:text-blue-400">0</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Response Rate</p>
                                        <p className="text-2xl font-bold text-secondary">N/A</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Tenant Rating</p>
                                        <div className="flex items-center justify-center lg:justify-start gap-1">
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">N/A</span>
                                            <span className="material-symbols-outlined text-gray-400 text-xl fill-current">star</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <button className="bg-primary hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto">
                                    <span className="material-symbols-outlined">call</span>
                                    Contact Landlord
                                </button>
                                <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-8 py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2 w-full sm:w-auto">
                                    <span className="material-symbols-outlined text-lg">share</span>
                                    Share Profile
                                </button>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-2 max-w-3xl">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-2">About Landlord</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                                No description provided yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Active Listings by this Owner
                        <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-semibold px-2.5 py-0.5 rounded-full">0</span>
                    </h2>
                </div>
                
                <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No active listings</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">This landlord currently has no active properties listed.</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};
