import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { useSavedProperties } from '../../hooks/useData';

export const SavedProperties = () => {
  const navigate = useNavigate();
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const { savedProperties } = useSavedProperties();

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(itemId => itemId !== id));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare([...selectedForCompare, id]);
      } else {
        alert("You can only compare 2 properties at a time.");
      }
    }
  };

  const getCompareProperties = () => {
    return savedProperties.filter(p => selectedForCompare.includes(p.id));
  };

  return (
    <div className="bg-surface-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto h-screen pb-24 md:pb-8 p-4 pt-24 md:p-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                    My Saved Properties
                </h2>
                <div className="mt-2 flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50 max-w-2xl">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        We use your saved properties to understand your taste. The more you save, the smarter our recommendations become.
                    </p>
                </div>
            </div>
            <div className="mt-4 flex gap-3 md:mt-0 md:ml-4">
                {selectedForCompare.length === 2 && (
                     <button 
                        onClick={() => setShowCompareModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
                     >
                        <span className="material-symbols-outlined text-sm mr-2">compare_arrows</span>
                        Compare ({selectedForCompare.length})
                    </button>
                )}
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors">
                    <span className="material-symbols-outlined text-sm mr-2">delete_outline</span>
                    Clear All
                </button>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">Showing {savedProperties.length} saved properties</span>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-transparent dark:text-white">
                        <option>Date Added (Newest)</option>
                        <option>Price (Low to High)</option>
                        <option>Price (High to Low)</option>
                    </select>
                </div>
            </div>
        </div>

        {savedProperties.length === 0 ? (
            <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">favorite_border</span>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No saved properties yet</h4>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">Properties you save will appear here so you can easily find them later.</p>
                <button onClick={() => navigate('/explore')} className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                    Explore Properties
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedProperties.map((property: any) => (
                    <div 
                        key={property.id} 
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition duration-300 group cursor-pointer relative"
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src={property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} />
                            <div className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-md ${property.type === 'sale' ? 'bg-navy' : 'bg-secondary'}`}>
                                FOR {property.type ? property.type.toUpperCase() : 'RENT'}
                            </div>
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span> {property.city || property.location || 'Location'}
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // toggleSave(property.id); // TODO: implement remove button
                                }}
                                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white text-red-500 transition"
                            >
                                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{property.title}</h4>
                                <p className="text-primary font-bold whitespace-nowrap ml-2">
                                    ₦{(property.price / 1000000).toFixed(1)}M
                                    {property.type !== 'sale' && <span className="text-xs text-gray-400 font-normal">/yr</span>}
                                </p>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-1">{property.city ? `${property.city}, ${property.state}` : property.location}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bed</span> {property.bedrooms} Beds</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bathtub</span> {property.bathrooms} Baths</span>
                                {(property.amenities?.[0] || property.features?.[0]) && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bolt</span> {property.amenities?.[0] || property.features?.[0]}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>
    </div>
  );
};
