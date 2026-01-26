import React from 'react';

export const Features = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Why Choose EasyBuy</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Real Estate Made Simple for Nigerians</h3>
          <p className="text-gray-600 dark:text-gray-400">We solve the trust and stress issues in the Nigerian property market with technology and transparency.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800 group">
            <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Recommendations</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our AI analyzes your preferences to suggest homes that fit your commute, budget, and lifestyle perfectly.
            </p>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800 group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">POPULAR</div>
            <div className="h-14 w-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Verified Property Owners</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Say goodbye to agent wahala. We verify every landlord and agent identity to ensure your transaction is safe.
            </p>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800 group">
            <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">explore</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Easy Discovery</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Explore neighborhoods virtually with high-res photos and detailed maps before you even step out for inspection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
