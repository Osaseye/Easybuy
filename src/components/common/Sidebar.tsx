import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showMobileSettings, setShowMobileSettings] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => setCollapsed(!collapsed);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const navItems = [
        { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { icon: 'search', label: 'Explore', path: '/explore' },
        { icon: 'favorite', label: 'Saved Homes', path: '/saved' },
        { 
            icon: 'settings', 
            label: 'Settings', 
            path: '/settings',
            children: [
                { label: 'Profile', path: '/settings?tab=profile', icon: 'person' },
                { label: 'Security', path: '/settings?tab=security', icon: 'lock' },
                { label: 'Support', path: '/settings?tab=support', icon: 'help' }
            ]
        },
    ];

    const isSettingsActive = location.pathname === '/settings';

    return (
        <>
            {/* Mobile Header (Global) */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                {/* Branding Logic: LHS */}
                <div className="flex items-center gap-2">
                    <img src="/icon.png" alt="EasyBuy" className="w-8 h-8 object-contain" />
                    <span className="font-bold text-xl text-navy dark:text-white leading-tight">EasyBuy</span>
                </div>
                
                {/* User Profile Logic: RHS */}
                <div className="flex items-center gap-3">
                     <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" 
                        alt="Profile" 
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                    />
                </div>
            </div>

            {/* Mobile Settings Arc Menu Overlay */}
            {showMobileSettings && (
                <div className="md:hidden fixed inset-0 z-40" onClick={() => setShowMobileSettings(false)}></div>
            )}

            {/* Floating Mobile Navigation Pill */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-surface-dark rounded-full shadow-2xl shadow-blue-900/20 border border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between gap-1 min-w-[320px] max-w-sm">
                 {navItems.map((item) => {
                    if (item.children) {
                        return (
                            <div className="relative" key={item.label}>
                                {/* Arc Menu Items */}
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-300 ${showMobileSettings ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
                                    <div className="flex flex-col items-center gap-3 pb-2">
                                        {item.children.map((child, index) => {
                                            // Calculate Arc Position (Simple fan out for clean UI)
                                            // Using absolute positioning to create an 'arc' effect relative to the center button
                                            const angle = -45 + (index * 45); // -45, 0, +45 degrees
                                            const radius = 80;
                                            const x = Math.sin(angle * (Math.PI / 180)) * radius;
                                            const y = -Math.cos(angle * (Math.PI / 180)) * radius + 20; // +20 to adjust closer to button
                                            
                                            // Simplified approach: Stack vertical for better UX on small screens, or true Arc as requested
                                            // Let's implement a nice Fan/Arc pop-up
                                            const style = {
                                                transform: `translate(${x}px, ${y}px)`,
                                            };
                                            
                                            return (
                                                <button
                                                    key={child.label}
                                                    onClick={() => {
                                                        navigate(child.path);
                                                        setShowMobileSettings(false);
                                                    }}
                                                    className="absolute bottom-0 left-0 w-10 h-10 bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-primary transition-colors z-50"
                                                    style={style}
                                                    title={child.label}
                                                >
                                                    <span className="material-symbols-outlined text-lg">{child.icon}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => setShowMobileSettings(!showMobileSettings)}
                                    className={`
                                        flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all relative
                                        ${isSettingsActive || showMobileSettings
                                            ? 'bg-primary text-white shadow-lg shadow-blue-500/30' 
                                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-transparent'
                                        }
                                    `}
                                >
                                    <span className={`material-symbols-outlined text-2xl transition-transform duration-300 ${showMobileSettings ? 'rotate-45' : ''}`}>
                                        {showMobileSettings ? 'add' : item.icon}
                                    </span>
                                </button>
                            </div>
                        );
                    }
                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => `
                                flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all relative
                                ${isActive 
                                    ? 'bg-primary text-white shadow-lg shadow-blue-500/30' 
                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-transparent'
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </>
                            )}
                        </NavLink>
                    );
                 })}
            </div>

            {/* Sidebar Container (Desktop Only) */}
            <aside className={`
                hidden md:flex flex-col fixed md:sticky top-0 left-0 h-screen z-40 bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700
                ${collapsed ? 'md:w-20' : 'md:w-64'} transition-all duration-300
            `}>
                {/* Sidebar Header */}
                <div className="p-6 flex items-center justify-between h-20">
                    <div className={`flex items-center gap-3 overflow-hidden transition-all ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        <img src="/icon.png" alt="EasyBuy" className="w-8 h-8 object-contain flex-shrink-0" />
                        <div>
                            <h1 className="font-bold text-xl text-navy dark:text-white leading-tight">EasyBuy</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Find Your Perfect Home</p>
                        </div>
                    </div>
                    {/* Collapsed Logo View */}
                    <div className={`absolute left-6 top-6 transition-all duration-300 ${collapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                        <img src="/icon.png" alt="EasyBuy" className="w-8 h-8 object-contain" />
                    </div>
                    
                    {/* Toggle Button (Desktop Only) */}
                    <button 
                        onClick={toggleSidebar}
                        className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary transition-colors absolute -right-3 top-7 border border-gray-200 dark:border-gray-600"
                    >
                         <span className="material-symbols-outlined text-sm">
                             {collapsed ? 'chevron_right' : 'chevron_left'}
                         </span>
                    </button>
                    
                     {/* Close Button (Mobile Only) */}
                    <button 
                         onClick={() => setMobileMenuOpen(false)}
                         className="md:hidden text-gray-500"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button> 
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => (
                        <div key={item.label}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative
                                    ${isActive 
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 font-medium' 
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
                            {/* Desktop Sub-items */}
                            {item.children && !collapsed && (
                                <div className="ml-9 mt-1 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 pl-3">
                                    {item.children.map(child => (
                                        <NavLink
                                            key={child.label}
                                            to={child.path}
                                            className={({ isActive }) => `
                                                flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm
                                                ${isActive 
                                                    ? 'text-primary font-medium bg-blue-50 dark:bg-blue-900/10' 
                                                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                                                }
                                            `}
                                        >
                                            <span className="material-symbols-outlined text-lg">{child.icon}</span>
                                            <span>{child.label}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <img 
                            alt="User Profile" 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary flex-shrink-0" 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" 
                        />
                        <div className={`flex-1 min-w-0 transition-all duration-300 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Chisom Okoro</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Buyer Account</p>
                        </div>
                        <button className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all ${collapsed ? 'hidden' : 'block'}`}>
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
