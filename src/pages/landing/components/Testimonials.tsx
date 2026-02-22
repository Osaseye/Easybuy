import React from 'react';
import { motion } from 'framer-motion';
import { useTestimonials } from '../../../hooks/useTestimonials';

export const Testimonials = () => {
  const { testimonials } = useTestimonials();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Trusted by Nigerians</h2>
        <p className="text-gray-600 dark:text-gray-400">See what real users are saying about finding their homes with EasyBuy.</p>
      </div>

      <div className="flex overflow-hidden relative">
         <motion.div 
           className="flex gap-8 w-max"
           animate={{ x: "-33.33%" }}
           transition={{ 
             repeat: Infinity, 
             ease: "linear", 
             duration: 20
           }}
         >
           {[...testimonials, ...testimonials, ...testimonials].map((item, index) => (
             <div key={index} className="w-[350px] md:w-[450px] flex-shrink-0 bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined fill-current">star</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6 text-lg whitespace-normal leading-relaxed">"{item.content}"</p>
                <div className="flex items-center gap-3">
                  <img alt={item.author} className="h-12 w-12 rounded-full object-cover" src={item.image} />
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white text-base">{item.author}</h5>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
             </div>
           ))}
         </motion.div>
      </div>
    </section>
  );
};
