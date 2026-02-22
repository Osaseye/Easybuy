import React from 'react';
import { useProperties } from '../../../hooks/useProperties';

export const FeaturedListings = () => {
  const { properties } = useProperties();
  const featuredProperties = properties.slice(0, 3);

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
          {featuredProperties.map((property) => (
            <div key={property.id} className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition duration-300 group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src={property.images[0]} />
                <div className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-md ${property.type === 'sale' ? 'bg-navy' : 'bg-secondary'}`}>
                  FOR {property.type.toUpperCase()}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span> {property.location.split(',')[1]?.trim() || property.location}
                </div>
                <button className="absolute bottom-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full hover:bg-white text-white hover:text-red-500 transition">
                  <span className="material-symbols-outlined text-xl">favorite_border</span>
                </button>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{property.title}</h4>
                  <p className="text-primary font-bold">
                    ₦{(property.price / 1000000).toFixed(1)}M
                    {property.period && <span className="text-xs text-gray-400 font-normal">/{property.period}</span>}
                  </p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-1">{property.location}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bed</span> {property.bedrooms} Beds</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bathtub</span> {property.bathrooms} Baths</span>
                  {property.features?.[0] && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bolt</span> {property.features[0]}</span>}
                </div>
              </div>
            </div>
          ))}
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
