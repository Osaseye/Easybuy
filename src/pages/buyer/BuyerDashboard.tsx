import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useProperties } from '../../hooks/useProperties';

export const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { properties } = useProperties();

  // Toggle dark mode function
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 p-4 pt-24 md:p-8 overflow-y-auto h-screen relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {currentUser?.displayName || 'User'}!</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">We found 0 new properties matching your preferences.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">search</span>
                    <input className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary shadow-sm text-sm outline-none" placeholder="Search location, price..." type="text"/>
                </div>
                <button className="p-2.5 bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 shadow-sm transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined">tune</span>
                </button>
            </div>
        </div>

        {/* Recommended Section */}
        <section className="mb-10">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-lg font-bold text-navy dark:text-blue-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">verified</span>
                        Recommended for You
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Curated based on your saved items</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
                
                <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">home_work</span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No recommendations yet</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">Save properties or update your preferences to get personalized recommendations.</p>
                </div>

            </div>
        </section>

        {/* Available Listings Grid */}
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-lg font-bold text-navy dark:text-blue-100">Available Listings</h3>
                <div className="flex gap-2 text-sm overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
                    <button className="bg-primary text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition whitespace-nowrap">All</button>
                    <button className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition whitespace-nowrap">For Sale</button>
                    <button className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition whitespace-nowrap">For Rent</button>
                </div>
            </div>
            
            <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center mb-10">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No listings available</h4>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">There are currently no properties matching your criteria. Please check back later or adjust your filters.</p>
                <button className="bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm">
                    Clear Filters
                </button>
            </div>
        </section>

        {/* Floating Dark Mode Toggle (Removed as per request) */}
        {/* <div className="fixed bottom-6 right-6 z-50">
            <button 
                onClick={toggleDarkMode}
                className="bg-primary hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
            >
                <span className="material-symbols-outlined block dark:hidden">dark_mode</span>
                <span className="material-symbols-outlined hidden dark:block">light_mode</span>
            </button>
        </div> */}
      </main>
    </div>
  );
};
