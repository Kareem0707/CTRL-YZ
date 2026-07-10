import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shirt } from 'lucide-react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Increased slightly to show the animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center justify-center">
            
            {/* The Animation Container */}
            <div className="relative w-40 h-40 flex justify-center mb-8">
              
              {/* Base Figure */}
              <motion.div 
                className="absolute bottom-0 text-white/80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <User size={140} strokeWidth={1.5} />
              </motion.div>
              
              {/* Falling Oversized T-Shirt */}
              <motion.div 
                className="absolute bottom-1 text-accent drop-shadow-[0_0_20px_rgba(245,180,18,0.5)]"
                initial={{ y: -500, opacity: 0, scale: 1.2 }}
                animate={{ y: 0, opacity: 1, scale: 1.1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100,
                  damping: 12,
                  mass: 1.5,
                  delay: 0.5 
                }}
              >
                <Shirt size={140} fill="currentColor" strokeWidth={1} />
              </motion.div>
            </div>

            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-display font-black text-white tracking-widest uppercase mb-4"
            >
              CTRL YZ
            </motion.div>
            
            {/* Minimalist loading bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
