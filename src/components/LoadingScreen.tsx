import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real scenario, this could wait for images or fonts to load.
    // For now, we simulate a loading time of 2.5 seconds.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

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
          {/* Temporary Placeholder for the Mecha Chameleon 3D Animation */}
          <div className="relative flex flex-col items-center justify-center">
            
            {/* The Mecha Chameleon Image */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden mb-8 shadow-[0_0_50px_rgba(255,255,255,0.1)] relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <img 
                src="/assets/mecha_loading.png" 
                alt="Mecha Chameleon Loading" 
                className="w-full h-full object-cover grayscale mix-blend-screen"
              />
            </motion.div>
            
            {/* Minimalist loading bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-8">
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
