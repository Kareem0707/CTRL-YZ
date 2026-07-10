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
            
            {/* The pulsing logo / placeholder text */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl md:text-6xl font-display font-black text-accent tracking-widest uppercase mb-8"
            >
              CTRL YZ
            </motion.div>

            {/* Hint for the developer where the 3D video will go */}
            <div className="absolute top-full mt-4 text-center">
              <p className="text-foreground/40 text-sm max-w-xs leading-relaxed border border-white/5 bg-white/5 p-4 rounded-xl">
                [مكان فيديو المجسم 3D الأبيض وهو يرتدي التيشيرت]
              </p>
            </div>
            
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
