import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';

export const MyListings = () => {
    const navigate = useNavigate();
    // Mock Listings Data
    const [listings, setListings] = useState([
        { id: 1, title: 'Luxury 2 Bedroom Apartment', location: 'Lekki, Lagos', price: '2,500,000', status: 'Active', views: 124, saves: 12, image: '/properties/property-1.jpg' },
        { id: 2, title: 'Mini Flat in Yaba', location: 'Yaba, Lagos', price: '800,000', status: 'Pending', views: 45, saves: 5, image: '/properties/property-1.jpg' },
        { id: 3, title: 'Commercial Office Space', location: 'Victoria Island, Lagos', price: '6,000,000', status: 'Draft', views: 0, saves: 0, image: '/properties/property-1.jpg' },
    ]);

    const handleDelete = (id: number) => {
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
                        className="inline-flex items-center justify-center p-3 md:px-6 md:py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg shadow-primary/25 text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((listing) => (
                        <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
                            <div className="relative h-48 overflow-hidden">
                                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md ${
                                    listing.status === 'Active' ? 'bg-green-500/90 text-white' : 
                                    listing.status === 'Pending' ? 'bg-orange-500/90 text-white' : 'bg-gray-500/90 text-white'
                                }`}>
                                    {listing.status}
                                </div>
                                <button className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 p-1.5 rounded-full text-gray-500 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-sm block">more_horiz</span>
                                </button>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-primary transition-colors">{listing.title}</h3>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4">
                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                    {listing.location}
                                </p>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 font-medium uppercase">Views</span>
                                            <span className="font-bold text-gray-900 dark:text-white">{listing.views}</span>
                                        </div>
                                         <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 font-medium uppercase">Saves</span>
                                            <span className="font-bold text-gray-900 dark:text-white">{listing.saves}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-lg font-bold text-primary">₦{listing.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add New Card (Empty State) */}
                    <button 
                        onClick={() => navigate('/landlord/upload')}
                        className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 flex flex-col items-center justify-center h-full min-h-[300px] transition-all group"
                    >
                        <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 flex items-center justify-center mb-4 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">add</span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">Add New Property</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">List a new apartment or house</p>
                    </button>
                </div>
                </div>
            </main>
        </div>
    );
};
