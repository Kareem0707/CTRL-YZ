import { useState } from 'react';
import { X, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

const SIZES = ['M', 'L', 'XL', 'XXL', 'XXXL'];

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-background border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh] sm:max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-accent transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-auto relative overflow-hidden bg-white/5 shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col overflow-y-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white mb-2 uppercase">{product.name}</h2>
            <div className="text-xl sm:text-2xl font-bold text-accent mb-4 sm:mb-6">{product.price} EGP</div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center border transition-all ${
                      selectedSize === size 
                        ? 'border-accent bg-accent text-white shadow-[0_0_15px_rgba(245,180,18,0.4)]' 
                        : 'border-white/10 hover:border-accent/50 text-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="prose prose-invert mb-8 text-foreground/80">
              <p className="text-lg">{product.description}</p>
              
              <div className="mt-6 space-y-2 text-sm font-medium border-t border-white/10 pt-6">
                <p className="flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" /> خامة قطن 100% عالية الجودة لراحة تدوم.
                </p>
                <p className="flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" /> طباعة 3D متطورة ضد التقشير والبهتان.
                </p>
                <p className="flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" /> قصة أوفر سايز مثالية تناسب جميع الأذواق.
                </p>
              </div>
            </div>

            <div className="mt-auto">
              <button 
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-4 rounded-2xl font-bold text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-3 ${
                  added ? 'bg-green-500 text-white' : 'bg-accent text-white hover:bg-accent/80 hover:shadow-[0_0_20px_rgba(245,180,18,0.3)]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-6 h-6" />
                    تم الإضافة بنجاح
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    شراء
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
