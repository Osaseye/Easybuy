import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { ReviewModal } from '../../components/common/ReviewModal';
import { LoadingState } from '../../components/common/LoadingState';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  size?: number;
  description: string;
  images: string[];
  amenities: string[];
  landlordId: string;
}

interface LandlordProfile {
  displayName: string;
  photoURL: string;
  phoneNumber?: string;
}

export const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [landlord, setLandlord] = useState<LandlordProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  useEffect(() => {
    const fetchPropertyAndLandlord = async () => {
      if (!id) return;
      try {
        // Fetch Property
        const propertyDoc = await getDoc(doc(db, 'properties', id));
        if (propertyDoc.exists()) {
          const propData = { id: propertyDoc.id, ...propertyDoc.data() } as Property;
          setProperty(propData);

          // Fetch Landlord Profile
          if (propData.landlordId) {
            const landlordDoc = await getDoc(doc(db, 'users', propData.landlordId));
            if (landlordDoc.exists()) {
              setLandlord(landlordDoc.data() as LandlordProfile);
            }
          }
        } else {
          toast.error('Property not found');
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        toast.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyAndLandlord();
  }, [id]);

  if (loading) return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 pt-24 md:p-8 overflow-y-auto h-screen pb-24 md:pb-8 flex items-center justify-center">
        <LoadingState />
      </main>
    </div>
  );
  
  if (!property) return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 pt-24 md:p-8 overflow-y-auto h-screen pb-24 md:pb-8 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Property not found</h2>
          <p className="text-gray-500 dark:text-gray-400">The property you are looking for does not exist or has been removed.</p>
          <button onClick={() => navigate('/explore')} className="mt-4 text-primary hover:underline">Back to Explore</button>
        </div>
      </main>
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 p-4 pt-24 md:p-8 overflow-y-auto h-screen pb-24 md:pb-8">
        <nav aria-label="Breadcrumb" className="flex mb-6">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <a className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/dashboard">
                  <span className="material-symbols-outlined text-sm">home</span>
                  <span className="sr-only">Home</span>
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-gray-300 text-sm flex-shrink-0">chevron_right</span>
                <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" href="/explore">Explore</a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-gray-300 text-sm flex-shrink-0">chevron_right</span>
                <span aria-current="page" className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400">{property.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative h-[400px] w-full">
                <img alt={property.title} className="w-full h-full object-cover" src={property.images?.[0] || 'https://via.placeholder.com/800x400?text=No+Image'} />
                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md">
                  For Rent
                </span>
                <button className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur text-gray-800 dark:text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg flex items-center gap-2 hover:bg-white dark:hover:bg-black transition-colors">
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  Show all photos
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50 dark:bg-gray-800/50">
                 {property.images?.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="h-24 rounded-lg overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all">
                        <img alt={`View ${idx}`} className="w-full h-full object-cover" src={img} />
                    </div>
                 ))}
                 {/* Fallback duplicates for layout if single image */}
                 {[...Array(Math.max(0, 4 - (property.images?.length || 0)))].map((_, idx) => (
                    <div key={idx + 4} className="h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700"></div>
                 ))}
              </div>
            </div>

            {/* Title & Key Specs */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{property.title}</h1>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium border border-blue-200 dark:border-blue-800">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      Verified
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 text-sm">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {property.address}, {property.city}, {property.state}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-2xl font-bold px-4 py-2 rounded-lg border border-green-200 dark:border-green-800">
                    ₦{(property.price / 1000000).toFixed(1)}M
                    <span className="text-sm font-normal text-gray-500">/yr</span>
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                      <span className="material-symbols-outlined">bed</span>
                    </div>
                    <div>
                        <span className="block text-xl font-bold text-gray-900 dark:text-white">{property.bedrooms}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Bedrooms</span>
                    </div>
                  </div>
                   <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                      <span className="material-symbols-outlined">bathtub</span>
                    </div>
                    <div>
                        <span className="block text-xl font-bold text-gray-900 dark:text-white">{property.bathrooms}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Bathrooms</span>
                    </div>
                  </div>
                   <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                      <span className="material-symbols-outlined">square_foot</span>
                    </div>
                    <div>
                        <span className="block text-xl font-bold text-gray-900 dark:text-white">{property.size || 0}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Sqm</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                      <span className="material-symbols-outlined">home</span>
                    </div>
                    <div>
                        <span className="block text-xl font-bold text-gray-900 dark:text-white">{property.propertyType}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Type</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About this Property</h2>
              <div className="prose prose-blue prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {property.description}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Amenities & Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                  {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                          <span className="text-sm">{amenity}</span>
                      </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Agent/Landlord Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 sticky top-4">
              <div className="flex items-center gap-4 mb-6">
                {landlord?.photoURL ? (
                  <img src={landlord.photoURL} alt={landlord.displayName} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-white dark:border-gray-700 shadow-sm">
                    <span className="material-symbols-outlined text-3xl">person</span>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Listed by</p>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{landlord?.displayName || 'Landlord'}</h3>
                  <p className="text-xs text-primary dark:text-blue-400 font-medium">Verified Owner</p>
                </div>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    if (landlord?.phoneNumber) {
                      window.location.href = `tel:${landlord.phoneNumber}`;
                    } else {
                      toast.info('Phone number not provided by landlord');
                    }
                  }}
                  className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all flex justify-center items-center gap-2"
                >
                  <span className="material-symbols-outlined">call</span>
                  Contact Landlord
                </button>
                <button 
                  onClick={() => navigate(`/landlord/${property.landlordId}`)}
                  className="w-full bg-white dark:bg-transparent border-2 border-primary text-primary dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-3 px-4 rounded-lg transition-all flex justify-center items-center gap-2"
                >
                   <span className="material-symbols-outlined">person</span>
                   View Landlord Profile
                </button>
                <button 
                  onClick={() => setIsReviewOpen(true)}
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold py-3 px-4 rounded-lg transition-all flex justify-center items-center gap-2 border border-gray-200 dark:border-gray-600"
                >
                  <span className="material-symbols-outlined">stars</span>
                  Rate Experience
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <button className="w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <span className="material-symbols-outlined">favorite_border</span>
                  Save this Property
                </button>
                <button className="w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 mt-2">
                  <span className="material-symbols-outlined">share</span>
                  Share Listing
                </button>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">security</span>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>Safe Trading Tip:</strong> Never pay inspection fees before seeing the property. Inspect the property physically before payment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Homes */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Similar Homes You Might Like</h2>
          </div>
          <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">home_work</span>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No similar homes found</h4>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">We couldn't find any properties similar to this one at the moment.</p>
          </div>
        </div>
      </main>

      <ReviewModal 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
        landlordName={landlord?.displayName || "Landlord"}
        landlordImage={landlord?.photoURL || ""}
      />
    </div>
  );
};
