import React from 'react';

export const FeaturedListings = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Personalized Discovery</h3>
            <p className="text-gray-600 dark:text-gray-400">Handpicked properties across Nigeria's top cities tailored for you.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap">All Cities</button>
            <button className="px-4 py-2 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary rounded-full text-sm font-medium whitespace-nowrap transition">Lagos</button>
            <button className="px-4 py-2 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary rounded-full text-sm font-medium whitespace-nowrap transition">Abuja</button>
            <button className="px-4 py-2 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary rounded-full text-sm font-medium whitespace-nowrap transition">Ibadan</button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition duration-300 group cursor-pointer">
            <div className="relative h-64 overflow-hidden">
              <img alt="House in Lagos" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhizLMSEcnnhYPAa_umn0gVDR-xidCdQghcOygY2dGHNxqDpEzr3HNyyC5UTL6fYSpgCvMtw-CnI6y8UExbhRySrmsruaFOB61XJQEGkx_xN40HTkshTC8JYXfmpLWtNTG2qem9gcoWRUpirS4RH9jU4_ftPKCrRg-LDVXRA6lxlVCRFAV_qu8ul2tcJ0EGZz0QutuadXLw9ce7Q9O1zO77XGxE5d_CC49gWT_s508D5OPeu7NbPne-ivOSONBuZeuYqfEFMXfIJcW" />
              <div className="absolute top-4 left-4 bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-md">FOR SALE</div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span> Lagos
              </div>
              <button className="absolute bottom-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full hover:bg-white text-white hover:text-red-500 transition">
                <span className="material-symbols-outlined text-xl">favorite_border</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">Luxury 5-Bed Duplex</h4>
                <p className="text-primary font-bold">₦150M</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Banana Island, Ikoyi</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bed</span> 5 Beds</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bathtub</span> 6 Baths</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">square_foot</span> 600m²</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition duration-300 group cursor-pointer">
            <div className="relative h-64 overflow-hidden">
              <img alt="Apartment in Abuja" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-jY3GntlKDTKqpNABTnFTdNFJEk0yvxa1a17t9avR5NYVOYRQpQUIgcCL1EmBN4vBLPAxxi4xTK0oc40Q54ZDfCQ0p8TvwMJMYMU57czMGnNf-7ituwJK_7_aFz8eBizZki3a8a-yx9vYdpvfWBj6KYSJ7kXkMs-BLhoUohLRfOYLjPK9mYPyrJHxVt1nEJWAlnb8Yswn3pbnzB7z7loL1cfxfuwONzdmFCcnCsRceKwoRemLRcYhqOzA60PQf5D63u5S3Uf9ZZCZ" />
              <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-md">FOR RENT</div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span> Abuja
              </div>
              <button className="absolute bottom-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full hover:bg-white text-white hover:text-red-500 transition">
                <span className="material-symbols-outlined text-xl">favorite_border</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">Modern 3-Bed Apartment</h4>
                <p className="text-primary font-bold">₦4.5M<span className="text-xs text-gray-400 font-normal">/yr</span></p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Wuse 2, Abuja</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bed</span> 3 Beds</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bathtub</span> 4 Baths</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bolt</span> 24h Power</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition duration-300 group cursor-pointer hidden lg:block">
            <div className="relative h-64 overflow-hidden">
              <img alt="House in Ibadan" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6bqL9m2-_kjAoOPu5I3WPy2NbHevyewgEjEeQwpMVp_znZvIKrSKOXJErkIwnhP6feahaK03zeElDFU6AkxvyYl2GJ7wLVJTu1sEau3yacH_lE4Lj4vARXOCc2bj8MJ60XMUS1e8GcugFwIddTfpp_7lkkVP3azir7pVwhAiWLA862kTsVBUlgFY94Rfovfx6YGqxNnhXgIfjTFjpBZD_yu3w-LHm0UFKRvrhy-tin7byD_G0XwsqhPBBIohj0wdCrKortqUTj0N7" />
              <div className="absolute top-4 left-4 bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-md">FOR SALE</div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span> Ibadan
              </div>
              <button className="absolute bottom-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full hover:bg-white text-white hover:text-red-500 transition">
                <span className="material-symbols-outlined text-xl">favorite_border</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">Classic Bungalow</h4>
                <p className="text-primary font-bold">₦35M</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Bodija Estate, Ibadan</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bed</span> 4 Beds</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">deck</span> Garden</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">garage</span> 2 Cars</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <a className="inline-flex items-center gap-2 text-primary font-bold hover:text-blue-700 transition" href="#">
            View all listings <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};
