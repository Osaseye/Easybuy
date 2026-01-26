import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Hero } from './components/Hero';
import { SearchSection } from './components/SearchSection';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedListings } from './components/FeaturedListings';
import { CallToAction } from './components/CallToAction';
import { Testimonials } from './components/Testimonials';

export const LandingPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 font-sans antialiased transition-colors duration-200 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <SearchSection />
        <Features />
        <HowItWorks />
        <FeaturedListings />
        <CallToAction />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};
