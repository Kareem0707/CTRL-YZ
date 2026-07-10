import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const generateRow = (start: number, end: number) => {
  const arr = Array.from({ length: end - start + 1 }).map((_, i) => `/assets/products/product-${start + i}.jpg`);
  return [...arr, ...arr]; // Duplicate for seamless looping
};

const imagesRow1 = generateRow(1, 10);
const imagesRow2 = generateRow(11, 20);
const imagesRow3 = generateRow(21, 31);

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background with Tilted Rows */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none flex flex-col justify-center gap-4" style={{ transform: 'rotate(-30deg) scale(1.5)' }}>
        
        {/* Row 1: Left to Right */}
        <motion.div 
          className="flex gap-4 w-[200vw]"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        >
          {imagesRow1.map((src, idx) => (
            <div key={idx} className="w-[300px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl">
              <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="" />
            </div>
          ))}
        </motion.div>

        {/* Row 2: Right to Left */}
        <motion.div 
          className="flex gap-4 w-[200vw]"
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
        >
          {imagesRow2.map((src, idx) => (
            <div key={idx} className="w-[300px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl">
              <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="" />
            </div>
          ))}
        </motion.div>

        {/* Row 3: Left to Right */}
        <motion.div 
          className="flex gap-4 w-[200vw]"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        >
          {imagesRow3.map((src, idx) => (
            <div key={idx} className="w-[300px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl">
              <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="" />
            </div>
          ))}
        </motion.div>

      </div>

      {/* Center Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 glass p-16 rounded-[3rem] shadow-2xl border-white/10 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-display font-black leading-tight uppercase tracking-tight text-white mb-6"
        >
          {t.title || 'Next Gen Commerce'}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/90 max-w-2xl leading-relaxed font-light mb-10"
        >
          {t.subtitle || 'Discover premium products with an immersive shopping experience tailored just for you.'}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a href="#products" className="bg-accent text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/20">
            {t.primaryCTA || 'Shop Now'}
          </a>
          <a href="#about" className="bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105">
            {t.secondaryCTA || 'Learn More'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
