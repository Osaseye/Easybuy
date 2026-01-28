import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';

export const UploadProperty = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 min-h-screen flex flex-col md:flex-row transition-colors duration-300">
            <LandlordSidebar />
            
            <main className="flex-1 overflow-y-auto h-screen w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full pt-24 md:pt-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">List a New Property</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Share your property details to find the perfect tenant quickly.</p>
                </div>
                <div className="mb-10">
                    <div className="relative">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-between">
                            <div className="group flex flex-col items-center">
                                <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark">
                                    <span className="material-symbols-outlined text-white text-sm">edit</span>
                                </span>
                                <span className="mt-2 text-xs font-semibold text-primary">Details</span>
                            </div>
                            <div className="group flex flex-col items-center">
                                <span className="h-8 w-8 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-primary flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark">
                                    <span className="text-primary font-bold text-sm">2</span>
                                </span>
                                <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">Media</span>
                            </div>
                            <div className="group flex flex-col items-center">
                                <span className="h-8 w-8 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark">
                                    <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">3</span>
                                </span>
                                <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">Review</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-6 sm:p-10 space-y-8">
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">info</span> Basic Information
                            </h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="title">Property Title</label>
                                    <div className="mt-1">
                                        <input className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" id="title" name="title" placeholder="e.g. Modern 3-Bedroom Apartment in Lekki Phase 1" type="text" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="property_type">Property Type</label>
                                    <div className="mt-1">
                                        <select className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" id="property_type" name="property_type">
                                            <option>Flat / Apartment</option>
                                            <option>Duplex</option>
                                            <option>Bungalow</option>
                                            <option>Self Contain</option>
                                            <option>Office Space</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="price">Price (Yearly)</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₦</span>
                                        </div>
                                        <input className="focus:ring-primary focus:border-primary block w-full pl-8 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" id="price" name="price" placeholder="2,500,000" type="number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">location_on</span> Location Details
                            </h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="state">State</label>
                                    <div className="mt-1">
                                        <select className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" id="state" name="state">
                                            <option>Lagos</option>
                                            <option>Abuja (FCT)</option>
                                            <option>Rivers</option>
                                            <option>Ogun</option>
                                            <option>Oyo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="city">City / Area</label>
                                    <div className="mt-1">
                                        <input className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" id="city" name="city" placeholder="e.g. Ikeja, Maitama" type="text" />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="address">Street Address</label>
                                    <div className="mt-1">
                                        <input className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" id="address" name="address" placeholder="e.g. 15 Adetokunbo Ademola Street" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">photo_camera</span> Property Photos
                            </h3>
                            <div className="mt-2 flex justify-center px-6 pt-10 pb-12 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                                <div className="space-y-2 text-center">
                                    <div className="mx-auto h-16 w-16 text-gray-400 group-hover:text-primary transition-colors flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm">
                                        <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                                    </div>
                                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                        <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-blue-500 focus-within:outline-none" htmlFor="file-upload">
                                            <span>Upload photos</span>
                                            <input className="sr-only" id="file-upload" multiple name="file-upload" type="file" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="relative group rounded-lg overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
                                    <img alt="Living room preview" className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&h=400" />
                                    <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-sm block">close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <button onClick={() => navigate('/landlord/dashboard')} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" type="button">
                            Save as Draft
                        </button>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={() => navigate('/landlord/dashboard')} className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" type="button">
                                Cancel
                            </button>
                            <button className="w-full sm:w-auto px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center gap-2" type="button">
                                Next Step
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
};
