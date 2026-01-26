import React from 'react';

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">How EasyBuy Works</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Get into your new home in three simple steps, without the usual hustle.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center group">
            <div className="relative inline-block mb-6">
              <div className="h-20 w-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold relative z-10 transition-transform group-hover:scale-110 duration-300">
                1
              </div>
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-800/20 rounded-full animate-ping opacity-20"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Setup Preferences</h3>
            <p className="text-gray-600 dark:text-gray-400 px-4">Tell us your budget, preferred location (like Ikeja or Wuse 2), and must-haves.</p>
          </div>
          <div className="text-center group">
            <div className="relative inline-block mb-6">
              <div className="h-20 w-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-secondary text-3xl font-bold relative z-10 transition-transform group-hover:scale-110 duration-300">
                2
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Get Smart Matches</h3>
            <p className="text-gray-600 dark:text-gray-400 px-4">Receive a curated list of verified homes that match your criteria instantly.</p>
          </div>
          <div className="text-center group">
            <div className="relative inline-block mb-6">
              <div className="h-20 w-20 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600 text-3xl font-bold relative z-10 transition-transform group-hover:scale-110 duration-300">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Move In</h3>
            <p className="text-gray-600 dark:text-gray-400 px-4">Schedule a visit, close the deal securely, and move into your new space.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
