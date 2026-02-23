import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { useProperties } from '../../hooks/useProperties';

export const Explore = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const navigate = useNavigate();
  const { properties, loading } = useProperties();

  // Filter States
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('Sort: Recommended');

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const locationString = `${property.city || ''}, ${property.state || ''}`.toLowerCase();
      // Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!property.title?.toLowerCase().includes(query) && !locationString.includes(query)) {
          return false;
        }
      }

      // Budget
      if (minPrice && property.price < parseInt(minPrice)) return false;
      if (maxPrice && property.price > parseInt(maxPrice)) return false;

      // Property Type
      if (selectedTypes.length > 0) {
        const matchesType = selectedTypes.some(type => {
          const t = type.toLowerCase();
          if (t === 'flat / apartment') {
            return property.title?.toLowerCase().includes('flat') || property.title?.toLowerCase().includes('apartment') || property.propertyType?.toLowerCase().includes('apartment');
          }
          return property.title?.toLowerCase().includes(t) || property.propertyType?.toLowerCase().includes(t);
        });
        if (!matchesType) return false;
      }

      // Bedrooms
      if (selectedBedrooms) {
        if (selectedBedrooms === '4+') {
          if (property.bedrooms < 4) return false;
        } else {
          if (property.bedrooms !== parseInt(selectedBedrooms)) return false;
        }
      }

      // Amenities
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          property.amenities?.some((f: string) => f.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'Price: Low to High') return a.price - b.price;
      if (sortOption === 'Price: High to Low') return b.price - a.price;
      if (sortOption === 'Newest First') return parseInt(b.id) - parseInt(a.id);
      // Recommended
      return (b.matchScore || 0) - (a.matchScore || 0);
    });
  }, [properties, searchQuery, minPrice, maxPrice, selectedTypes, selectedBedrooms, selectedAmenities, sortOption]);

  const FilterContent = () => (
    <div className="space-y-6">
        {/* Budget */}
        <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Budget (Yearly)</label>
            <div className="flex items-center gap-2">
                <div className="relative w-full">
                    <span className="absolute left-3 top-2.5 text-gray-400 text-xs">₦</span>
                    <input 
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full pl-6 pr-2 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" 
                        placeholder="Min" 
                        type="number"
                    />
                </div>
                <span className="text-gray-400">-</span>
                <div className="relative w-full">
                    <span className="absolute left-3 top-2.5 text-gray-400 text-xs">₦</span>
                    <input 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full pl-6 pr-2 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" 
                        placeholder="Max" 
                        type="number"
                    />
                </div>
            </div>
        </div>

        {/* Property Type */}
        <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Property Type</label>
            <div className="space-y-2">
                {['Flat / Apartment', 'Duplex', 'Terrace', 'Bungalow'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                        <input 
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeToggle(type)}
                            className="rounded border-gray-300 text-primary focus:ring-primary" 
                            type="checkbox"
                        />
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
                    <button 
                        key={num} 
                        onClick={() => setSelectedBedrooms(selectedBedrooms === num ? null : num)}
                        className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${selectedBedrooms === num ? 'bg-primary text-white border-primary' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
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
                        <input 
                            checked={selectedAmenities.includes(item)}
                            onChange={() => handleAmenityToggle(item)}
                            className="rounded border-gray-300 text-primary focus:ring-primary" 
                            type="checkbox"
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{item}</span>
                    </label>
                ))}
            </div>
        </div>

        <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full bg-navy hover:bg-blue-900 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-900/20"
        >
            Apply Filters
        </button>
    </div>
  );

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
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Showing {filteredProperties.length} results</p>
            </div>
            
             <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-80">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">search</span>
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                        <select 
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full sm:w-auto bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer"
                        >
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
                        {(minPrice || maxPrice || selectedTypes.length > 0 || selectedBedrooms || selectedAmenities.length > 0) && (
                            <button 
                                onClick={() => {
                                    setMinPrice('');
                                    setMaxPrice('');
                                    setSelectedTypes([]);
                                    setSelectedBedrooms(null);
                                    setSelectedAmenities([]);
                                }}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Filter Groups */}
                   <FilterContent />
                </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
                {loading ? (
                    <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Loading properties...</h4>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No properties found</h4>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                            <div 
                                key={property.id} 
                                onClick={() => navigate(`/property/${property.id}`)}
                                className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition duration-300 group cursor-pointer"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" src={property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} />
                                    <div className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-md ${property.type === 'sale' ? 'bg-navy' : 'bg-secondary'}`}>
                                        FOR {property.type ? property.type.toUpperCase() : 'RENT'}
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">location_on</span> {property.city || (property.location && typeof property.location === 'string' ? property.location.split(',')[1]?.trim() : '') || property.location || 'Location'}
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle save
                                        }}
                                        className="absolute bottom-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full hover:bg-white text-white hover:text-red-500 transition"
                                    >
                                        <span className="material-symbols-outlined text-xl">favorite_border</span>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{property.title}</h4>
                                        <p className="text-primary font-bold whitespace-nowrap ml-2">
                                            ₦{(property.price / 1000000).toFixed(1)}M
                                            <span className="text-xs text-gray-400 font-normal">/{property.period || 'yr'}</span>
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
            </div>
        </div>
      </main>
    </div>
  );
};
