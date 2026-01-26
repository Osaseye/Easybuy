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
import { RevealOnScroll } from '../../components/common/RevealOnScroll';

export const LandingPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 font-sans antialiased transition-colors duration-200 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <RevealOnScroll>
          <SearchSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <Features />
        </RevealOnScroll>
        <RevealOnScroll>
          <HowItWorks />
        </RevealOnScroll>
        <RevealOnScroll>
          <FeaturedListings />
        </RevealOnScroll>
        <RevealOnScroll>
          <CallToAction />
        </RevealOnScroll>
        <RevealOnScroll>
          <Testimonials />
        </RevealOnScroll>
      </main>
      <Footer />
    </div>
  );
};
