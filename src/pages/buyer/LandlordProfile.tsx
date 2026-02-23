import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { db } from '../../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';
import { LoadingState } from '../../components/common/LoadingState';

interface LandlordProfileData {
  displayName: string;
  photoURL: string;
  phoneNumber?: string;
  location?: string;
  description?: string;
}

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
}

export const LandlordProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [landlord, setLandlord] = useState<LandlordProfileData | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandlordData = async () => {
      if (!id) return;
      try {
        // Fetch Landlord Profile
        const landlordDoc = await getDoc(doc(db, 'users', id));
        if (landlordDoc.exists()) {
          setLandlord(landlordDoc.data() as LandlordProfileData);
        } else {
          toast.error('Landlord not found');
          setLoading(false);
          return;
        }

        // Fetch Landlord Properties
        const q = query(collection(db, 'properties'), where('landlordId', '==', id), where('status', '==', 'available'));
        const querySnapshot = await getDocs(q);
        const fetchedProperties = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];
        
        setProperties(fetchedProperties);
      } catch (error) {
        console.error("Error fetching landlord data:", error);
        toast.error('Failed to load landlord profile');
      } finally {
        setLoading(false);
      }
    };

    fetchLandlordData();
  }, [id]);

  if (loading) return (
    <div className="bg-surface-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen pb-24 md:pb-0 pt-20 md:pt-0 flex items-center justify-center">
        <LoadingState />
      </main>
    </div>
  );

  if (!landlord) return (
    <div className="bg-surface-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen pb-24 md:pb-0 pt-20 md:pt-0 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">person_off</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Landlord not found</h2>
          <p className="text-gray-500 dark:text-gray-400">The profile you are looking for does not exist.</p>
          <button onClick={() => navigate('/explore')} className="mt-4 text-primary hover:underline">Back to Explore</button>
        </div>
      </main>
    </div>
  );

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
                            {landlord.photoURL ? (
                                <img src={landlord.photoURL} alt={landlord.displayName} className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover p-1 bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-100 dark:ring-gray-700" />
                            ) : (
                                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full p-1 bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-100 dark:ring-gray-700 flex items-center justify-center text-gray-400">
                                    <span className="material-symbols-outlined text-6xl">person</span>
                                </div>
                            )}
                            <div className="absolute bottom-2 right-2 bg-secondary text-white p-1.5 rounded-full ring-4 ring-white dark:ring-surface-dark shadow-lg" title="Identity Verified">
                                <span className="material-symbols-outlined text-xl leading-none">verified</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full text-center lg:text-left">
                        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 mb-6">
                            <div>
                                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">{landlord.displayName || 'Landlord'}</h1>
                                    <span className="bg-blue-100 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 uppercase tracking-wide">
                                        Verified Owner
                                    </span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center lg:justify-start gap-2 mb-4">
                                    <span className="material-symbols-outlined text-lg">location_on</span> {landlord.location || 'Location Not Provided'}
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8">
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Total Listings</p>
                                        <p className="text-2xl font-bold text-navy dark:text-blue-400">{properties.length}</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Response Rate</p>
                                        <p className="text-2xl font-bold text-secondary">N/A</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[100px]">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1">Tenant Rating</p>
                                        <div className="flex items-center justify-center lg:justify-start gap-1">
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">N/A</span>
                                            <span className="material-symbols-outlined text-gray-400 text-xl fill-current">star</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <button 
                                    onClick={() => {
                                        if (landlord.phoneNumber) {
                                            window.location.href = `tel:${landlord.phoneNumber}`;
                                        } else {
                                            toast.info('Phone number not provided by landlord');
                                        }
                                    }}
                                    className="bg-primary hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
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
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-2">About Landlord</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                                {landlord.description || 'No description provided yet.'}
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
                        <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-semibold px-2.5 py-0.5 rounded-full">{properties.length}</span>
                    </h2>
                </div>
                
                {properties.length === 0 ? (
                    <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No active listings</h4>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">This landlord currently has no active properties listed.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map(property => (
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
                                    <p className="text-xl font-bold text-primary mb-3">₦{property.price.toLocaleString()}/yr</p>
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
            </div>
        </section>
      </main>
    </div>
  );
};
