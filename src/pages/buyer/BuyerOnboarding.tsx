import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { db, storage } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Vite/Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Step 1 Schema
const step1Schema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    currentAddress: z.string().min(5, 'Please enter a valid address'),
    moveInDate: z.string().min(1, 'Please select a move-in date'),
    occupation: z.string().optional(),
});

type Step1Values = z.infer<typeof step1Schema>;

// Step 2 Schema
const step2Schema = z.object({
    location: z.string().min(1, 'Please select a preferred location'),
    budget: z.number().min(1000000, 'Minimum budget is ₦1,000,000'),
    propertyTypes: z.array(z.string()).min(1, 'Select at least one property type'),
    bedrooms: z.string().min(1, 'Select number of bedrooms'),
});

type Step2Values = z.infer<typeof step2Schema>;

const defaultCenter = {
  lat: 9.0820, // Default to Nigeria center
  lng: 8.6753
};

const LocationMarker = ({ position, setPosition, onLocationSelect }: any) => {
    useMapEvents({
        click(e) {
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
            onLocationSelect(e.latlng);
        },
    });
    return position === null ? null : (
        <Marker position={[position.lat, position.lng]}></Marker>
    );
};

export const BuyerOnboarding = () => {
    const navigate = useNavigate();
    const { currentUser, firebaseUser } = useAuth();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [markerPosition, setMarkerPosition] = useState<{lat: number, lng: number} | null>(null);

    const [mapCenterStep2, setMapCenterStep2] = useState(defaultCenter);
    const [markerPositionStep2, setMarkerPositionStep2] = useState<{lat: number, lng: number} | null>(null);

    // Photo Upload State
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 2 * 1024 * 1024) {
                toast.error('File size must be less than 2MB');
                return;
            }
            setProfilePhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            return data.display_name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        } catch (error) {
            console.error("Geocoding error:", error);
            return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        }
    };

    // Step 1 Form
    const {
        register: registerStep1,
        handleSubmit: handleSubmitStep1,
        setValue: setValueStep1,
        formState: { errors: errorsStep1 },
    } = useForm<Step1Values>({
        resolver: zodResolver(step1Schema),
    });

    const handleUseMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setMapCenter(pos);
                    setMarkerPosition(pos);
                    
                    const address = await reverseGeocode(pos.lat, pos.lng);
                    setValueStep1('currentAddress', address, { shouldValidate: true });
                    toast.success('Location found!');
                },
                () => {
                    toast.error('Unable to retrieve your location');
                }
            );
        } else {
            toast.error('Geolocation is not supported by your browser');
        }
    };

    // Step 2 Form
    const {
        register: registerStep2,
        handleSubmit: handleSubmitStep2,
        watch: watchStep2,
        setValue: setValueStep2,
        formState: { errors: errorsStep2 },
    } = useForm<Step2Values>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            budget: 25000000,
            propertyTypes: [],
            bedrooms: '2',
        },
    });

    const handleUseMyLocationStep2 = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setMapCenterStep2(pos);
                    setMarkerPositionStep2(pos);
                    
                    const address = await reverseGeocode(pos.lat, pos.lng);
                    setValueStep2('location', address, { shouldValidate: true });
                    toast.success('Location found!');
                },
                () => {
                    toast.error('Unable to retrieve your location');
                }
            );
        } else {
            toast.error('Geolocation is not supported by your browser');
        }
    };

    const watchLocation = watchStep2('location');
    const watchBudget = watchStep2('budget');
    const watchPropertyTypes = watchStep2('propertyTypes');
    const watchBedrooms = watchStep2('bedrooms');

    const handlePropertyTypeChange = (type: string) => {
        const currentTypes = watchPropertyTypes || [];
        const newTypes = currentTypes.includes(type)
            ? currentTypes.filter(t => t !== type)
            : [...currentTypes, type];
        setValueStep2('propertyTypes', newTypes, { shouldValidate: true });
    };

    // Store step 1 data temporarily
    const [step1Data, setStep1Data] = useState<Step1Values | null>(null);

    const onStep1Submit = (data: Step1Values) => {
        setStep1Data(data);
        setStep(2);
    };

    const onStep2Submit = async (data: Step2Values) => {
        if (!currentUser || !firebaseUser || !step1Data) return;
        
        setIsSubmitting(true);
        try {
            let photoURL = currentUser.photoURL;

            if (profilePhoto) {
                const photoRef = ref(storage, `users/${currentUser.uid}/profilePhoto`);
                await uploadBytes(photoRef, profilePhoto);
                photoURL = await getDownloadURL(photoRef);
                
                // Update Auth Profile
                await updateProfile(firebaseUser, { photoURL });
            }

            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                phoneNumber: step1Data.phone,
                location: step1Data.currentAddress,
                photoURL: photoURL,
                preferences: {
                    moveInDate: step1Data.moveInDate,
                    preferredLocation: data.location,
                    budget: data.budget,
                    propertyTypes: data.propertyTypes,
                    bedrooms: data.bedrooms,
                },
                isOnboardingComplete: true,
            });
            
            toast.success('Preferences saved successfully!');
            setStep(3);
        } catch (error: any) {
            console.error('Error saving preferences:', error);
            toast.error('Failed to save preferences. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleBack = () => setStep(prev => prev - 1);
    
    // Format currency
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark font-body text-gray-800 dark:text-text-dark flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
             <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            
            {/* Background Decorations */}
             <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl"></div>
                <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-3xl"></div>
            </div>

            {/* Logo - Sitting directly on the page */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 flex items-center gap-3">
                 <img src="/icon.png" alt="EasyBuy Logo" className="h-8 md:h-10 w-auto" />
                 <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">EasyBuy</span>
            </div>

            {/* Stepper Progress (Simple dots or bar) */}
            <div className="mb-8 md:mb-12 mt-16 md:mt-0 z-10 w-full max-w-lg px-4">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                     {/* Step 1 Indicator */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= 1 ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'}`}>
                        1
                    </div>
                     {/* Step 2 Indicator */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= 2 ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'}`}>
                        2
                    </div>
                     {/* Step 3 Indicator */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= 3 ? 'bg-secondary border-secondary text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'}`}>
                        <span className="material-symbols-outlined text-lg">check</span>
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <span>Personal Info</span>
                    <span>Preferences</span>
                    <span>Done</span>
                </div>
            </div>

            {/* Content Container - Logic for Switching Steps */}
            <div className="w-full max-w-5xl z-10">
                
                {/* Step 1: Personal Information */}
                {step === 1 && (
                    <form onSubmit={handleSubmitStep1(onStep1Submit)} className="space-y-8 animate-fade-in-up">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Tell us a bit about yourself</h1>
                            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">Help us personalize your EasyBuy experience.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: Form Fields */}
                            <div className="space-y-6">
                                {/* Profile Photo Upload */}
                                <div className="flex flex-col items-center sm:items-start space-y-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Photo</label>
                                    <div className="flex items-center space-x-6">
                                        <div className="shrink-0">
                                            {photoPreview ? (
                                                <img className="h-24 w-24 object-cover rounded-full border-4 border-primary/20" src={photoPreview} alt="Current profile photo" />
                                            ) : (
                                                <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-4 border-dashed border-gray-300 dark:border-gray-600">
                                                    <span className="material-symbols-outlined text-4xl text-gray-400">person</span>
                                                </div>
                                            )}
                                        </div>
                                        <label className="block">
                                            <span className="sr-only">Choose profile photo</span>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                ref={fileInputRef}
                                                className="block w-full text-sm text-gray-500 dark:text-gray-400
                                                file:mr-4 file:py-2.5 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-primary/10 file:text-primary
                                                hover:file:bg-primary/20
                                                cursor-pointer transition-colors"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="John"
                                            className={`w-full rounded-xl border ${errorsStep1.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'} bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-shadow`}
                                            {...registerStep1('firstName')}
                                        />
                                        {errorsStep1.firstName && <p className="mt-1 text-sm text-red-500">{errorsStep1.firstName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Doe"
                                            className={`w-full rounded-xl border ${errorsStep1.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'} bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-shadow`}
                                            {...registerStep1('lastName')}
                                        />
                                        {errorsStep1.lastName && <p className="mt-1 text-sm text-red-500">{errorsStep1.lastName.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        placeholder="+234..."
                                        className={`w-full rounded-xl border ${errorsStep1.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'} bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-shadow`}
                                        {...registerStep1('phone')}
                                    />
                                    {errorsStep1.phone && <p className="mt-1 text-sm text-red-500">{errorsStep1.phone.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Occupation (Optional)</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Software Engineer"
                                        className={`w-full rounded-xl border ${errorsStep1.occupation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'} bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-shadow`}
                                        {...registerStep1('occupation')}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">When are you looking to move?</label>
                                    <input 
                                        type="date" 
                                        className={`w-full rounded-xl border ${errorsStep1.moveInDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'} bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-shadow`}
                                        {...registerStep1('moveInDate')}
                                    />
                                    {errorsStep1.moveInDate && <p className="mt-1 text-sm text-red-500">{errorsStep1.moveInDate.message}</p>}
                                </div>
                            </div>

                            {/* Right Column: Map & Address */}
                            <div className="space-y-4 flex flex-col h-full">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Address</label>
                                        <button 
                                            type="button" 
                                            onClick={handleUseMyLocation}
                                            className="text-xs font-medium text-primary hover:text-blue-700 flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-sm">my_location</span>
                                            Use my location
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your current city or address"
                                        className={`w-full rounded-xl border ${errorsStep1.currentAddress ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'} bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-shadow`}
                                        {...registerStep1('currentAddress')}
                                    />
                                    {errorsStep1.currentAddress && <p className="mt-1 text-sm text-red-500">{errorsStep1.currentAddress.message}</p>}
                                </div>
                                
                                <div className="flex-grow min-h-[250px] rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 relative z-0">
                                    <MapContainer 
                                        center={[mapCenter.lat, mapCenter.lng]} 
                                        zoom={12} 
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <LocationMarker 
                                            position={markerPosition} 
                                            setPosition={setMarkerPosition} 
                                            onLocationSelect={async (latlng: any) => {
                                                const address = await reverseGeocode(latlng.lat, latlng.lng);
                                                setValueStep1('currentAddress', address, { shouldValidate: true });
                                            }} 
                                        />
                                    </MapContainer>
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-xs font-medium text-gray-700 dark:text-gray-300 pointer-events-none z-[1000]">
                                        Click map to set location
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center gap-2">
                                Next Step <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 2: Preferences */}
                {step === 2 && (
                    <form onSubmit={handleSubmitStep2(onStep2Submit)} className="space-y-8 animate-fade-in-up">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">What are you looking for?</h1>
                            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">We'll filter the perfect listings for you.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: Preferences */}
                            <div className="space-y-8">
                                {/* Budget */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Budget</h3>
                                        <span className="text-2xl font-bold text-primary">{formatCurrency(watchBudget)}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1000000" 
                                        max="500000000" 
                                        step="1000000"
                                        className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                        {...registerStep2('budget', { valueAsNumber: true })}
                                    />
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>₦1M</span>
                                        <span>₦500M+</span>
                                    </div>
                                     <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {['Under ₦10M', '₦10M - ₦50M', '₦50M - ₦100M', 'Luxury (₦100M+)'].map((label) => (
                                            <button 
                                                key={label}
                                                type="button"
                                                onClick={() => {
                                                    let val = 25000000;
                                                    if(label.includes('Under')) val = 5000000;
                                                    if(label.includes('10M - 50M')) val = 25000000;
                                                    if(label.includes('50M - 100M')) val = 75000000;
                                                    if(label.includes('Luxury')) val = 150000000;
                                                    setValueStep2('budget', val, { shouldValidate: true });
                                                }}
                                                className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/30"
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                    {errorsStep2.budget && <p className="mt-1 text-sm text-red-500">{errorsStep2.budget.message}</p>}
                                </div>

                                {/* Property Type */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Property Type</h3>
                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {[
                                            { type: 'Apartment', icon: 'apartment' },
                                            { type: 'House', icon: 'home' },
                                            { type: 'Duplex', icon: 'domain' },
                                            { type: 'Land', icon: 'landscape' }
                                        ].map(({ type, icon }) => {
                                            const isSelected = (watchPropertyTypes || []).includes(type);
                                            return (
                                                <label key={type} className="cursor-pointer group relative">
                                                    <input 
                                                        type="checkbox" 
                                                        className="sr-only"
                                                        checked={isSelected}
                                                        onChange={() => handlePropertyTypeChange(type)}
                                                    />
                                                    <div className={`rounded-xl border-2 p-4 flex flex-col items-center justify-center h-24 gap-2 text-center transition-all ${isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300'}`}>
                                                        <span className={`material-symbols-outlined text-2xl ${isSelected ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>{icon}</span>
                                                        <span className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}`}>{type}</span>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 text-primary">
                                                            <span className="material-symbols-outlined text-lg">check_circle</span>
                                                        </div>
                                                    )}
                                                </label>
                                            );
                                        })}
                                     </div>
                                     {errorsStep2.propertyTypes && <p className="mt-1 text-sm text-red-500">{errorsStep2.propertyTypes.message}</p>}
                                </div>

                                {/* Bedroom Count */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bedrooms</h3>
                                    <div className="grid grid-cols-6 gap-2">
                                        {['Studio', '1', '2', '3', '4', '5+'].map((num) => (
                                            <label key={num} className="cursor-pointer relative">
                                                <input 
                                                    type="radio" 
                                                    value={num} 
                                                    className="sr-only"
                                                    {...registerStep2('bedrooms')}
                                                />
                                                <div className={`rounded-lg py-3 text-center border transition-all ${watchBedrooms === num ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary'}`}>
                                                    <span className="text-sm font-semibold">{num}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    {errorsStep2.bedrooms && <p className="mt-1 text-sm text-red-500">{errorsStep2.bedrooms.message}</p>}
                                </div>
                            </div>

                            {/* Right Column: Map & Location */}
                            <div className="space-y-4 flex flex-col h-full">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Location</label>
                                        <button 
                                            type="button" 
                                            onClick={handleUseMyLocationStep2}
                                            className="text-xs font-medium text-primary hover:text-blue-700 flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-sm">my_location</span>
                                            Use my location
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your preferred city or neighborhood"
                                        className={`w-full rounded-xl border ${errorsStep2.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'} bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-shadow`}
                                        {...registerStep2('location')}
                                    />
                                    {errorsStep2.location && <p className="mt-1 text-sm text-red-500">{errorsStep2.location.message}</p>}
                                </div>
                                
                                <div className="flex-grow min-h-[300px] rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 relative z-0">
                                    <MapContainer 
                                        center={[mapCenterStep2.lat, mapCenterStep2.lng]} 
                                        zoom={12} 
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <LocationMarker 
                                            position={markerPositionStep2} 
                                            setPosition={setMarkerPositionStep2} 
                                            onLocationSelect={async (latlng: any) => {
                                                const address = await reverseGeocode(latlng.lat, latlng.lng);
                                                setValueStep2('location', address, { shouldValidate: true });
                                            }} 
                                        />
                                    </MapContainer>
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-xs font-medium text-gray-700 dark:text-gray-300 pointer-events-none z-[1000]">
                                        Click map to set preferred location
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button type="button" onClick={handleBack} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-6 py-2 font-medium">
                                Back
                            </button>
                            <button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Saving...' : 'Finish Setup'} <span className="material-symbols-outlined text-sm">check</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 3: Success State */}
                {step === 3 && (
                    <div className="text-center space-y-8 animate-fade-in-up py-12">
                         <div className="relative inline-block">
                             <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping opacity-75"></div>
                             <div className="relative bg-white dark:bg-gray-800 rounded-full p-6 shadow-xl">
                                <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
                             </div>
                         </div>
                         
                         <div className="space-y-3">
                             <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">All Set, Future Homeowner!</h1>
                             <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                 We've curated a list of properties that match your preferences. Welcome to the EasyBuy community.
                             </p>
                         </div>
                        
                         <div className="pt-8">
                            <button 
                                onClick={() => navigate('/dashboard')} 
                                className="bg-secondary hover:bg-green-700 text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-xl shadow-green-500/30 transition-all transform hover:scale-105 inline-flex items-center gap-2"
                            >
                                Go to Dashboard <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};
