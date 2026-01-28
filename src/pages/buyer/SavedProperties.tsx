import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';

export const SavedProperties = () => {
  const navigate = useNavigate();
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const savedProperties = [
    {
      id: 1,
      image: "/properties/property-1.jpg",
      title: "Modern 4 Bed Duplex",
      price: "₦120M",
      location: "Lekki Phase 1, Lagos",
      beds: 4,
      baths: 4,
      size: "450 sqm",
      match: 95,
      type: "For Sale"
    },
    {
      id: 2,
      image: "/properties/property-2.jpg",
      title: "Luxury 2 Bed Apartment",
      price: "₦5M/yr",
      location: "Victoria Island, Lagos",
      beds: 2,
      baths: 2,
      size: "120 sqm",
      match: 88,
      type: "For Rent"
    },
    {
      id: 3,
      image: "/properties/property-3.jpg",
      title: "Contemporary Bungalow",
      price: "₦85M",
      location: "Maitama, Abuja",
      beds: 3,
      baths: 4,
      size: "300 sqm",
      match: 92,
      type: "For Sale"
    },
    {
      id: 4,
      image: "/properties/property-4.jpg",
      title: "Classic Semi-Detached",
      price: "₦90M",
      location: "Ikeja GRA, Lagos",
      beds: 4,
      baths: 4,
      size: "400 sqm",
      match: 0,
      type: "Sold Out",
      sold: true
    }
  ];

  const toggleCompare = (id: number) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProperties.map((property) => (
                <div key={property.id} onClick={() => navigate(`/property/${property.id}`)} className={`group relative bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border ${selectedForCompare.includes(property.id) ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-gray-100 dark:border-gray-700'} overflow-hidden flex flex-col cursor-pointer ${property.sold ? 'opacity-75' : ''}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                        {property.sold && (
                            <div className="absolute inset-0 bg-gray-900/50 z-10 flex items-center justify-center">
                                <span className="bg-red-600 text-white px-4 py-2 font-bold rounded-md transform -rotate-12 border-2 border-white">SOLD OUT</span>
                            </div>
                        )}
                        <img 
                            alt={property.title} 
                            className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ${property.sold ? 'grayscale' : ''}`} 
                            src={property.image}
                        />
                        <div className="absolute top-3 right-3 z-20" onClick={(e) => e.stopPropagation()}>
                            <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                                <span className="material-symbols-outlined text-red-500 text-xl block">favorite</span>
                            </button>
                        </div>
                        <div className="absolute bottom-3 left-3 z-20">
                            <span className={`px-2 py-1 text-white text-xs font-semibold rounded-md ${property.type === 'For Rent' ? 'bg-blue-600' : 'bg-green-600'}`}>
                                {property.type === 'Sold Out' ? 'Sold' : property.type}
                            </span>
                        </div>
                        
                        {/* Compare Checkbox Overlay */}
                        {!property.sold && (
                            <div className="absolute top-3 left-3 z-20" onClick={(e) => e.stopPropagation()}>
                                <label className="flex items-center space-x-2 cursor-pointer bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg hover:bg-black/70 transition">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedForCompare.includes(property.id)}
                                        onChange={() => toggleCompare(property.id)}
                                        className="rounded text-primary focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-white text-xs font-medium">Compare</span>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{property.title}</h3>
                            <p className={`${property.sold ? 'text-gray-500 line-through' : 'text-primary'} font-bold`}>{property.price}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-3">
                            <span className="material-symbols-outlined text-base mr-1">location_on</span>
                            {property.location}
                        </p>
                        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bed</span> {property.beds} Beds</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bathtub</span> {property.baths} Baths</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span> {property.size}</span>
                        </div>
                        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            {property.match > 0 ? (
                                <span className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">{property.match}% Match</span>
                            ) : (
                                <span className="text-xs text-gray-500 font-medium">No longer available</span>
                            )}
                            <button className={`text-sm font-medium ${property.sold ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-blue-700'}`}>
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Comparison Modal */}
        {showCompareModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-surface-dark z-10">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Property Comparison</h3>
                        <button onClick={() => setShowCompareModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-8">
                        {getCompareProperties().map(p => (
                            <div key={p.id} className="space-y-4">
                                <div className="aspect-video rounded-xl overflow-hidden">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{p.title}</h4>
                                    <p className="text-primary font-bold text-xl">{p.price}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400">Location</span>
                                        <span className="font-medium text-gray-900 dark:text-white text-right">{p.location}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400">Bedrooms</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{p.beds}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400">Bathrooms</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{p.baths}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400">Size</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{p.size}</span>
                                    </div>
                                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400">Match Score</span>
                                        <span className="font-bold text-green-600">{p.match}%</span>
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-700 transition">
                                    Contact Agent
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Because you liked these...</h3>
                <a className="text-primary hover:text-blue-700 dark:hover:text-blue-400 text-sm font-medium flex items-center" href="/explore">
                    See All Recommended <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </a>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
                <div className="relative z-10 md:flex items-center justify-between">
                    <div className="mb-6 md:mb-0 md:w-2/3">
                        <h4 className="text-2xl font-bold mb-2">We found 12 new properties matching your style!</h4>
                        <p className="text-blue-100">Based on your saved properties in Lekki and Victoria Island, our AI has curated a list just for you.</p>
                    </div>
                    <div>
                        <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:-translate-y-1">
                            View Recommendations
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};
