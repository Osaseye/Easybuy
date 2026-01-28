import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BuyerOnboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Personal Info
        phone: '',
        currentAddress: '',
        moveInDate: '',
        
        // Step 2: Preferences
        location: '',
        budget: 25000000,
        propertyTypes: [] as string[],
        bedrooms: '2',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePropertyTypeChange = (type: string) => {
        setFormData(prev => {
            const types = prev.propertyTypes.includes(type)
                ? prev.propertyTypes.filter(t => t !== type)
                : [...prev.propertyTypes, type];
            return { ...prev, propertyTypes: types };
        });
    };
    
    const handleNext = () => setStep(prev => prev + 1);
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
            <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                 <img src="/icon.png" alt="EasyBuy Logo" className="h-10 w-auto" />
                 <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">EasyBuy</span>
            </div>

            {/* Stepper Progress (Simple dots or bar) */}
            <div className="mb-12 z-10 w-full max-w-lg">
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
            <div className="w-full max-w-3xl z-10">
                
                {/* Step 1: Personal Information */}
                {step === 1 && (
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="text-center">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Tell us a bit about yourself</h1>
                            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">Help us personalize your EasyBuy experience.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+234..."
                                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Address</label>
                                <input 
                                    type="text" 
                                    name="currentAddress"
                                    value={formData.currentAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter your current city or address"
                                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">When are you looking to move?</label>
                                <input 
                                    type="date" 
                                    name="moveInDate"
                                    value={formData.moveInDate}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button onClick={handleNext} className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center gap-2">
                                Next Step <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Preferences */}
                {step === 2 && (
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="text-center">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">What are you looking for?</h1>
                            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">We'll filter the perfect listings for you.</p>
                        </div>

                        {/* Location */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Location</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {['Lagos', 'Abuja', 'Ibadan', 'Port Harcourt'].map((loc) => (
                                    <label key={loc} className="cursor-pointer group relative">
                                        <input 
                                            type="radio" 
                                            name="location" 
                                            value={loc} 
                                            checked={formData.location === loc}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <div className={`rounded-xl border-2 p-4 flex flex-col items-center justify-center h-28 gap-2 text-center transition-all ${formData.location === loc ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300'}`}>
                                            <span className="material-symbols-outlined text-2xl text-gray-400 group-hover:text-primary">location_on</span>
                                            <span className={`font-medium ${formData.location === loc ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}`}>{loc}</span>
                                        </div>
                                         {formData.location === loc && (
                                            <div className="absolute top-2 right-2 text-primary">
                                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Budget</h3>
                                <span className="text-2xl font-bold text-primary">{formatCurrency(formData.budget)}</span>
                            </div>
                            <input 
                                type="range" 
                                name="budget" 
                                min="1000000" 
                                max="500000000" 
                                step="1000000"
                                value={formData.budget}
                                onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                                className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>₦1M</span>
                                <span>₦500M+</span>
                            </div>
                             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {['Under ₦10M', '₦10M - ₦50M', '₦50M - ₦100M', 'Luxury (₦100M+)'].map((label) => (
                                    <button 
                                        key={label}
                                        onClick={() => {
                                            // Simple logic for setting budget based on chips (approximate)
                                            let val = 25000000;
                                            if(label.includes('Under')) val = 5000000;
                                            if(label.includes('10M - 50M')) val = 25000000;
                                            if(label.includes('50M - 100M')) val = 75000000;
                                            if(label.includes('Luxury')) val = 150000000;
                                            setFormData({...formData, budget: val});
                                        }}
                                        className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/30"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Property Type</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {['Apartment', 'House', 'Duplex', 'Land'].map((type) => (
                                    <label key={type} className="flex items-center p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <input 
                                            type="checkbox" 
                                            className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                                            checked={formData.propertyTypes.includes(type)}
                                            onChange={() => handlePropertyTypeChange(type)}
                                        />
                                        <span className="ml-3 text-gray-900 dark:text-gray-200 font-medium">{type}</span>
                                    </label>
                                ))}
                             </div>
                        </div>

                        {/* Bedroom Count */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bedrooms</h3>
                            <div className="grid grid-cols-6 gap-2">
                                {['Studio', '1', '2', '3', '4', '5+'].map((num) => (
                                    <label key={num} className="cursor-pointer relative">
                                        <input 
                                            type="radio" 
                                            name="bedrooms" 
                                            value={num} 
                                            checked={formData.bedrooms === num}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <div className={`rounded-lg py-3 text-center border transition-all ${formData.bedrooms === num ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary'}`}>
                                            <span className="text-sm font-semibold">{num}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                         <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                            <button onClick={handleBack} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-6 py-2">
                                Back
                            </button>
                            <button onClick={handleNext} className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center gap-2">
                                Finish Setup <span className="material-symbols-outlined text-sm">check</span>
                            </button>
                        </div>
                    </div>
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
