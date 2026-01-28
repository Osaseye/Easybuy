import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandlordOnboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        ninNumber: '',
        businessName: '',
        address: '',
        city: '',
        state: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        window.scrollTo(0, 0);
        setStep(step + 1);
    };
    
    const prevStep = () => {
        window.scrollTo(0, 0);
        setStep(step - 1);
    };

    return (
        <div className="bg-gray-50 dark:bg-background-dark text-gray-800 dark:text-gray-100 font-sans antialiased min-h-screen flex flex-col">
            <nav className="bg-surface-light/80 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center gap-2">
                                <div className="relative h-10 w-10 flex-shrink-0">
                                    <img alt="EasyBuy Logo" className="h-full w-full object-contain" src="/icon.png" />
                                </div>
                                <span className="font-bold text-2xl text-navy dark:text-blue-400 tracking-tight">Easy<span className="text-secondary">Buy</span></span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Step {step} of 3: {step === 1 ? 'Profile Setup' : step === 2 ? 'Location' : 'Verification'}</div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full space-y-8 animate-fade-in">
                    
                    {/* STEP 1: Profile Setup */}
                    {step === 1 && (
                        <>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Let's set up your profile</h1>
                                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
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
                                <form className="space-y-6">
                                    <div className="flex flex-col items-center justify-center mb-8">
                                        <div className="relative group">
                                            <div className="h-28 w-28 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary transition-colors cursor-pointer">
                                                <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary transition-colors">add_a_photo</span>
                                            </div>
                                            <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors" type="button">
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
                                                <input value={formData.fullName} onChange={handleChange} className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none" id="fullName" name="fullName" placeholder="e.g. Oluwaseun Adebayo" type="text"/>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="ninNumber">
                                                NIN Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-gray-400">badge</span>
                                                </div>
                                                <input value={formData.ninNumber} onChange={handleChange} className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none" id="ninNumber" name="ninNumber" placeholder="11-digit National Identity Number" type="text"/>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Your NIN is only used for identity verification and will not be shared publicly.</p>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="businessName">
                                                Business Name <span className="text-gray-400 font-normal">(Optional)</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="material-symbols-outlined text-gray-400">storefront</span>
                                                </div>
                                                <input value={formData.businessName} onChange={handleChange} className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none" id="businessName" name="businessName" placeholder="e.g. Adebayo Properties Ltd." type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <button onClick={nextStep} type="button" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-secondary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-green-200 dark:shadow-none">
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
                                <form className="space-y-6">
                                    <div className="mb-6 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-700 relative h-48 bg-gray-100 dark:bg-gray-800 group">
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                                            <div className="text-center">
                                                <span className="material-symbols-outlined text-4xl mb-2">map</span>
                                                <p className="text-sm font-medium">Map Preview</p>
                                                <p className="text-xs">Location will be pinned here</p>
                                            </div>
                                        </div>
                                        <iframe 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.723467647228!2d3.421677375147576!3d6.429548424260027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53285e25a2d%3A0x6515f4e8cb472b53!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1716300000000!5m2!1sen!2sng" 
                                            width="100%" 
                                            height="100%" 
                                            style={{border:0, filter: 'grayscale(100%) opacity(0.6)'}} 
                                            allowFullScreen={false} 
                                            loading="lazy" 
                                            className="absolute inset-0 w-full h-full mix-blend-multiply dark:mix-blend-luminosity hover:filter-none transition-all duration-500"
                                        ></iframe>
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
                                                <input value={formData.address} onChange={handleChange} className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none" id="address" name="address" placeholder="e.g. 15 Adetokunbo Ademola Street" type="text"/>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="state">
                                                State
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                 <select value={formData.state} onChange={handleChange} className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none px-3" id="state" name="state">
                                                    <option>Lagos</option>
                                                    <option>Abuja (FCT)</option>
                                                    <option>Rivers</option>
                                                    <option>Ogun</option>
                                                </select>
                                            </div>
                                        </div>
                                         <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="city">
                                                City / Area
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <input value={formData.city} onChange={handleChange} className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white py-3 border outline-none px-3" id="city" name="city" placeholder="e.g. Victoria Island" type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 flex gap-4">
                                        <button onClick={prevStep} type="button" className="flex-1 py-4 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors">
                                            Back
                                        </button>
                                        <button onClick={nextStep} type="button" className="flex-1 py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-blue-200 dark:shadow-none">
                                            Complete Verification
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
                                                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white dark:ring-gray-600">
                                                    <img alt="Landlord Profile" className="w-full h-full object-cover" src="/landlord.jpg" />
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 bg-surface-light dark:bg-surface-dark rounded-full p-0.5">
                                                    <span className="material-symbols-outlined text-secondary text-lg filled">verified_user</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate">{formData.fullName || 'Landlord Name'}</h3>
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
