import React, { useState, useRef } from 'react';
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
    fullName: z.string().min(2, 'Full name is required'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    ninNumber: z.string().length(11, 'NIN must be exactly 11 digits'),
    businessName: z.string().optional(),
});

type Step1Values = z.infer<typeof step1Schema>;

// Step 2 Schema
const step2Schema = z.object({
    address: z.string().min(5, 'Please enter a valid address'),
    state: z.string().min(2, 'Please select a state'),
    city: z.string().min(2, 'Please enter a city/area'),
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

export const LandlordOnboarding = () => {
    const navigate = useNavigate();
    const { currentUser, firebaseUser } = useAuth();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Photo Upload State
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Map State
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [markerPosition, setMarkerPosition] = useState<{lat: number, lng: number} | null>(null);

    const reverseGeocode = async (lat: number, lng: number): Promise<any> => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Geocoding error:", error);
            return null;
        }
    };

    // Step 1 Form
    const {
        register: registerStep1,
        handleSubmit: handleSubmitStep1,
        formState: { errors: errorsStep1 },
    } = useForm<Step1Values>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            fullName: currentUser?.displayName || '',
        }
    });

    // Step 2 Form
    const {
        register: registerStep2,
        handleSubmit: handleSubmitStep2,
        setValue: setValueStep2,
        formState: { errors: errorsStep2 },
    } = useForm<Step2Values>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            state: 'Lagos'
        }
    });

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
                    
                    const data = await reverseGeocode(pos.lat, pos.lng);
                    if (data) {
                        setValueStep2('address', data.display_name || '', { shouldValidate: true });
                        if (data.address) {
                            if (data.address.state) setValueStep2('state', data.address.state, { shouldValidate: true });
                            if (data.address.city || data.address.town || data.address.county) {
                                setValueStep2('city', data.address.city || data.address.town || data.address.county, { shouldValidate: true });
                            }
                        }
                        toast.success('Location found!');
                    }
                },
                () => {
                    toast.error('Unable to retrieve your location');
                }
            );
        } else {
            toast.error('Geolocation is not supported by your browser');
        }
    };

    const onLocationSelect = async (latlng: any) => {
        const data = await reverseGeocode(latlng.lat, latlng.lng);
        if (data) {
            setValueStep2('address', data.display_name || '', { shouldValidate: true });
            if (data.address) {
                if (data.address.state) setValueStep2('state', data.address.state, { shouldValidate: true });
                if (data.address.city || data.address.town || data.address.county) {
                    setValueStep2('city', data.address.city || data.address.town || data.address.county, { shouldValidate: true });
                }
            }
        }
    };

    // Store step 1 data temporarily
    const [step1Data, setStep1Data] = useState<Step1Values | null>(null);

    const onStep1Submit = (data: Step1Values) => {
        setStep1Data(data);
        window.scrollTo(0, 0);
        setStep(2);
    };

    const onStep2Submit = async (data: Step2Values) => {
        if (!currentUser || !firebaseUser || !step1Data) return;
        
        setIsSubmitting(true);
        try {
            let photoUrl = currentUser.photoURL || '';

            // Upload photo if selected
            if (profilePhoto) {
                const photoRef = ref(storage, `users/${currentUser.uid}/profilePhoto`);
                await uploadBytes(photoRef, profilePhoto);
                photoUrl = await getDownloadURL(photoRef);
                
                // Update Auth Profile
                await updateProfile(firebaseUser, { photoURL: photoUrl });
            }

            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                displayName: step1Data.fullName,
                phoneNumber: step1Data.phoneNumber,
                photoURL: photoUrl,
                ninNumber: step1Data.ninNumber,
                businessName: step1Data.businessName || '',
                location: data.address,
                officeAddress: {
                    address: data.address,
                    state: data.state,
                    city: data.city,
                    coordinates: markerPosition
                },
                isOnboardingComplete: true,
            });
            
            toast.success('Verification completed successfully!');
            window.scrollTo(0, 0);
            setStep(3);
        } catch (error: any) {
            console.error('Error completing onboarding:', error);
            toast.error(error.message || 'Failed to complete verification. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const prevStep = () => {
        window.scrollTo(0, 0);
        setStep(step - 1);
    };

    return (
        <div className="bg-gray-50 dark:bg-background-dark text-gray-800 dark:text-gray-100 font-sans antialiased min-h-screen flex flex-col">
            <nav className="bg-surface-light/80 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 md:h-20 items-center">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center gap-2">
                                <div className="relative h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                                    <img alt="EasyBuy Logo" className="h-full w-full object-contain" src="/icon.png" />
                                </div>
                                <span className="font-bold text-xl md:text-2xl text-navy dark:text-blue-400 tracking-tight">Easy<span className="text-secondary">Buy</span></span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Step {step} of 3: <span className="hidden sm:inline">{step === 1 ? 'Profile Setup' : step === 2 ? 'Location' : 'Verification'}</span></div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full space-y-6 md:space-y-8 animate-fade-in">
                    
                    {/* STEP 1: Profile Setup */}
                    {step === 1 && (
                        <>
                            <div className="text-center">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Let's set up your profile</h1>
                                <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-400">
                                    Complete your verification to start listing properties.
                                </p>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-800">
                                <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl flex items-start gap-3">
                                    <span className="material-symbols-outlined text-secondary mt-0.5">verified_user</span>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Why verification matters</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Verified profiles get <span className="font-bold text-green-700 dark:text-green-400">3x more inquiries</span> from tenants because they trust your identity.</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmitStep1(onStep1Submit)} className="space-y-6">
                                    <div className="flex flex-col items-center justify-center mb-8">
                                        <div className="relative group">
                                            <div 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="h-28 w-28 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary transition-colors cursor-pointer"
                                            >
                                                {photoPreview ? (
                                                    <img src={photoPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary transition-colors">add_a_photo</span>
                                                )}
                                            </div>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                onChange={handlePhotoChange} 
                                                accept="image/jpeg, image/png, image/gif" 
                                                className="hidden" 
                                            />
                                            <button 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors" 
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                        </div>
                                        <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">Upload Profile Photo</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">JPG, PNG or GIF (Max. 2MB)</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="fullName">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-gray-400">person</span>
                                                </div>
                                                <input {...registerStep1('fullName')} className={`focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none ${errorsStep1.fullName ? 'border-red-500' : ''}`} id="fullName" placeholder="e.g. Oluwaseun Adebayo" type="text"/>
                                            </div>
                                            {errorsStep1.fullName && <p className="mt-1 text-xs text-red-500">{errorsStep1.fullName.message}</p>}
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="phoneNumber">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-gray-400">phone</span>
                                                </div>
                                                <input {...registerStep1('phoneNumber')} className={`focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none ${errorsStep1.phoneNumber ? 'border-red-500' : ''}`} id="phoneNumber" placeholder="e.g. 08012345678" type="tel"/>
                                            </div>
                                            {errorsStep1.phoneNumber && <p className="mt-1 text-xs text-red-500">{errorsStep1.phoneNumber.message}</p>}
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="ninNumber">
                                                NIN Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-gray-400">badge</span>
                                                </div>
                                                <input {...registerStep1('ninNumber')} className={`focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none ${errorsStep1.ninNumber ? 'border-red-500' : ''}`} id="ninNumber" placeholder="11-digit National Identity Number" type="text"/>
                                            </div>
                                            {errorsStep1.ninNumber ? (
                                                <p className="mt-1 text-xs text-red-500">{errorsStep1.ninNumber.message}</p>
                                            ) : (
                                                <p className="mt-1 text-xs text-gray-500">Your NIN is only used for identity verification and will not be shared publicly.</p>
                                            )}
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="businessName">
                                                Business Name <span className="text-gray-400 font-normal">(Optional)</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-gray-400">storefront</span>
                                                </div>
                                                <input {...registerStep1('businessName')} className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none" id="businessName" placeholder="e.g. Adebayo Properties Ltd." type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-secondary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-green-200 dark:shadow-none">
                                            Continue to Location
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}

                    {/* STEP 2: Location Information */}
                    {step === 2 && (
                        <>
                             <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Where are you based?</h1>
                                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                    Help us show your verified office location to tenants.
                                </p>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-800">
                                <form onSubmit={handleSubmitStep2(onStep2Submit)} className="space-y-6">
                                    <div className="mb-6 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-700 relative h-64 bg-gray-100 dark:bg-gray-800 group z-0">
                                        <MapContainer 
                                            center={[mapCenter.lat, mapCenter.lng]} 
                                            zoom={13} 
                                            style={{ height: '100%', width: '100%' }}
                                            className="z-0"
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <LocationMarker 
                                                position={markerPosition} 
                                                setPosition={setMarkerPosition} 
                                                onLocationSelect={onLocationSelect}
                                            />
                                        </MapContainer>
                                        <button
                                            type="button"
                                            onClick={handleUseMyLocation}
                                            className="absolute bottom-4 right-4 z-[400] bg-white dark:bg-surface-dark text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-primary">my_location</span>
                                            Use My Location
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="address">
                                                Office Address <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-gray-400">location_on</span>
                                                </div>
                                                <input {...registerStep2('address')} className={`focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none ${errorsStep2.address ? 'border-red-500' : ''}`} id="address" placeholder="e.g. 15 Adetokunbo Ademola Street" type="text"/>
                                            </div>
                                            {errorsStep2.address && <p className="mt-1 text-xs text-red-500">{errorsStep2.address.message}</p>}
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="state">
                                                State <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                 <select {...registerStep2('state')} className={`focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none px-3 ${errorsStep2.state ? 'border-red-500' : ''}`} id="state">
                                                    <option value="">Select State</option>
                                                    <option value="Lagos">Lagos</option>
                                                    <option value="Abuja (FCT)">Abuja (FCT)</option>
                                                    <option value="Rivers">Rivers</option>
                                                    <option value="Ogun">Ogun</option>
                                                </select>
                                            </div>
                                            {errorsStep2.state && <p className="mt-1 text-xs text-red-500">{errorsStep2.state.message}</p>}
                                        </div>
                                         <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="city">
                                                City / Area <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <input {...registerStep2('city')} className={`focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none px-3 ${errorsStep2.city ? 'border-red-500' : ''}`} id="city" placeholder="e.g. Victoria Island" type="text"/>
                                            </div>
                                            {errorsStep2.city && <p className="mt-1 text-xs text-red-500">{errorsStep2.city.message}</p>}
                                        </div>
                                    </div>
                                    <div className="pt-4 flex gap-4">
                                        <button onClick={prevStep} type="button" disabled={isSubmitting} className="flex-1 py-4 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors disabled:opacity-50">
                                            Back
                                        </button>
                                        <button type="submit" disabled={isSubmitting} className="flex-1 py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-blue-200 dark:shadow-none disabled:opacity-50 flex justify-center items-center">
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                'Complete Verification'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}

                    {/* STEP 3: Success */}
                    {step === 3 && (
                        <>
                             <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Identity Verified Successfully!</h1>
                                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                    Your profile now has a verified badge, which helps you build trust with potential tenants.
                                </p>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark py-12 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                                <div className="absolute top-10 left-10 text-yellow-400 opacity-60 animate-bounce" style={{animationDuration: '3s'}}>
                                    <span className="material-symbols-outlined text-2xl">star</span>
                                </div>
                                <div className="absolute top-20 right-12 text-blue-400 opacity-50">
                                    <div className="w-3 h-3 bg-blue-400 rotate-45"></div>
                                </div>
                                <div className="absolute bottom-16 left-16 text-secondary opacity-40">
                                    <div className="w-4 h-4 rounded-full border-2 border-current"></div>
                                </div>
                                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="flex flex-col items-center justify-center relative z-10">
                                    <div className="mb-10 relative">
                                        <div className="h-28 w-28 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center relative">
                                            <div className="absolute inset-0 rounded-full border-2 border-green-200 dark:border-green-800 animate-ping opacity-25"></div>
                                            <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-green-200/50 dark:shadow-none transform transition-transform hover:scale-105">
                                                <span className="material-symbols-outlined text-5xl text-white font-bold">check</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-sm mb-10">
                                        <p className="text-xs text-center text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold mb-3">Live Profile Preview</p>
                                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4 transition-all hover:shadow-md">
                                            <div className="relative flex-shrink-0">
                                                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white dark:ring-gray-600 flex items-center justify-center">
                                                    {photoPreview || currentUser?.photoURL ? (
                                                        <img alt="Landlord Profile" className="w-full h-full object-cover" src={photoPreview || currentUser?.photoURL || ''} />
                                                    ) : (
                                                        <span className="text-2xl font-bold text-gray-500">{step1Data?.fullName?.charAt(0) || 'L'}</span>
                                                    )}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 bg-surface-light dark:bg-surface-dark rounded-full p-0.5">
                                                    <span className="material-symbols-outlined text-secondary text-lg filled">verified_user</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate">{step1Data?.fullName || currentUser?.displayName || 'Landlord Name'}</h3>
                                                    <span className="material-symbols-outlined text-blue-500 text-xl filled">verified</span>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Verified Landlord</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <button onClick={() => navigate('/landlord/dashboard')} type="button" className="w-full sm:min-w-[240px] flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-secondary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5 shadow-green-200 dark:shadow-none">
                                            Go to Dashboard
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </main>
            <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© 2026 EasyBuy Nigeria. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a className="hover:text-gray-900 dark:hover:text-white" href="#">Privacy</a>
                        <a className="hover:text-gray-900 dark:hover:text-white" href="#">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
