import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, UploadCloud } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function CartPage() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);

  const needsReceipt = paymentMethod === 'vodafone' || paymentMethod === 'instapay';

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckout = (e: any) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (needsReceipt && !receiptImage) {
      alert("Please upload the transfer receipt image.");
      return;
    }

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...items],
      total,
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentMethod,
      receiptImage: needsReceipt ? receiptImage || undefined : undefined,
      customerName,
      phone: customerPhone,
      address: customerAddress
    };

    addOrder(newOrder);
    clearCart();
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-display font-bold text-white mb-8">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="glass p-12 text-center rounded-3xl">
              <p className="text-xl text-foreground/70">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="glass p-4 rounded-2xl flex items-center gap-6">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    {item.size && (
                      <p className="text-sm text-foreground/50 mb-1">Size: <span className="font-bold text-white">{item.size}</span></p>
                    )}
                    <p className="text-accent font-semibold">{item.price} EGP</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded">-</button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-3xl sticky top-28">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10 text-xl">
              <span>Total:</span>
              <span className="font-bold text-accent">{total} EGP</span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input required type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <input required type="text" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Shipping Address</label>
                <textarea required value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white h-24 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-4">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  {['visa', 'mastercard', 'paypal', 'vodafone', 'instapay'].map(method => (
                    <label key={method} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${paymentMethod === method ? 'border-accent bg-accent/10' : 'border-white/10 hover:border-white/30'}`}>
                      <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="hidden" />
                      <span className="capitalize font-semibold text-sm">{method === 'vodafone' ? 'Vodafone Cash' : method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {needsReceipt && (
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-sm font-semibold mb-2 text-accent">Upload Transfer Receipt (Required)</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-accent hover:bg-white/5 transition-all">
                    {receiptImage ? (
                      <img src={receiptImage} alt="Receipt" className="h-full w-full object-cover rounded-xl" />
                    ) : (
                      <div className="flex flex-col items-center text-foreground/50">
                        <UploadCloud className="w-8 h-8 mb-2" />
                        <span className="text-sm">Click to upload screenshot</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              )}

              <button type="submit" disabled={items.length === 0} className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider mt-4">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
