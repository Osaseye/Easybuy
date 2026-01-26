import React from 'react';

export const SearchSection = () => {
  return (
    <section className="relative z-30 -mt-10 lg:-mt-20 px-4">
      <div className="max-w-5xl mx-auto bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Location</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400 material-symbols-outlined">place</span>
              <input className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-primary dark:text-white placeholder-gray-400 text-sm" placeholder="e.g. Ikeja, Victoria Island" type="text" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Property Type</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400 material-symbols-outlined">apartment</span>
              <select className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-primary dark:text-white text-sm appearance-none cursor-pointer">
                <option>Duplex</option>
                <option>Flat / Apartment</option>
                <option>Bungalow</option>
                <option>Land</option>
              </select>
              <span className="absolute right-3 top-3 text-gray-400 material-symbols-outlined pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Budget (NGN)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400 material-symbols-outlined">payments</span>
              <select className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-primary dark:text-white text-sm appearance-none cursor-pointer">
                <option>₦500k - ₦2M / year</option>
                <option>₦2M - ₦5M / year</option>
                <option>₦50M - ₦150M (Buy)</option>
                <option>₦150M+ (Buy)</option>
              </select>
              <span className="absolute right-3 top-3 text-gray-400 material-symbols-outlined pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full md:w-auto bg-navy hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition flex items-center justify-center h-[46px]">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
