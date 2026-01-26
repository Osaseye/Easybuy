import React from 'react';

export const CallToAction = () => {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Ready to Rent or Sell?</h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">List your property today and reach verified tenants instantly. No hidden fees, just seamless transactions.</p>
        <button className="bg-secondary hover:bg-green-600 text-white px-10 py-4 rounded-xl font-bold text-xl shadow-xl shadow-green-900/20 transition-all transform hover:-translate-y-1">
          Post a Property
        </button>
      </div>
    </section>
  );
};
