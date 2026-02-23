import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LandlordSidebar } from '../../components/common/LandlordSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../lib/firebase';
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export const LandlordSettings = () => {
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'profile';
    const { currentUser, firebaseUser } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile Form State
    const [fullName, setFullName] = useState(currentUser?.displayName || '');
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');
    const [agencyName, setAgencyName] = useState(currentUser?.agencyName || '');
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // Security Form State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const handleSaveProfile = async () => {
        if (!currentUser || !firebaseUser) return;
        setIsSavingProfile(true);
        try {
            // Update Auth Profile
            await updateProfile(firebaseUser, { displayName: fullName });

            // Update Firestore Document
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                displayName: fullName,
                phoneNumber,
                agencyName
            });

            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (!firebaseUser || !firebaseUser.email) return;
        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setIsUpdatingPassword(true);
        try {
            const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
            await reauthenticateWithCredential(firebaseUser, credential);
            await updatePassword(firebaseUser, newPassword);
            
            toast.success('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            console.error('Error updating password:', error);
            if (error.code === 'auth/invalid-credential') {
                toast.error('Incorrect current password');
            } else {
                toast.error('Failed to update password');
            }
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !currentUser || !firebaseUser) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size must be less than 2MB');
            return;
        }

        setIsUploading(true);
        try {
            const photoRef = ref(storage, `users/${currentUser.uid}/profilePhoto`);
            await uploadBytes(photoRef, file);
            const photoURL = await getDownloadURL(photoRef);

            // Update Auth Profile
            await updateProfile(firebaseUser, { photoURL });

            // Update Firestore Document
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, { photoURL });

            toast.success('Profile photo updated successfully!');
        } catch (error) {
            console.error('Error uploading photo:', error);
            toast.error('Failed to update profile photo');
        } finally {
            setIsUploading(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                             <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                                <div 
                                    className="relative group cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {currentUser?.photoURL ? (
                                        <img 
                                            src={currentUser.photoURL} 
                                            alt="Profile" 
                                            className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50 dark:ring-gray-800"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center ring-4 ring-gray-50 dark:ring-gray-800">
                                            <span className="text-3xl font-bold text-secondary">{currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'L'}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        {isUploading ? (
                                            <span className="material-symbols-outlined text-white animate-spin">sync</span>
                                        ) : (
                                            <span className="material-symbols-outlined text-white">photo_camera</span>
                                        )}
                                    </div>
                                </div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handlePhotoUpload} 
                                    accept="image/*" 
                                    className="hidden" 
                                />
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{currentUser?.displayName || 'Landlord'}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Landlord Account</p>
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                        className="mt-2 text-primary text-sm font-medium hover:underline disabled:opacity-50"
                                    >
                                        {isUploading ? 'Uploading...' : 'Change Profile Photo'}
                                    </button>
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your full name" 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        defaultValue={currentUser?.email || ''}
                                        disabled
                                        placeholder="Enter your email address" 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter your phone number" 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Agency Name (Optional)</label>
                                    <input 
                                        type="text" 
                                        value={agencyName}
                                        onChange={(e) => setAgencyName(e.target.value)}
                                        placeholder="Enter your agency name" 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                             </div>

                             <div className="mt-8 flex justify-end">
                                <button 
                                    onClick={handleSaveProfile}
                                    disabled={isSavingProfile}
                                    className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
                                >
                                    {isSavingProfile ? 'Saving...' : 'Save Changes'}
                                </button>
                             </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Password & Security</h3>
                            
                            <div className="space-y-4 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                                    <input 
                                        type="password" 
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                    <input 
                                        type="password" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none text-gray-900 dark:text-white"
                                    />
                                </div>
                                <button 
                                    onClick={handleUpdatePassword}
                                    disabled={isUpdatingPassword || !currentPassword || !newPassword || !confirmPassword}
                                    className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-black dark:hover:bg-gray-600 transition disabled:opacity-50"
                                >
                                    {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
            <LandlordSidebar />
            
            <main className="flex-1 overflow-y-auto h-screen w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pt-24 md:pt-8">
                 <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
                    <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and security.</p>
                 </div>
                 
                 {renderContent()}
                </div>
            </main>
        </div>
    );
};
