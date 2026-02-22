import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { useProperties } from '../../hooks/useProperties';

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
  const { properties } = useProperties();

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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Properties</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Showing 0 results</p>
            </div>
            
             <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-80">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">search</span>
                    <input 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary shadow-sm text-sm outline-none" 
                        placeholder="Search location, price..." 
                        type="text"
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
                <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No properties found</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};
