import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

// Simple counter component
const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isFloat = to % 1 !== 0;

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(progress * (to - from) + from);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{isFloat ? count.toFixed(1) : Math.floor(count)}</span>;
};

export default function About() {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] rounded-[2rem] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img 
            src="/assets/products/product-2.jpg" 
            alt="About CTRL YZ" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />
        </motion.div>

        {/* Right Side: Text & Stats */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6 text-white">
              {t.title}
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              {t.mission}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
            {t.stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col gap-2"
              >
                <div className="text-4xl font-display font-black text-accent">
                  <Counter to={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm uppercase tracking-wider text-foreground/50 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
