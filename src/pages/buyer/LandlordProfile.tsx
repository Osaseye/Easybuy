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
                            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full p-1 bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-100 dark:ring-gray-700">
                                <img alt="Mr. Adebayo" className="h-full w-full object-cover rounded-full" src="/landlord.jpg"/>
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
                                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">Mr. Adebayo</h1>
                                    <span className="bg-blue-100 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 uppercase tracking-wide">
                                        Verified Owner
                                    </span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center lg:justify-start gap-2 mb-4">
                                    <span className="material-symbols-outlined text-lg">location_on</span> Lagos, Nigeria 
                                    <span className="w-1 h-1 bg-gray-400 rounded-full mx-1"></span> 
                                    Member since 2018 (6 Years)
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8">
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Total Listings</p>
                                        <p className="text-2xl font-bold text-navy dark:text-blue-400">14</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Response Rate</p>
                                        <p className="text-2xl font-bold text-secondary">98%</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Tenant Rating</p>
                                        <div className="flex items-center justify-center lg:justify-start gap-1">
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">4.8</span>
                                            <span className="material-symbols-outlined text-yellow-400 text-xl fill-current">star</span>
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
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-2">About Mr. Adebayo</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                                Experienced property owner with over 6 years in the Lagos and Ibadan real estate market. I specialize in residential properties in Lekki Phase 1 and Bodija Estate. I am committed to providing safe, comfortable, and well-maintained homes for my tenants with a focus on transparency and quick maintenance response.
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
                        <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-semibold px-2.5 py-0.5 rounded-full">6</span>
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                        <select className="bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary py-2 px-3 cursor-pointer shadow-sm">
                            <option>Newest Listed</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {/* Listing 1 */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 group cursor-pointer relative">
                        <div className="relative h-64 overflow-hidden">
                            <img alt="Modern Lekki House" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="/properties/property-1.jpg"/>
                            <div className="absolute top-4 left-4 bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg">FOR SALE</div>
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span> Lekki Phase 1
                            </div>
                            <button className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-white text-gray-600 dark:text-white hover:text-red-500 transition">
                                <span className="material-symbols-outlined text-xl">favorite_border</span>
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Luxury Detached Duplex</h4>
                                <p className="text-primary font-bold">₦85M</p>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Admiralty Way, Lekki Phase 1, Lagos</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">bed</span> 5 Beds</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">bathtub</span> 6 Baths</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">square_foot</span> 450m²</span>
                            </div>
                            <button className="w-full mt-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold text-sm transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>

                    {/* Listing 2 */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 group cursor-pointer relative">
                        <div className="relative h-64 overflow-hidden">
                            <img alt="Modern Interior" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="/properties/property-2.jpg"/>
                            <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg">FOR RENT</div>
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span> Victoria Island
                            </div>
                            <button className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-white text-gray-600 dark:text-white hover:text-red-500 transition">
                                <span className="material-symbols-outlined text-xl">favorite_border</span>
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Serviced 2-Bed Apartment</h4>
                                <p className="text-primary font-bold">₦6M<span class="text-xs text-gray-400 font-normal">/yr</span></p>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">1004 Estate, Victoria Island, Lagos</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">bed</span> 2 Beds</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">bathtub</span> 2 Baths</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">bolt</span> 24h Power</span>
                            </div>
                            <button className="w-full mt-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold text-sm transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                
                    {/* Listing 3 */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 group cursor-pointer relative">
                        <div className="relative h-64 overflow-hidden">
                            <img alt="House in Ibadan" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="/properties/property-3.jpg"/>
                            <div className="absolute top-4 left-4 bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg">FOR SALE</div>
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span> Ibadan
                            </div>
                             <button className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-white text-gray-600 dark:text-white hover:text-red-500 transition">
                                <span className="material-symbols-outlined text-xl">favorite_border</span>
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Classic 4-Bed Bungalow</h4>
                                <p className="text-primary font-bold">₦35M</p>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Bodija Estate, Ibadan</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">bed</span> 4 Beds</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">deck</span> Garden</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">garage</span> 2 Cars</span>
                            </div>
                            <button className="w-full mt-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold text-sm transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};
