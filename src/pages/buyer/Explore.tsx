import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';

const FilterContent = () => (
    <div className="space-y-6">
        {/* Budget */}
        <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Budget (Yearly)</label>
            <div className="flex items-center gap-2">
                <div className="relative w-full">
                    <span className="absolute left-3 top-2.5 text-gray-400 text-xs">₦</span>
                    <input className="w-full pl-6 pr-2 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Min" type="number"/>
                </div>
                <span className="text-gray-400">-</span>
                <div className="relative w-full">
                    <span className="absolute left-3 top-2.5 text-gray-400 text-xs">₦</span>
                    <input className="w-full pl-6 pr-2 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Max" type="number"/>
                </div>
            </div>
        </div>

        {/* Property Type */}
        <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Property Type</label>
            <div className="space-y-2">
                {['Flat / Apartment', 'Duplex', 'Terrace', 'Bungalow'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                        <input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{type}</span>
                    </label>
                ))}
            </div>
        </div>

        {/* Bedrooms */}
        <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Bedrooms</label>
            <div className="flex gap-2">
                {['1', '2', '3', '4+'].map((num) => (
                    <button key={num} className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${num === '2' ? 'bg-primary text-white border-primary' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                        {num}
                    </button>
                ))}
            </div>
        </div>
        
        {/* Amenities */}
        <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-500 text-lg">bolt</span> Amenities
            </label>
            <div className="space-y-2">
                    {['24/7 Power', 'Gated Estate', 'Swimming Pool', 'Gym'].map((item) => (
                    <label key={item} className="flex items-center cursor-pointer">
                        <input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{item}</span>
                    </label>
                ))}
            </div>
        </div>

        <button className="w-full bg-navy hover:bg-blue-900 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-900/20">Apply Filters</button>
    </div>
);

export const Explore = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      
      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
             <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-surface-dark p-6 shadow-2xl overflow-y-auto animate-slide-in-right">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">Filters</h3>
                    <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <FilterContent />
             </div>
        </div>
      )}

      <main className="flex-1 p-4 pt-24 md:p-8 overflow-y-auto h-screen pb-24 md:pb-8">
         {/* Search & Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Properties in Lekki Phase 1</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Showing 1-12 of 145 results</p>
            </div>
            
             <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-80">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">search</span>
                    <input 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary shadow-sm text-sm outline-none" 
                        placeholder="Search location, price..." 
                        type="text"
                        defaultValue="Lekki Phase 1, Lagos"
                    />
                </div>
                
                <div className="flex gap-2">
                    {/* Mobile Filter Trigger */}
                    <button 
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden px-4 py-2.5 bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary border-primary flex items-center gap-2 font-medium shadow-sm"
                    >
                        <span className="material-symbols-outlined text-lg">tune</span>
                        Filters
                    </button>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 flex-1 sm:flex-none">
                        <select className="w-full sm:w-auto bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer">
                            <option>Sort: Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest First</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Active Filters:</span>
            <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800">
                Apartment
                <button className="ml-1 hover:text-blue-900"><span className="material-symbols-outlined text-sm">close</span></button>
            </div>
            <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800">
                ₦2M - ₦5M
                <button className="ml-1 hover:text-blue-900"><span className="material-symbols-outlined text-sm">close</span></button>
            </div>
            <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800">
                24/7 Power
                <button className="ml-1 hover:text-blue-900"><span className="material-symbols-outlined text-sm">close</span></button>
            </div>
            <button className="text-xs text-primary font-medium hover:underline ml-2">Clear All</button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar (Desktop) */}
            <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-4">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">tune</span> Filters
                        </h3>
                    </div>

                    {/* Filter Groups */}
                   <FilterContent />
                </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
                <div className="grid md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {/* Property Card 1 */}
                   <div onClick={() => navigate('/property/1')} className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700 group cursor-pointer relative">
                        <div className="absolute top-4 left-4 z-10 bg-green-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">auto_awesome</span> 98% Match
                        </div>
                        <button className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md p-1.5 rounded-full hover:bg-white text-white hover:text-red-500 transition">
                            <span className="material-symbols-outlined text-lg">favorite_border</span>
                        </button>
                        <div className="relative h-56 overflow-hidden">
                            <img alt="Modern Lekki House" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="/properties/property-1.jpg"/>
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                                <p className="text-white font-bold text-lg">₦3.5M <span className="text-xs font-normal opacity-80">/ year</span></p>
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">Luxury 2-Bed Service Apt</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">location_on</span> Lekki Phase 1, Lagos
                            </p>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">bolt</span> 24h Power
                                </span>
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">security</span> Gated
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bed</span> 2 Beds</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bathtub</span> 3 Baths</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span> 120m²</span>
                            </div>
                        </div>
                    </div>

                     {/* Property Card 2 */}
                    <div onClick={() => navigate('/property/2')} className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700 group cursor-pointer relative">
                        <div className="absolute top-4 left-4 z-10 bg-green-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">auto_awesome</span> 92% Match
                        </div>
                        <button className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md p-1.5 rounded-full hover:bg-white text-white hover:text-red-500 transition">
                            <span className="material-symbols-outlined text-lg">favorite_border</span>
                        </button>
                        <div className="relative h-56 overflow-hidden">
                            <img alt="Apartment Interior" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="/properties/property-2.jpg"/>
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                                <p className="text-white font-bold text-lg">₦4.2M <span className="text-xs font-normal opacity-80">/ year</span></p>
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">Newly Built 3-Bed Flat</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">location_on</span> Ikate, Lekki
                            </p>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">bolt</span> Solar
                                </span>
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">water_drop</span> Treated
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bed</span> 3 Beds</span>
                                <span className="flex items-center gap-1"><span class="material-symbols-outlined text-sm">bathtub</span> 4 Baths</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">garage</span> 2 Cars</span>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2">
                        <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white font-medium">1</button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium">2</button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium">3</button>
                        <span className="text-gray-400">...</span>
                        <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};
