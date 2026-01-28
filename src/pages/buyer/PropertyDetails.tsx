import React, { useState } from 'react';
import { Sidebar } from '../../components/common/Sidebar';
import { ReviewModal } from '../../components/common/ReviewModal';

export const PropertyDetails = () => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

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
                <span aria-current="page" className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400">Luxury Duplex in Bodija</span>
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
                <img alt="Modern Duplex in Ibadan" className="w-full h-full object-cover" src="/properties/property-1.jpg" />
                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md">
                  For Sale
                </span>
                <button className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur text-gray-800 dark:text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg flex items-center gap-2 hover:bg-white dark:hover:bg-black transition-colors">
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  Show all photos
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50 dark:bg-gray-800/50">
                <div className="h-24 rounded-lg overflow-hidden cursor-pointer ring-2 ring-primary ring-offset-2 dark:ring-offset-surface-dark">
                  <img alt="Exterior View" className="w-full h-full object-cover" src="/properties/property-1.jpg" />
                </div>
                <div className="h-24 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                  <img alt="Living Room" className="w-full h-full object-cover" src="/properties/property-2.jpg" />
                </div>
                <div className="h-24 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                  <img alt="Kitchen" className="w-full h-full object-cover" src="/properties/property-9.jpg" />
                </div>
                <div className="h-24 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity relative">
                  <img alt="Bedroom" className="w-full h-full object-cover" src="/properties/property-10.jpg" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold text-lg">
                    +8
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Key Specs */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Luxury 5 Bedroom Duplex</h1>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium border border-blue-200 dark:border-blue-800">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      Verified
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 text-sm">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    12 Awolowo Avenue, Old Bodija, Ibadan, Oyo State
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-2xl font-bold px-4 py-2 rounded-lg border border-green-200 dark:border-green-800">
                    ₦185,000,000
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">Bedrooms</p>
                      <p className="font-semibold dark:text-gray-200">5 Rooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                      <span className="material-symbols-outlined">bathtub</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Bathrooms</p>
                      <p className="font-semibold dark:text-gray-200">6 Baths</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                      <span className="material-symbols-outlined">square_foot</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Size</p>
                      <p className="font-semibold dark:text-gray-200">650 sqm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                      <span className="material-symbols-outlined">garage</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Parking</p>
                      <p className="font-semibold dark:text-gray-200">4 Cars</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About this Property</h2>
              <div className="prose prose-blue prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p>
                  Newly built contemporary 5 bedroom fully detached duplex with a BQ sitting on 650sqm of land in the serene and secure neighborhood of Old Bodija, Ibadan. This property features a spacious living room with high ceilings, a fully fitted modern kitchen, all rooms ensuite with walk-in closets, and a private cinema room.
                </p>
                <p className="mt-2">
                  The exterior boasts ample parking space for up to 4 cars, a gatehouse, and a landscaped garden. Perfect for a family looking for luxury and comfort in a prime location.
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                {[
                    '24/7 Power Supply', 'Swimming Pool', 'CCTV Security', 
                    'Fitted Kitchen', 'Boys Quarter', 'Water Treatment',
                    'Cinema Room', 'Smart Home Features'
                ].map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                        <span className="text-sm">{amenity}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Agent/Landlord Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 sticky top-4">
              <div className="flex items-center gap-4 mb-6">
                <img alt="Agent" className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" src="/landlord.jpg" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Listed by</p>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Chinedu Okafor</h3>
                  <p className="text-xs text-primary dark:text-blue-400 font-medium">Landlord</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined">call</span>
                  Contact Landlord
                </button>
                   <a href='/landlord/1' className="w-full bg-white dark:bg-transparent border-2 border-primary text-primary dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-3 px-4 rounded-lg transition-all flex justify-center items-center gap-2">
                   <span className="material-symbols-outlined">person</span>
                   View Landlord Profile
                </a>
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
            <a className="text-primary dark:text-blue-400 font-medium text-sm flex items-center hover:underline" href="#">
              View all
              <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img alt="House" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/properties/property-3.jpg" />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 p-1.5 rounded-full text-gray-500 hover:text-red-500 cursor-pointer">
                  <span className="material-symbols-outlined text-sm block">favorite_border</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2">4 Bedroom Semi-Detached</h3>
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">₦85M</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  Akobo, Ibadan
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span> 4</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bathtub</span> 5</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">square_foot</span> 450</span>
                </div>
              </div>
            </div>
            
             {/* Card 2 */}
             <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img alt="House" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/properties/property-4.jpg" />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 p-1.5 rounded-full text-gray-500 hover:text-red-500 cursor-pointer">
                  <span className="material-symbols-outlined text-sm block">favorite_border</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2">Modern Bungalow</h3>
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">₦45M</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  Ring Road, Ibadan
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span> 3</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bathtub</span> 3</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">square_foot</span> 300</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img alt="House" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/properties/property-5.jpg" />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 p-1.5 rounded-full text-gray-500 hover:text-red-500 cursor-pointer">
                  <span className="material-symbols-outlined text-sm block">favorite_border</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2">Luxury Apartment</h3>
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">₦120M</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  Jericho, Ibadan
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span> 4</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bathtub</span> 5</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">square_foot</span> 500</span>
                </div>
              </div>
            </div>
            
            {/* Card 4 */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img alt="House" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/properties/property-6.jpg" />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 p-1.5 rounded-full text-gray-500 hover:text-red-500 cursor-pointer">
                  <span className="material-symbols-outlined text-sm block">favorite_border</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2">New Terrace Duplex</h3>
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">₦75M</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  Iyaganku, Ibadan
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span> 3</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bathtub</span> 4</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">square_foot</span> 280</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <ReviewModal 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
        landlordName="Chinedu Okafor"
        landlordImage="/landlord.jpg"
      />
    </div>
  );
};
