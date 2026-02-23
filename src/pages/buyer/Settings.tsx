import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../lib/firebase';
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export const Settings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'profile';
    const { currentUser, firebaseUser } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile Form State
    const [fullName, setFullName] = useState(currentUser?.displayName || '');
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');
    const [location, setLocation] = useState(currentUser?.location || '');
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // Security Form State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const setActiveTab = (tab: string) => {
        setSearchParams({ tab });
    };

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
                location
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
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
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
                                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-gray-50 dark:ring-gray-800 uppercase">
                                            <span className="text-3xl font-bold text-primary">{currentUser?.displayName?.charAt(0) || 'U'}</span>
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
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{currentUser?.displayName || 'User'}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Buyer Account</p>
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                    <input 
                                        type="text" 
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Enter your location" 
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
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Password & Security</h3>
                            
                            <div className="space-y-4 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                                    <input 
                                        type="password" 
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                    <input 
                                        type="password" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none"
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

                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                             <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">Add an extra layer of security to your account.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </label>
                             </div>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-900/30">
                            <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition shadow-lg shadow-red-500/20">Delete Account</button>
                        </div>
                    </div>
                );
            case 'support':
                return (
                     <div className="space-y-8 animate-fade-in">
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <details className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
                                    <summary className="flex justify-between items-center font-medium text-gray-900 dark:text-white list-none">
                                        How do I verify my account?
                                        <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">To verify your account, go to the Profile tab and upload a valid government-issued ID.</p>
                                </details>
                                <details className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
                                    <summary className="flex justify-between items-center font-medium text-gray-900 dark:text-white list-none">
                                        Is my payment information safe?
                                        <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">Yes, we use industry-standard encryption to protect your payment details.</p>
                                </details>
                                <details className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
                                    <summary className="flex justify-between items-center font-medium text-gray-900 dark:text-white list-none">
                                        How can I contact a landlord?
                                        <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">You can contact a landlord directly from the property details page using the 'Contact' button.</p>
                                </details>
                            </div>
                        </div>

                         <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Support</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Need more help? Send us a message and we'll get back to you shortly.</p>
                            
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none">
                                        <option>General Inquiry</option>
                                        <option>Technical Issue</option>
                                        <option>Billing</option>
                                        <option>Report a User</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary outline-none" placeholder="Describe your issue..."></textarea>
                                </div>
                                <button className="w-full py-3 bg-secondary hover:bg-green-700 text-white font-bold rounded-lg shadow-lg shadow-green-500/20 transition-all">
                                    Send Message
                                </button>
                            </form>
                         </div>
                     </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-surface-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen flex flex-col md:flex-row">
            <Sidebar />
            
            <main className="flex-1 overflow-y-auto h-screen pb-24 md:pb-8 p-4 pt-24 md:p-8">
                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 gap-2 flex items-center">
                    <span className="material-symbols-outlined text-4xl text-primary">
                        {activeTab === 'profile' ? 'person' : activeTab === 'security' ? 'lock' : 'help'}
                    </span>
                    {activeTab === 'profile' ? 'Personal Profile' : activeTab === 'security' ? 'Security Settings' : 'Help & Support'}
                 </h2>
                 
                 <div className="w-full max-w-4xl mx-auto">
                    {/* Content Area */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                 </div>
            </main>
        </div>
    );
};
