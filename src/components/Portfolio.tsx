import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const { language } = useLanguage();
  const t = translations[language].portfolio;

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-4">
              {t.title}
            </h2>
            <div className="w-24 h-1 bg-accent rounded-full" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 31 }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10" />
              
              <img 
                src={`/assets/products/product-${idx + 1}.jpg`} 
                alt={`CTRL YZ Product ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-accent font-bold uppercase tracking-widest text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {t.title}
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4 drop-shadow-lg">
                  CTRL YZ #{idx + 1}
                </h3>
                
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <button className="bg-accent text-background px-5 py-2 rounded-full font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                    {t.viewProject}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
