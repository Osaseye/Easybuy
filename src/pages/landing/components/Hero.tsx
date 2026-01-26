import React from 'react';

export const Hero = () => {
  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-sm font-semibold mb-6 border border-blue-100 dark:border-blue-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              #1 Trusted Real Estate Platform in Lagos
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Find the Right Home in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">Nigeria</span> — <br />Without Stress
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Discover properties that match your lifestyle and budget. From Lekki to Abuja, we use smart data to verify every listing so you can move with peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1">
                <span className="material-symbols-outlined">search</span>
                Find a Home
              </button>
              <button className="flex items-center justify-center gap-2 bg-white dark:bg-surface-dark text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined">add_home_work</span>
                List a Property
              </button>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex -space-x-2">
                <img alt="User" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZPlSdSkOshAEPb1B-RE7amugZ195Zi55gSah3exo1TUuvQjggMYAMrIlLvrcIOllOJkVGPBEm31cgL27InUyYf4detDJThjr2g7TnMUSv02a0xvHRuPqC7dtjwky37IvfDPEXcQ9RfDePkRms4xcXnNldaG6Db7LNSD356359Mtujj5-IYjYfvQQpo2Z1i71X_f7mbg4fWe_iz4GdjNj4WE6h3R7FVcujOk_i4cEW4DurZSixFj1aEwcRJmh-s6fUuY4x5C8rRieo" />
                <img alt="User" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP7WJzsHrtLzeIehrPRqqw4lQs5iZXDUQvlFcnVSuDe3Ep-HS3H6kKRGcdGksDdzsNwNdkdbG8p4ZzExpvMwTML4M9affAOH-H2BiwUyyn6hwszByRuRWg9IxvJ-M7rFCcUU_GWWaphImCfmS_IfYp8AksBDOWkHO8WFJ85RSMuqCpxMqCH3gqdwLXqSM9YY5LL2pte5R7wTs2x4kW1NRJCvMLDsTRrY1UcWjP6rlmPWo2eoCXApn4cRn0lFUQoIIR3Qc19cE41E3D" />
                <img alt="User" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKDhzAZ1GsfXYY_UENlbLeLOwqwu3bz3HuswPJCMpII_pxvew-AMqwqzb6NNFTM-EYgZudTpLBU--ZSaRBgTA8B3foxCSYYkpGjK3ZgZ4c91SVOd4dz79FflAzsjpaG68B3KTckAuAfEomUqVLQ-Px-n1jKx-s0IFlHAdl-aiKl_XDFJcvXmW4qzICod76lgNC0lJhnJzTqpnlbscOY9ln5CdIB_N2n1zsW9c1f7OqzgZX8ii20HOtYEJqjz5z2WGjdF87qsfyz1IW" />
              </div>
              <p>Join <span className="font-bold text-gray-900 dark:text-white">12,000+</span> happy homeowners</p>
            </div>
          </div>
          <div className="relative lg:h-[600px] w-full hidden lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
            <div className="relative h-full w-full">
              <div className="absolute top-10 right-0 w-3/4 h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-surface-dark transform hover:scale-[1.02] transition duration-500">
                <img alt="Modern Lekki House" className="object-cover h-full w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOssmAqQ6uvTumTZ1SZ6bf4cKdbivqqQh3IsmAkG7COGoK_c2R_F3r4waNqlLs70FPc1cpq2LLQZyPgqr19bVx5Lkw9tBY8QKkigJjzIoUCUGIfQb-pxcWiB-WIdZPgeuZfrcPQe9OqOWlwafVlaVkgNwxcToZaxmq3oMD96MtpD03hB2fNQNJaO5bZcwbuZOkitlaTojEziLWe88AqSvbLISMdbkQSifAaFiNLF9VAuGBop96IU3F_Wa3Jo7SI3oz4S37NcX7Dbof" />
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Lekki Phase 1</p>
                  <p className="text-xs text-secondary font-bold">₦85,000,000</p>
                </div>
              </div>
              <div className="absolute bottom-20 left-4 w-1/2 h-[250px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-surface-dark transform -rotate-3 hover:rotate-0 transition duration-500 z-20">
                <img alt="Modern Interior" className="object-cover h-full w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgMAtRwLuOOf-nSzw6z345NIexa2LlnHqQBjzZWOQ7c1wMK4yq2eFNgWeoqUcNNTUpShZei6KFOEJlkPWCCL7qEQEtpjz2_PWqdDK8XLAy_0knSO7cTc22N9yhQJFd5MgBNVT53A_oNrvKMGuAgV5VqX1DCln0hUedFNTOg2YA9wZql97zk-Sf5DkqM6fQ2b00PSKG1vKw8NACndivZWuYVeasATOm_lkFggWlJHGd-wxwwaBweUGMRI0C7f69XuRgZ2EplKLDVYCt" />
              </div>
              <div className="absolute top-32 left-10 bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg text-secondary">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-bold text-gray-900 dark:text-white">Verified Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
