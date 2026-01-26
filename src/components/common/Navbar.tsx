import React from 'react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-surface-light/80 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 flex-shrink-0">
                <img 
                  alt="EasyBuy Logo" 
                  className="h-full w-full object-contain" 
                  src="/logo.png" 
                />
              </div>
              <span className="font-display font-bold text-2xl text-navy dark:text-blue-400 tracking-tight">
                Easy<span className="text-secondary">Buy</span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition" href="#">Buy</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition" href="#">Rent</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition" href="#">Short Let</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition" href="#">Agents</a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-900 dark:text-white font-medium hover:text-primary transition">Log In</button>
            <button className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
              Post a Property
            </button>
            {/* Dark mode toggle removed as requested */}
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
