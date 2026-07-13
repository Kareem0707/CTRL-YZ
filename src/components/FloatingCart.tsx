import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function FloatingCart() {
  const { items } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4">
          
          {/* Thumbnails */}
          <div className="flex -space-x-4 overflow-x-auto flex-1 pb-1 scrollbar-hide">
            {items.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                className="w-12 h-12 rounded-full border-2 border-background overflow-hidden relative flex-shrink-0"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button 
            onClick={() => navigate('/checkout')}
            className="whitespace-nowrap bg-accent text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(245,180,18,0.4)] transition-all"
          >
            إتمام الطلب
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
