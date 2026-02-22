import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';
import { useLandlordListings } from '../../hooks/useData';

export const MyListings = () => {
    const navigate = useNavigate();
    const { listings, setListings } = useLandlordListings();

    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to delete this listing?')) {
            setListings(listings.filter(l => l.id !== id));
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
                </div>
            </main>
        </div>
    );
};
