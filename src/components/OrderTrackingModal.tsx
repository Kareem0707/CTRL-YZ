import { useState } from 'react';
import { X, Search, PackageSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';

interface OrderTrackingModalProps {
  onClose: () => void;
}

export default function OrderTrackingModal({ onClose }: OrderTrackingModalProps) {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !phone) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('phone', phone)
          .single();

        if (error || !data) {
          setError('لم يتم العثور على طلب بهذه البيانات. تأكد من رقم الطلب ورقم الهاتف.');
        } else {
          setOrder(data);
        }
      } else {
        // Fallback for local testing without Supabase
        setError('تعذر الاتصال بقاعدة البيانات.');
      }
    } catch (err) {
      setError('حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جاري التحضير':
        return 'text-blue-400 bg-blue-400/20';
      case 'في الطريق':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'تم التوصيل':
        return 'text-green-400 bg-green-400/20';
      case 'مرتجع':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-foreground/50 bg-white/10';
    }
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
          className="relative w-full max-w-lg bg-background border border-white/10 p-8 rounded-[2rem] shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-foreground/50 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center">
              <PackageSearch className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">تتبع طلبك</h2>
          </div>

          {!order ? (
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">رقم الطلب (Order ID)</label>
                <input 
                  required 
                  type="text" 
                  value={orderId} 
                  onChange={e => setOrderId(e.target.value)} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white placeholder-white/20"
                  placeholder="مثال: abc123def"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">رقم الهاتف المرتبط بالطلب</label>
                <input 
                  required 
                  type="text" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white placeholder-white/20"
                  placeholder="رقم الهاتف"
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm font-semibold p-3 bg-red-400/10 rounded-lg">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 mt-4 flex justify-center items-center gap-2"
              >
                {loading ? 'جاري البحث...' : (
                  <>
                    <Search className="w-5 h-5" />
                    ابحث عن الطلب
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                <p className="text-sm text-foreground/50 mb-2 uppercase tracking-wider">حالة الطلب الحالية</p>
                <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${getStatusColor(order.status)}`}>
                  {order.status === 'pending' ? 'قيد المراجعة' : order.status}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white border-b border-white/10 pb-2">تفاصيل الطلب</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-foreground/50 block mb-1">رقم الطلب</span>
                    <span className="font-medium text-white">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block mb-1">تاريخ الطلب</span>
                    <span className="font-medium text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block mb-1">الإجمالي</span>
                    <span className="font-medium text-accent">{order.total} EGP</span>
                  </div>
                </div>

                <h3 className="font-semibold text-white border-b border-white/10 pb-2 mt-6">المنتجات</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-white">{item.name}</p>
                        {item.size && <p className="text-xs text-foreground/50">المقاس: {item.size}</p>}
                      </div>
                      <span className="text-sm font-medium">{item.quantity}x</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setOrder(null)}
                className="w-full border border-white/10 hover:bg-white/5 text-white font-bold py-3 rounded-xl transition-colors mt-6"
              >
                بحث جديد
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
