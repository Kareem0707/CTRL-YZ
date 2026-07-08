import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { Globe, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-display font-bold text-2xl tracking-widest text-accent uppercase">
          CTRL YZ
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['about', 'services', 'portfolio', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="text-foreground/80 hover:text-accent uppercase text-sm tracking-wider font-semibold transition-colors duration-300 py-2 px-1"
            >
              {t[item as keyof typeof t]}
            </a>
          ))}
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-border transition-all duration-300 hover:border-accent group"
          >
            <Globe className="w-4 h-4 text-foreground group-hover:text-accent transition-colors" />
            <span className="text-sm font-semibold uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
        </div>

        <button className="md:hidden text-foreground hover:text-accent transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
