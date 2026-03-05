import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'how-it-works', 'featured', 'testimonials'];
      const scrollPosition = window.scrollY + 100; // offset for navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break; // Stop once we find the top-most visible section
          }
        }
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      // Run once on mount to set initial state
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location]);

  const navLinks = [
    { id: 'home', label: 'Home', href: '/#home' },
    { id: 'how-it-works', label: 'How it Works', href: '/#how-it-works' },
    { id: 'featured', label: 'Properties', href: '/#featured' },
    { id: 'testimonials', label: 'Reviews', href: '/#testimonials' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface-light/80 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 flex-shrink-0">
                <img 
                  alt="EasyBuy Logo" 
                  className="h-full w-full object-contain" 
                  src="/icon.png" 
                />
              </div>
              <span className="font-display font-bold text-2xl text-navy dark:text-blue-400 tracking-tight">
                Easy<span className="text-secondary">Buy</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isHomePath = location.pathname === '/';
              const targetHref = isHomePath ? `#${link.id}` : link.href;
              
              return (
                <a
                  key={link.id}
                  className={`${
                    activeSection === link.id && isHomePath
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary font-medium border-b-2 border-transparent'
                  } pb-1 transition-all duration-300`}
                  href={targetHref}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-900 dark:text-white font-medium hover:text-primary transition">Log In</Link>
            <Link to="/register?role=landlord" className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
              Post a Property
            </Link>
            {/* Dark mode toggle removed as requested */}
          </div>
          <div className="md:hidden flex items-center">
            <Link to="/register?role=buyer" className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-all">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
