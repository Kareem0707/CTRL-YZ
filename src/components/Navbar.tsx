import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { Globe, Menu, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;
  const { items } = useCart();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-2xl tracking-widest text-accent uppercase">
          CTRL YZ
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {!isAdmin && ['about', 'services', 'portfolio', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`/#${item}`} 
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

          {!isAdmin && (
            <Link to="/cart" className="relative p-2 text-foreground hover:text-accent transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          )}

          <Link to="/admin" className="flex items-center gap-2 p-2 text-foreground/50 hover:text-accent transition-colors">
            <ShieldCheck className="w-5 h-5" />
          </Link>
        </div>

        <button className="md:hidden text-foreground hover:text-accent transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
