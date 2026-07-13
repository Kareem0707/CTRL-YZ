import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function CheckoutPage() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name must be at least two words
    if (customerName.trim().split(/\s+/).length < 2) {
      newErrors.name = 'الاسم ثنائي إلزامي';
    }

    // Phone must be valid Egyptian number
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(customerPhone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح (يجب أن يكون رقم مصري صحيح يبدأ بـ 01)';
    }

    // Address must be at least 12 characters
    if (customerAddress.trim().length < 12) {
      newErrors.address = 'العنوان يجب أن يكون 12 حرفاً على الأقل للوصول بدقة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!validateForm()) {
      return;
    }

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...items],
      total,
      createdAt: new Date().toISOString(),
      status: 'pending' as const,
      paymentMethod: 'cash_on_delivery',
      customerName,
      phone: customerPhone,
      address: customerAddress
    };

    addOrder(newOrder);
    clearCart();
    alert('تم إرسال طلبك بنجاح! سيتم التواصل معك لتأكيد الطلب.');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 text-center pt-20">
          <h1 className="text-4xl font-display font-bold text-white mb-8">إتمام الطلب</h1>
          <div className="glass p-12 text-center rounded-3xl max-w-2xl mx-auto">
            <p className="text-xl text-foreground/70 mb-6">لا يوجد منتجات لإتمام شرائها.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-accent text-white px-8 py-3 rounded-xl font-bold uppercase"
            >
              العودة للمتجر
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="glass p-8 rounded-3xl sticky top-28">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase">بيانات التوصيل</h2>
            
            <form onSubmit={handleCheckout} className="space-y-6" dir="rtl">
              <div>
                <label className="block text-sm font-semibold mb-2">الاسم بالكامل (الاسم ثنائي إلزامي)</label>
                <input 
                  type="text" 
                  value={customerName} 
                  onChange={e => {
                    setCustomerName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }} 
                  className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white`} 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">رقم الهاتف (مصري)</label>
                <input 
                  type="tel" 
                  value={customerPhone} 
                  onChange={e => {
                    setCustomerPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                  }} 
                  className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white text-right`} 
                  placeholder="مثال: 01012345678"
                  dir="ltr"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 text-right">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">العنوان بالتفصيل</label>
                <textarea 
                  value={customerAddress} 
                  onChange={e => {
                    setCustomerAddress(e.target.value);
                    if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                  }} 
                  className={`w-full bg-white/5 border ${errors.address ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white h-28 resize-none placeholder-white/30`} 
                  placeholder="المحافظة, المدينة, الحي, بالقرب من..."
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="pt-4 border-t border-white/10">
                <label className="block text-sm font-semibold mb-4">طريقة الدفع</label>
                <div className="border border-accent bg-accent/10 rounded-xl p-4 flex items-center gap-3">
                  <ShieldCheck className="text-accent w-6 h-6" />
                  <span className="font-bold text-accent">الدفع عند الاستلام (Cash on Delivery)</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={items.length === 0} 
                className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider mt-4 text-lg"
              >
                تأكيد الطلب
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
          <h2 className="text-3xl font-display font-bold text-white mb-6 uppercase text-right">ملخص الطلب</h2>
          
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="glass p-4 rounded-2xl flex items-center gap-4 dir-rtl">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                <div className="flex-1 text-right">
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  {item.size && (
                    <p className="text-sm text-foreground/50 mb-1">المقاس: <span className="font-bold text-white">{item.size}</span></p>
                  )}
                  <p className="text-accent font-semibold">{item.price} ج.م</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded">+</button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded">-</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 text-xs hover:underline mt-1">
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-6 rounded-2xl mt-6 flex justify-between items-center text-2xl dir-rtl">
            <span className="font-bold text-accent">{total} ج.م</span>
            <span>:الإجمالي</span>
          </div>
        </div>
      </div>
    </div>
  );
}
