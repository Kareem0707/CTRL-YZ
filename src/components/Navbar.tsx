import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { Globe, Menu, X, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;
  const { items } = useCart();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-2xl tracking-widest text-accent uppercase shrink-0">
          CTRL YZ
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {!isAdmin && ['about', 'services', 'portfolio', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`/#${item}`} 
              className="text-foreground/80 hover:text-accent uppercase text-sm tracking-wider font-semibold transition-colors duration-300 py-2 px-1"
            >
              {t[item as keyof typeof t] || item}
            </a>
          ))}
        </div>

        {/* Action Icons (Desktop & Mobile) */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 sm:gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 md:py-2 rounded-full border border-border transition-all duration-300 hover:border-accent group"
          >
            <Globe className="w-4 h-4 text-foreground group-hover:text-accent transition-colors" />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {!isAdmin && (
            <Link to="/cart" className="relative p-1.5 sm:p-2 text-foreground hover:text-accent transition-colors">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          )}

          <Link to="/admin" className="flex items-center gap-2 p-1.5 sm:p-2 text-foreground/50 hover:text-accent transition-colors">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-1.5 sm:p-2 text-foreground hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {!isAdmin && ['about', 'services', 'portfolio', 'contact'].map((item) => (
                <a 
                  key={item} 
                  href={`/#${item}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground/80 hover:text-accent uppercase text-sm tracking-wider font-semibold transition-colors duration-300 py-2 block border-b border-white/5"
                >
                  {t[item as keyof typeof t] || item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
