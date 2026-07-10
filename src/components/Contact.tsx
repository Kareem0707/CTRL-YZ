import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <section id="contact" className="py-24 relative flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto px-6 w-full">
        
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-display font-black uppercase text-center mb-16"
        >
          {t.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          
          <motion.a
            href="mailto:contact@ctrlyz.com"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="glass p-12 rounded-[3rem] flex flex-col items-center justify-center gap-6 group hover:border-accent/60 hover:shadow-[0_0_40px_rgba(245,180,18,0.2)] cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-500">
              <Mail className="w-10 h-10 text-white group-hover:text-accent transition-colors duration-300" />
            </div>
            <span className="text-2xl md:text-3xl font-display font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors duration-300">
              {t.email}
            </span>
          </motion.a>

          <motion.a
            href="https://wa.me/123456789"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="glass p-12 rounded-[3rem] flex flex-col items-center justify-center gap-6 group hover:border-green-500/60 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-500">
              <MessageCircle className="w-10 h-10 text-white group-hover:text-green-500 transition-colors duration-300" />
            </div>
            <span className="text-2xl md:text-3xl font-display font-bold uppercase tracking-widest text-foreground group-hover:text-green-500 transition-colors duration-300">
              {t.whatsapp}
            </span>
          </motion.a>

        </div>
      </div>

      <footer className="mt-auto py-8 border-t border-border w-full text-center">
        <p className="text-foreground/50 text-sm font-semibold tracking-wider flex items-center justify-center gap-2 flex-wrap">
          <span>{t.footer}</span>
          <span className="text-accent/50 hidden sm:inline">|</span>
          <span>designed by kareem elshafie</span>
        </p>
      </footer>
    </section>
  );
}
