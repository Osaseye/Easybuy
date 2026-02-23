import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'sonner';

// --- Schemas ---
const step1Schema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    propertyType: z.string().min(1, 'Property type is required'),
    price: z.number().min(1000, 'Price must be at least 1000'),
    state: z.string().min(1, 'State is required'),
    city: z.string().min(1, 'City is required'),
    address: z.string().min(5, 'Address is required'),
    bedrooms: z.number().min(0, 'Bedrooms must be 0 or more'),
    bathrooms: z.number().min(0, 'Bathrooms must be 0 or more'),
    size: z.number().min(0, 'Size must be 0 or more').optional(),
    description: z.string().min(20, 'Description must be at least 20 characters'),
});

type Step1Values = z.infer<typeof step1Schema>;

export const UploadProperty = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Step 1 State
    const { register: registerStep1, handleSubmit: handleSubmitStep1, formState: { errors: errorsStep1 } } = useForm<Step1Values>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            bedrooms: 1,
            bathrooms: 1,
        }
    });
    const [step1Data, setStep1Data] = useState<Step1Values | null>(null);

    // Step 2 State (Media)
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
            
            if (validFiles.length < newFiles.length) {
                toast.error('Some files were skipped because they exceed 10MB');
            }

            setPhotos(prev => [...prev, ...validFiles]);
            
            const newPreviews = validFiles.map(file => URL.createObjectURL(file));
            setPhotoPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
        setPhotoPreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index]); // Clean up memory
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    };

    const onStep1Submit = (data: Step1Values) => {
        setStep1Data(data);
        setStep(2);
    };

    const onStep2Submit = () => {
        if (photos.length === 0) {
            toast.error('Please upload at least one photo');
            return;
        }
        setStep(3);
    };

    const onFinalSubmit = async () => {
        if (!currentUser || !step1Data || photos.length === 0) return;

        setIsSubmitting(true);
        try {
            // 1. Upload Photos
            const uploadedUrls: string[] = [];
            for (let i = 0; i < photos.length; i++) {
                const file = photos[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_${i}.${fileExt}`;
                const photoRef = ref(storage, `properties/${currentUser.uid}/${fileName}`);
                
                await uploadBytes(photoRef, file);
                const url = await getDownloadURL(photoRef);
                uploadedUrls.push(url);
            }

            // 2. Save to Firestore
            const propertyData = {
                ...step1Data,
                images: uploadedUrls,
                landlordId: currentUser.uid,
                status: 'available',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                // Add some default amenities for now, or we could add a step for this
                amenities: ['Parking', 'Water Supply', 'Security'],
            };

            await addDoc(collection(db, 'properties'), propertyData);

            toast.success('Property listed successfully!');
            navigate('/landlord/listings');
        } catch (error) {
            console.error('Error uploading property:', error);
            toast.error('Failed to list property. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 min-h-screen flex flex-col md:flex-row transition-colors duration-300">
            <LandlordSidebar />
            
            <main className="flex-1 overflow-y-auto h-screen w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full pt-24 md:pt-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">List a New Property</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Share your property details to find the perfect tenant quickly.</p>
                </div>
                
                {/* Stepper */}
                <div className="mb-10">
                    <div className="relative">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-between">
                            <div className="group flex flex-col items-center">
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark ${step >= 1 ? 'bg-primary text-white' : 'bg-surface-light dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-600 text-gray-500'}`}>
                                    {step > 1 ? <span className="material-symbols-outlined text-sm">check</span> : <span className="font-bold text-sm">1</span>}
                                </span>
                                <span className={`mt-2 text-xs font-semibold ${step >= 1 ? 'text-primary' : 'text-gray-500'}`}>Details</span>
                            </div>
                            <div className="group flex flex-col items-center">
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark ${step >= 2 ? 'bg-primary text-white' : 'bg-surface-light dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-600 text-gray-500'}`}>
                                    {step > 2 ? <span className="material-symbols-outlined text-sm">check</span> : <span className="font-bold text-sm">2</span>}
                                </span>
                                <span className={`mt-2 text-xs font-semibold ${step >= 2 ? 'text-primary' : 'text-gray-500'}`}>Media</span>
                            </div>
                            <div className="group flex flex-col items-center">
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-background-light dark:ring-background-dark ${step >= 3 ? 'bg-primary text-white' : 'bg-surface-light dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-600 text-gray-500'}`}>
                                    <span className="font-bold text-sm">3</span>
                                </span>
                                <span className={`mt-2 text-xs font-semibold ${step >= 3 ? 'text-primary' : 'text-gray-500'}`}>Review</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    
                    {/* STEP 1: Details */}
                    {step === 1 && (
                        <form onSubmit={handleSubmitStep1(onStep1Submit)}>
                            <div className="p-6 sm:p-10 space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-primary">info</span> Basic Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="title">Property Title</label>
                                            <div className="mt-1">
                                                <input {...registerStep1('title')} className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" placeholder="e.g. Modern 3-Bedroom Apartment in Lekki Phase 1" type="text" />
                                                {errorsStep1.title && <p className="mt-1 text-sm text-red-500">{errorsStep1.title.message}</p>}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="propertyType">Property Type</label>
                                            <div className="mt-1">
                                                <select {...registerStep1('propertyType')} className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border">
                                                    <option value="">Select Type</option>
                                                    <option value="Apartment">Flat / Apartment</option>
                                                    <option value="House">Duplex / House</option>
                                                    <option value="Bungalow">Bungalow</option>
                                                    <option value="Self Contain">Self Contain</option>
                                                    <option value="Office">Office Space</option>
                                                </select>
                                                {errorsStep1.propertyType && <p className="mt-1 text-sm text-red-500">{errorsStep1.propertyType.message}</p>}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="price">Price (Yearly)</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm">₦</span>
                                                </div>
                                                <input {...registerStep1('price', { valueAsNumber: true })} className="focus:ring-primary focus:border-primary block w-full pl-8 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" placeholder="2500000" type="number" />
                                            </div>
                                            {errorsStep1.price && <p className="mt-1 text-sm text-red-500">{errorsStep1.price.message}</p>}
                                        </div>
                                        
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bedrooms</label>
                                            <input {...registerStep1('bedrooms', { valueAsNumber: true })} type="number" min="0" className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bathrooms</label>
                                            <input {...registerStep1('bathrooms', { valueAsNumber: true })} type="number" min="0" className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Size (sqm) - Optional</label>
                                            <input {...registerStep1('size', { valueAsNumber: true })} type="number" min="0" className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                            <textarea {...registerStep1('description')} rows={4} className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" placeholder="Describe the property..."></textarea>
                                            {errorsStep1.description && <p className="mt-1 text-sm text-red-500">{errorsStep1.description.message}</p>}
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
                                                <select {...registerStep1('state')} className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border">
                                                    <option value="">Select State</option>
                                                    <option value="Lagos">Lagos</option>
                                                    <option value="Abuja">Abuja (FCT)</option>
                                                    <option value="Rivers">Rivers</option>
                                                    <option value="Ogun">Ogun</option>
                                                    <option value="Oyo">Oyo</option>
                                                </select>
                                                {errorsStep1.state && <p className="mt-1 text-sm text-red-500">{errorsStep1.state.message}</p>}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="city">City / Area</label>
                                            <div className="mt-1">
                                                <input {...registerStep1('city')} className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" placeholder="e.g. Ikeja, Maitama" type="text" />
                                                {errorsStep1.city && <p className="mt-1 text-sm text-red-500">{errorsStep1.city.message}</p>}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="address">Street Address</label>
                                            <div className="mt-1">
                                                <input {...registerStep1('address')} className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-3 outline-none border" placeholder="e.g. 15 Adetokunbo Ademola Street" type="text" />
                                                {errorsStep1.address && <p className="mt-1 text-sm text-red-500">{errorsStep1.address.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
                                <button onClick={() => navigate('/landlord/dashboard')} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" type="button">
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-700 flex items-center gap-2">
                                    Next Step <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 2: Media */}
                    {step === 2 && (
                        <div>
                            <div className="p-6 sm:p-10 space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-primary">photo_camera</span> Property Photos
                                    </h3>
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="mt-2 flex justify-center px-6 pt-10 pb-12 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                                    >
                                        <div className="space-y-2 text-center">
                                            <div className="mx-auto h-16 w-16 text-gray-400 group-hover:text-primary transition-colors flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm">
                                                <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                                            </div>
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                                <span className="relative cursor-pointer rounded-md font-medium text-primary hover:text-blue-500">
                                                    Upload photos
                                                </span>
                                                <input 
                                                    ref={fileInputRef}
                                                    className="sr-only" 
                                                    multiple 
                                                    accept="image/*"
                                                    type="file" 
                                                    onChange={handlePhotoChange}
                                                />
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                PNG, JPG up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {photoPreviews.length > 0 && (
                                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {photoPreviews.map((preview, index) => (
                                                <div key={index} className="relative group rounded-lg overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
                                                    <img alt={`Preview ${index}`} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" src={preview} />
                                                    <button 
                                                        onClick={() => removePhoto(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <span className="material-symbols-outlined text-sm block">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-between gap-4">
                                <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2" type="button">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                                </button>
                                <button onClick={onStep2Submit} className="px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-700 flex items-center gap-2">
                                    Next Step <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Review */}
                    {step === 3 && step1Data && (
                        <div>
                            <div className="p-6 sm:p-10 space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-primary">visibility</span> Review Listing
                                    </h3>
                                    
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step1Data.title}</h4>
                                        <p className="text-2xl font-bold text-primary mb-4">₦{step1Data.price.toLocaleString()}/yr</p>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                            <div><span className="text-gray-500">Type:</span> <span className="font-medium dark:text-white">{step1Data.propertyType}</span></div>
                                            <div><span className="text-gray-500">Location:</span> <span className="font-medium dark:text-white">{step1Data.city}, {step1Data.state}</span></div>
                                            <div><span className="text-gray-500">Bedrooms:</span> <span className="font-medium dark:text-white">{step1Data.bedrooms}</span></div>
                                            <div><span className="text-gray-500">Bathrooms:</span> <span className="font-medium dark:text-white">{step1Data.bathrooms}</span></div>
                                        </div>

                                        <div className="mb-6">
                                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Photos ({photos.length})</h5>
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {photoPreviews.map((preview, i) => (
                                                    <img key={i} src={preview} className="h-20 w-20 object-cover rounded-lg flex-shrink-0" alt="" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-between gap-4">
                                <button onClick={() => setStep(2)} disabled={isSubmitting} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 disabled:opacity-50" type="button">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                                </button>
                                <button onClick={onFinalSubmit} disabled={isSubmitting} className="px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-secondary hover:bg-green-700 flex items-center gap-2 disabled:opacity-50">
                                    {isSubmitting ? 'Publishing...' : 'Publish Listing'} <span className="material-symbols-outlined text-sm">check_circle</span>
                                </button>
                            </div>
                        </div>
                    )}

                </div>
                </div>
            </main>
        </div>
    );
};
