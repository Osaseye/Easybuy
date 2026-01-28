import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';

export const BuyerDashboard = () => {
  const navigate = useNavigate();
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Chisom!</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">We found 12 new properties matching your preferences in Lagos.</p>
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
                {/* Recommended Card 1 */}
                <div onClick={() => navigate('/property/1')} className="min-w-[300px] md:min-w-[340px] bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 snap-center group cursor-pointer overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                        <img alt="Modern Lekki Apartment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/properties/property-1.jpg" />
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm p-1.5 rounded-full shadow-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-red-500 text-sm">favorite</span>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                            Best Match
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Lekki Phase 1</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Admiralty Way, Lagos</p>
                            </div>
                            <span className="text-primary font-bold">₦85M</span>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">bed</span> 3 Beds
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">bathtub</span> 4 Baths
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">square_foot</span> 400 sqm
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Card 2 */}
                <div onClick={() => navigate('/property/2')} className="min-w-[300px] md:min-w-[340px] bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 snap-center group cursor-pointer overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                        <img alt="Luxury Villa Abuja" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/properties/property-2.jpg" />
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm p-1.5 rounded-full shadow-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-400 text-sm">favorite</span>
                        </div>
                    </div>
                    <div className="p-4">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Maitama Villa</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Maitama District, Abuja</p>
                            </div>
                            <span className="text-primary font-bold">₦250M</span>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">bed</span> 5 Beds
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">bathtub</span> 6 Baths
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">pool</span> Pool
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Card 3 */}
                <div onClick={() => navigate('/property/3')} className="min-w-[300px] md:min-w-[340px] bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 snap-center group cursor-pointer overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                        <img alt="Ikeja Duplex" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/properties/property-3.jpg" />
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm p-1.5 rounded-full shadow-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-400 text-sm">favorite</span>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-navy text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                            Newly Built
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg">GRA Duplex</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Ikeja GRA, Lagos</p>
                            </div>
                            <span className="text-primary font-bold">₦120M</span>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">bed</span> 4 Beds
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">bathtub</span> 5 Baths
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">garage</span> 2 Cars
                            </div>
                        </div>
                    </div>
                </div>
                
                 {/* View All Card */}
                 <div className="min-w-[300px] md:min-w-[340px] bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 snap-center group cursor-pointer overflow-hidden flex flex-col">
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                       <span className="text-gray-400 dark:text-gray-500 font-medium flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-4xl">add_home</span>
                            View All Recommendations
                       </span>
                    </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-20">
                {/* Available Listing 1 */}
                <article onClick={() => navigate('/property/4')} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group cursor-pointer overflow-hidden flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                        <img alt="Victoria Island Apartment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/properties/property-4.jpg" />
                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 dark:text-white shadow-sm flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Verified
                         </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start">
                            <p className="text-xs uppercase tracking-wide font-semibold text-secondary mb-1">Apartment</p>
                            <span className="text-xs text-gray-400 dark:text-gray-500">2 days ago</span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-1 truncate">Ocean View Apartment</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span> Victoria Island, Lagos
                        </p>
                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 dark:border-gray-700 mb-4">
                            <div className="text-center">
                                <span className="block font-bold text-gray-900 dark:text-white">2</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Beds</span>
                            </div>
                            <div className="text-center border-l border-gray-100 dark:border-gray-700">
                                <span className="block font-bold text-gray-900 dark:text-white">2</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Baths</span>
                            </div>
                            <div className="text-center border-l border-gray-100 dark:border-gray-700">
                                <span className="block font-bold text-gray-900 dark:text-white">120</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">sqm</span>
                            </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500">Price</p>
                                <p className="text-lg font-bold text-primary">₦65,000,000</p>
                            </div>
                            <button className="bg-navy hover:bg-primary text-white p-2 rounded-full transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* Available Listing 2 */}
                <article onClick={() => navigate('/property/5')} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group cursor-pointer overflow-hidden flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                        <img alt="Banana Island Terrace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/properties/property-5.jpg" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start">
                            <p className="text-xs uppercase tracking-wide font-semibold text-secondary mb-1">Terrace</p>
                            <span className="text-xs text-gray-400 dark:text-gray-500">5 hrs ago</span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-1 truncate">Modern Terrace Duplex</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span> Banana Island, Lagos
                        </p>
                         <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 dark:border-gray-700 mb-4">
                            <div className="text-center">
                                <span className="block font-bold text-gray-900 dark:text-white">4</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Beds</span>
                            </div>
                            <div className="text-center border-l border-gray-100 dark:border-gray-700">
                                <span className="block font-bold text-gray-900 dark:text-white">5</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Baths</span>
                            </div>
                            <div className="text-center border-l border-gray-100 dark:border-gray-700">
                                <span className="block font-bold text-gray-900 dark:text-white">300</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">sqm</span>
                            </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500">Price</p>
                                <p className="text-lg font-bold text-primary">₦450,000,000</p>
                            </div>
                            <button className="bg-navy hover:bg-primary text-white p-2 rounded-full transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* Available Listing 3 */}
                <article onClick={() => navigate('/property/6')} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group cursor-pointer overflow-hidden flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                        <img alt="Yaba Semi-Detached" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/properties/property-6.jpg" />
                         <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 dark:text-white shadow-sm flex items-center gap-1">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Hot Deal
                         </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start">
                            <p className="text-xs uppercase tracking-wide font-semibold text-secondary mb-1">Semi-Detached</p>
                            <span className="text-xs text-gray-400 dark:text-gray-500">1 day ago</span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-1 truncate">Family Home in Yaba</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span> Alagomeji, Yaba
                        </p>
                         <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 dark:border-gray-700 mb-4">
                            <div className="text-center">
                                <span className="block font-bold text-gray-900 dark:text-white">3</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Beds</span>
                            </div>
                            <div className="text-center border-l border-gray-100 dark:border-gray-700">
                                <span className="block font-bold text-gray-900 dark:text-white">3</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Baths</span>
                            </div>
                            <div className="text-center border-l border-gray-100 dark:border-gray-700">
                                <span className="block font-bold text-gray-900 dark:text-white">220</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">sqm</span>
                            </div>
                        </div>
                         <div className="mt-auto flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500">Price</p>
                                <p className="text-lg font-bold text-primary">₦75,000,000</p>
                            </div>
                            <button className="bg-navy hover:bg-primary text-white p-2 rounded-full transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* Agent Call to Action */}
                <article className="bg-gradient-to-br from-navy to-primary rounded-xl shadow-lg flex flex-col justify-center items-center p-8 text-center text-white relative overflow-hidden group min-h-[400px]">
                    <div className="absolute inset-0 bg-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500" style={{backgroundImage: "url('/properties/property-8.jpg')"}}></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <span className="material-symbols-outlined text-5xl mb-4 text-secondary">real_estate_agent</span>
                        <h4 className="font-bold text-2xl mb-2">Can't find what you need?</h4>
                        <p className="text-blue-100 mb-6 text-sm max-w-xs">Our agents can help you find off-market properties tailored to your taste.</p>
                        <button className="bg-white text-primary font-bold px-6 py-2.5 rounded-full hover:bg-gray-100 transition shadow-md">
                            Talk to an Agent
                        </button>
                    </div>
                </article>

            </div>
             
             <div className="mt-10 flex justify-center mb-10">
                <button className="flex items-center gap-2 text-primary font-semibold hover:text-blue-700 transition">
                    Show more properties <span className="material-symbols-outlined">expand_more</span>
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
