import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'sonner';

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  propertyType: string;
  type?: 'rent' | 'sale';
  bedrooms: number;
  bathrooms: number;
  images: string[];
  status: string;
}

export const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(collection(db, 'properties'), where('status', '==', 'available'));
        const querySnapshot = await getDocs(q);
        const fetchedProperties = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];
        
        setProperties(fetchedProperties);

        // Simple Recommendation Logic (Weighted Scoring)
        const prefs = (currentUser as any)?.preferences;
        
        let sortedRecommendations = fetchedProperties;
        
        if (prefs) {
            const scoredProperties = fetchedProperties.map(prop => {
                let score = 0;
                let explanations: string[] = [];

                // 1. Location match (Highest Priority)
                if (prefs.preferredLocation) {
                    const prefLoc = prefs.preferredLocation.toLowerCase();
                    if (prop.city?.toLowerCase().includes(prefLoc) || prop.state?.toLowerCase().includes(prefLoc)) {
                        score += 50; 
                        explanations.push('Location match');
                    }
                }

                // 2. Budget calculation (High Priority)
                if (prefs.budget) {
                    const maxBudget = Number(prefs.budget);
                    if (prop.price <= maxBudget) {
                        score += 30; // Within budget is great
                        explanations.push('Within budget');
                    } else if (prop.price <= maxBudget * 1.2) {
                        score += 10; // Slightly over budget (20%) is okay
                        explanations.push('Slightly over budget');
                    } else {
                        score -= 20; // Massively over budget is bad
                    }
                }

                // 3. Property type match
                if (prefs.propertyTypes && prefs.propertyTypes.length > 0) {
                    if (prefs.propertyTypes.includes(prop.propertyType)) {
                        score += 20;
                        explanations.push('Preferred type');
                    }
                }

                // 4. Bedrooms match
                if (prefs.bedrooms) {
                    const prefBeds = parseInt(prefs.bedrooms) || 0;
                    if (prop.bedrooms === prefBeds) {
                        score += 15; // Exact match
                    } else if (prop.bedrooms > prefBeds) {
                        score += 10; // More bedrooms than needed
                    }
                }
                
                // Add tiny random variance to break exact ties and make the feed dynamic
                score += Math.random();
                
                return { ...prop, score, matchReasons: explanations };
            });

            // Filter out properties that don't match any primary criteria (must score over 20)
            sortedRecommendations = scoredProperties
                .filter(p => p.score > 20) 
                .sort((a, b) => b.score - a.score);
        }

        setRecommended(sortedRecommendations.slice(0, 5));

      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
        fetchProperties();
    }
  }, [currentUser]);

  const filteredProperties = properties.filter(p => {
      // Filter by type
      if (filter !== 'All' && p.propertyType !== filter) return false;
      
      // Filter by search query (title, city, state)
      if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          const matchesTitle = p.title?.toLowerCase().includes(lowerQuery);
          const matchesCity = p.city?.toLowerCase().includes(lowerQuery);
          const matchesState = p.state?.toLowerCase().includes(lowerQuery);
          
          if (!matchesTitle && !matchesCity && !matchesState) {
              return false;
          }
      }
      
      return true;
  });

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 p-4 pt-24 md:p-8 overflow-y-auto h-screen relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {currentUser?.displayName || 'User'}!</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">We found {recommended.length} new properties matching your preferences.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">search</span>
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary shadow-sm text-sm outline-none" 
                        placeholder="Search location, title..." 
                        type="text"
                    />
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">Curated based on your preferences</p>
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
                
                {loading ? (
                    <div className="w-full flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : recommended.length === 0 ? (
                    <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">home_work</span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No recommendations yet</h4>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">Save properties or update your preferences to get personalized recommendations.</p>
                    </div>
                ) : (
                    recommended.map(property => (
                        <div key={property.id} onClick={() => navigate(`/property/${property.id}`)} className="min-w-[300px] max-w-[300px] bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-shadow snap-start shrink-0">
                            <div className="relative h-40">
                                <img src={property.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'} alt={property.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-primary shadow-sm">
                                    Recommended
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">{property.title}</h4>
                                <p className="text-primary font-bold mb-2">₦{property.price.toLocaleString()}{property.type === 'sale' ? '' : '/yr'}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">location_on</span>
                                    {property.city}, {property.state}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>

        {/* Available Listings Grid */}
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-lg font-bold text-navy dark:text-blue-100">Available Listings</h3>
                <div className="flex gap-2 text-sm overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
                    <button onClick={() => setFilter('All')} className={`${filter === 'All' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'} px-4 py-1.5 rounded-full hover:bg-blue-700 hover:text-white transition whitespace-nowrap`}>All</button>
                    <button onClick={() => setFilter('Apartment')} className={`${filter === 'Apartment' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'} px-4 py-1.5 rounded-full hover:bg-blue-700 hover:text-white transition whitespace-nowrap`}>Apartments</button>
                    <button onClick={() => setFilter('House')} className={`${filter === 'House' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'} px-4 py-1.5 rounded-full hover:bg-blue-700 hover:text-white transition whitespace-nowrap`}>Houses</button>
                </div>
            </div>
            
            {loading ? (
                <div className="w-full flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : filteredProperties.length === 0 ? (
                <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center mb-10">
                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No listings available</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">There are currently no properties matching your criteria. Please check back later or adjust your filters.</p>
                    <button onClick={() => setFilter('All')} className="bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm">
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {filteredProperties.map(property => (
                        <div key={property.id} onClick={() => navigate(`/property/${property.id}`)} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-shadow group">
                            <div className="relative h-48">
                                <img src={property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                    {property.propertyType}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{property.title}</h3>
                                </div>
                                <p className="text-xl font-bold text-primary mb-3">₦{property.price.toLocaleString()}{property.type === 'sale' ? '' : '/yr'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    {property.city}, {property.state}
                                </p>
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">bed</span>
                                        {property.bedrooms}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">bathtub</span>
                                        {property.bathrooms}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
      </main>
    </div>
  );
};
