import React from 'react';

export const Testimonials = () => {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Trusted by Nigerians</h2>
          <p className="text-gray-600 dark:text-gray-400">See what real users are saying about finding their homes with EasyBuy.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">"I was tired of agents taking me to see houses that looked nothing like the pictures. EasyBuy changed that. The verification process is real!"</p>
            <div className="flex items-center gap-3">
              <img alt="User" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZPlSdSkOshAEPb1B-RE7amugZ195Zi55gSah3exo1TUuvQjggMYAMrIlLvrcIOllOJkVGPBEm31cgL27InUyYf4detDJThjr2g7TnMUSv02a0xvHRuPqC7dtjwky37IvfDPEXcQ9RfDePkRms4xcXnNldaG6Db7LNSD356359Mtujj5-IYjYfvQQpo2Z1i71X_f7mbg4fWe_iz4GdjNj4WE6h3R7FVcujOk_i4cEW4DurZSixFj1aEwcRJmh-s6fUuY4x5C8rRieo" />
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white text-sm">Chinedu Okafor</h5>
                <p className="text-xs text-gray-500">Bought in Lekki</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">"Moving from Lagos to Abuja was stressful until I found this app. I secured my apartment in Wuse without even travelling first."</p>
            <div className="flex items-center gap-3">
              <img alt="User" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP7WJzsHrtLzeIehrPRqqw4lQs5iZXDUQvlFcnVSuDe3Ep-HS3H6kKRGcdGksDdzsNwNdkdbG8p4ZzExpvMwTML4M9affAOH-H2BiwUyyn6hwszByRuRWg9IxvJ-M7rFCcUU_GWWaphImCfmS_IfYp8AksBDOWkHO8WFJ85RSMuqCpxMqCH3gqdwLXqSM9YY5LL2pte5R7wTs2x4kW1NRJCvMLDsTRrY1UcWjP6rlmPWo2eoCXApn4cRn0lFUQoIIR3Qc19cE41E3D" />
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white text-sm">Amina Yusuf</h5>
                <p className="text-xs text-gray-500">Rented in Abuja</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star</span>
              <span className="material-symbols-outlined fill-current">star_half</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">"As a landlord, listing here has been seamless. I get serious inquiries only, and the dashboard is very easy to use."</p>
            <div className="flex items-center gap-3">
              <img alt="User" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKDhzAZ1GsfXYY_UENlbLeLOwqwu3bz3HuswPJCMpII_pxvew-AMqwqzb6NNFTM-EYgZudTpLBU--ZSaRBgTA8B3foxCSYYkpGjK3ZgZ4c91SVOd4dz79FflAzsjpaG68B3KTckAuAfEomUqVLQ-Px-n1jKx-s0IFlHAdl-aiKl_XDFJcvXmW4qzICod76lgNC0lJhnJzTqpnlbscOY9ln5CdIB_N2n1zsW9c1f7OqzgZX8ii20HOtYEJqjz5z2WGjdF87qsfyz1IW" />
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white text-sm">Mr. Adebayo</h5>
                <p className="text-xs text-gray-500">Property Owner, Ibadan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
