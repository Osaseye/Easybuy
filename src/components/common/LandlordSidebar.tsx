import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const LandlordSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(true);
    const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const navItems = [
        { icon: 'dashboard', label: 'Dashboard', path: '/landlord/dashboard' },
        { icon: 'add_home', label: 'Upload New', path: '/landlord/upload' },
        { icon: 'list_alt', label: 'My Listings', path: '/landlord/listings' },
        { 
            icon: 'settings', 
            label: 'Settings', 
            path: '/landlord/settings',
            children: [
                { icon: 'person', label: 'Profile', path: '/landlord/settings?tab=profile' },
                { icon: 'lock', label: 'Security', path: '/landlord/settings?tab=security' }
            ]
        },
    ];

    const isSettingsActive = location.pathname.includes('settings');

    return (
        <>
            {/* Mobile Header (Global) */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/icon.png" alt="EasyBuy" className="w-8 h-8 object-contain" />
                    <span className="font-bold text-xl text-navy dark:text-white leading-tight">EasyBuy <span className="text-secondary text-base font-normal">Landlord</span></span>
                </div>
                
                <div className="flex items-center gap-3">
                    {currentUser?.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700" />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold ring-2 ring-gray-100 dark:ring-gray-700">
                            {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'L'}
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex flex-col h-screen sticky top-0 bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-64'}`}>
                {/* Logo Area */}
                <div className="p-6 flex items-center gap-3 h-20">
                    <img src="/icon.png" alt="Logo" className="w-8 h-8 object-contain" />
                    <div className={`overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        <h1 className="font-bold text-xl text-navy dark:text-white tracking-tight">EasyBuy</h1>
                        <p className="text-xs text-secondary font-medium tracking-wide text-nowrap">LANDLORD PORTAL</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => (
                        <div key={item.label}>
                            {!item.children ? (
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `
                                        flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative
                                        ${isActive 
                                            ? 'bg-secondary/10 text-secondary dark:bg-secondary/20 font-medium' 
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }
                                    `}
                                    title={collapsed ? item.label : ''}
                                >
                                    <span className="material-symbols-outlined flex-shrink-0">{item.icon}</span>
                                    <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                                        {item.label}
                                    </span>
                                </NavLink>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => !collapsed && setSettingsOpen(!settingsOpen)}
                                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative ${
                                            isSettingsActive ? 'text-secondary font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                        title={collapsed ? item.label : ''}
                                    >
                                        <span className="material-symbols-outlined flex-shrink-0">{item.icon}</span>
                                        <span className={`flex-1 text-left whitespace-nowrap transition-all duration-300 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                                            {item.label}
                                        </span>
                                        {!collapsed && (
                                            <span className={`material-symbols-outlined text-sm transition-transform ${settingsOpen ? 'rotate-180' : ''}`}>
                                                expand_more
                                            </span>
                                        )}
                                    </button>
                                    
                                    <div className={`overflow-hidden transition-all duration-300 ${settingsOpen && !collapsed ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="mt-1 space-y-1 pl-11 pr-3">
                                            {item.children.map((child) => (
                                                <NavLink
                                                    key={child.label}
                                                    to={child.path}
                                                    end
                                                    className={({ isActive }) => `
                                                        block py-2 px-3 rounded-md text-sm transition-colors
                                                        ${isActive 
                                                            ? 'text-secondary bg-secondary/5 font-medium' 
                                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                                        }
                                                    `}
                                                >
                                                    {child.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Collapse Button */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            chevron_left
                        </span>
                        <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                            Collapse Menu
                        </span>
                    </button>
                    
                    {!collapsed && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3 px-3">
                                {currentUser?.photoURL ? (
                                    <img src={currentUser.photoURL} alt="Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                                        {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'L'}
                                    </div>
                                )}
                                <div className="overflow-hidden">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{currentUser?.displayName || 'Landlord'}</p>
                                    <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 mt-0.5">
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-surface-dark rounded-full shadow-2xl shadow-green-900/20 border border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between gap-1 min-w-[320px] max-w-sm">
                 {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    
                    if (item.children) {
                        return (
                            <div key={item.label} className="relative">
                                {/* Vertical Menu for Subitems */}
                                {mobileSettingsOpen && (
                                    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 flex flex-col gap-1 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 min-w-[120px] animate-fade-in-up">
                                        {item.children.map(child => (
                                            <NavLink 
                                                key={child.label}
                                                to={child.path}
                                                className={({isActive}) => `
                                                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap
                                                    ${isActive ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 dark:text-gray-300'}
                                                `}
                                                onClick={() => setMobileSettingsOpen(false)}
                                            >
                                                <span className="material-symbols-outlined text-lg">{child.icon}</span>
                                                {child.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}

                                <button
                                    onClick={() => setMobileSettingsOpen(!mobileSettingsOpen)}
                                    className={`
                                        flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative
                                        ${isActive || mobileSettingsOpen
                                            ? 'bg-secondary text-white shadow-lg scale-110 -translate-y-2' 
                                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                        }
                                    `}
                                >
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </button>
                            </div>
                        )
                    }

                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => `
                                flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative
                                ${isActive 
                                    ? 'bg-secondary text-white shadow-lg scale-110 -translate-y-2' 
                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                    <div className={isActive ? 'absolute -bottom-2 w-1 h-1 bg-secondary rounded-full' : 'hidden'} />
                                </>
                            )}
                        </NavLink>
                    )
                 })}
                 <button 
                    onClick={handleLogout}
                    className="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative text-red-400 hover:text-red-600"
                 >
                    <span className="material-symbols-outlined text-2xl">logout</span>
                 </button>
            </div>
        </>
    );
};
