import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Products() {
  const { products } = useAdmin();
  const { addToCart } = useCart();

  return (
    <section id="products" className="py-24 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display font-black uppercase text-center mb-16 text-white"
        >
          Our Collection
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-3xl overflow-hidden group hover:border-accent/50 transition-colors flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                {product.isBestSeller && (
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(var(--color-accent),0.5)] animate-pulse flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    الأكثر مبيعاً
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-foreground/70 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-display font-bold text-accent">{product.price} EGP</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-white transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
