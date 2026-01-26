import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8 flex-shrink-0">
                <img 
                  alt="EasyBuy Logo" 
                  className="h-full w-full object-contain" 
                  src="/logo.png" 
                />
              </div>
              <span className="font-display font-bold text-xl text-navy dark:text-blue-400">
                Easy<span className="text-secondary">Buy</span>
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              The smartest way to buy, sell, and rent properties in Nigeria. We bring trust and transparency to real estate.
            </p>
            <div className="flex space-x-4">
              <a className="text-gray-400 hover:text-primary transition" href="#">
                <span className="material-symbols-outlined">social_leaderboard</span>
              </a>
              <a className="text-gray-400 hover:text-primary transition" href="#">
                <span className="material-symbols-outlined">photo_camera</span>
              </a>
              <a className="text-gray-400 hover:text-primary transition" href="#">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 dark:text-white mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a className="hover:text-primary transition" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 dark:text-white mb-4">Support</h5>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a className="hover:text-primary transition" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition" href="#">Safety Guide</a></li>
              <li><a className="hover:text-primary transition" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 dark:text-white mb-4">Resources</h5>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a className="hover:text-primary transition" href="#">Neighborhood Guide</a></li>
              <li><a className="hover:text-primary transition" href="#">Moving Tips</a></li>
              <li><a className="hover:text-primary transition" href="#">Mortgage Calculator</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 EasyBuy Nigeria. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a className="hover:text-gray-900 dark:hover:text-white" href="#">Privacy</a>
            <a className="hover:text-gray-900 dark:hover:text-white" href="#">Terms</a>
            <a className="hover:text-gray-900 dark:hover:text-white" href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
