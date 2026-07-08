import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-display font-black leading-tight uppercase tracking-tight text-white"
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/80 max-w-lg leading-relaxed font-light"
          >
            {t.subtitle}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <button className="bg-accent text-background px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(245,180,18,0.5)]">
              {t.primaryCTA}
            </button>
            <button className="bg-transparent border-2 border-border text-foreground hover:border-accent hover:text-accent px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(245,180,18,0.2)]">
              {t.secondaryCTA}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[60vh] hidden lg:block"
        >
          {/* Abstract 3D shape placeholder using CSS and framer-motion */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, 10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-full h-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[40px] border border-white/10 glass rotate-3 scale-95" />
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/40 to-black/80 rounded-[40px] border border-accent/20 shadow-2xl overflow-hidden">
               <img 
                 src="/assets/products/product-1.jpg" 
                 alt="Premium Fabric" 
                 className="w-full h-full object-cover mix-blend-overlay opacity-50 scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
