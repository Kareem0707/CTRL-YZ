import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Marquee() {
  const { language } = useLanguage();
  const t = translations[language].marquee;
  
  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...t, ...t, ...t, ...t];

  return (
    <section className="py-12 bg-accent overflow-hidden relative rotate-2 scale-105 my-20">
      <div className="absolute inset-0 bg-background/10 pointer-events-none" />
      
      <div className="flex whitespace-nowrap w-full overflow-hidden">
        <motion.div 
          className="flex items-center gap-16"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }}
        >
          {marqueeItems.map((item, index) => (
            <div 
              key={index}
              className="text-5xl md:text-7xl font-display font-black uppercase tracking-widest"
              style={{
                WebkitTextStroke: '2px #0C0C0C',
                color: 'transparent'
              }}
            >
              {item}
              <span className="inline-block mx-8 text-background text-3xl align-middle">
                ✦
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
