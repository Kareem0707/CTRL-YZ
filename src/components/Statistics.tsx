import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

export default function Statistics() {
  const { language } = useLanguage();
  const t = translations[language].statistics;

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background SVG Arrow Animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <motion.svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 300" 
          preserveAspectRatio="none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.path
            d="M0 250 C 200 250, 300 150, 500 150 S 700 200, 900 50 L 1000 20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { 
                pathLength: 1, 
                opacity: 1, 
                transition: { duration: 2, ease: "easeInOut" } 
              }
            }}
          />
          <motion.path
            d="M 960 10 L 1000 20 L 980 60"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { delay: 1.8, duration: 0.5 } 
              }
            }}
          />
        </motion.svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-16 text-white">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-12 rounded-[2rem] flex flex-col items-center justify-center gap-4"
          >
            <div className="text-6xl md:text-8xl font-display font-black text-accent drop-shadow-[0_0_20px_rgba(245,180,18,0.4)]">
              +<Counter to={146} duration={2.5} />
            </div>
            <div className="text-xl md:text-2xl font-bold uppercase tracking-widest text-foreground/80">
              {t.clients}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-12 rounded-[2rem] flex flex-col items-center justify-center gap-4"
          >
            <div className="text-6xl md:text-8xl font-display font-black text-accent drop-shadow-[0_0_20px_rgba(245,180,18,0.4)]">
              <Counter to={94} duration={2.5} />.7%
            </div>
            <div className="text-xl md:text-2xl font-bold uppercase tracking-widest text-foreground/80">
              {t.success}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
