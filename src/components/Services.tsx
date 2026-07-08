import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { Printer, Shirt, Sparkles, Gem } from 'lucide-react';

const icons = [Printer, Shirt, Gem, Sparkles];

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language].services;

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-4">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.cards.map((card, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass p-8 rounded-3xl group transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_30px_rgba(245,180,18,0.15)] hover:border-accent/50"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-500">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-4 group-hover:text-accent transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
