import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Eye, X } from 'lucide-react';

export default function OrdersView() {
  const { orders, updateOrder } = useAdmin();
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  return (
    <div className="space-y-8 relative">
      <h1 className="text-3xl font-display font-bold text-white mb-8">Order Management</h1>

      <div className="glass p-8 rounded-3xl">
        {orders.length === 0 ? (
          <p className="text-foreground/50">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-bold text-accent">Order #{order.id}</h3>
                    <p className="text-sm text-foreground/50">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrder(order.id, { status: e.target.value })}
                      className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm font-bold border border-white/20 focus:outline-none focus:border-accent"
                    >
                      <option value="pending" className="bg-background text-white">قيد المراجعة</option>
                      <option value="جاري التحضير" className="bg-background text-white">جاري التحضير</option>
                      <option value="في الطريق" className="bg-background text-white">في الطريق</option>
                      <option value="تم التوصيل" className="bg-background text-white">تم التوصيل</option>
                      <option value="مرتجع" className="bg-background text-white">مرتجع</option>
                    </select>
                    <span className="text-xl font-bold text-white">{order.total} EGP</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">Customer Details</h4>
                    <p className="font-medium text-white">{order.customerName}</p>
                    <p className="text-foreground/80">{order.phone}</p>
                    <p className="text-foreground/80 mt-2">{order.address}</p>
                    
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mt-6 mb-3">Payment Method</h4>
                    <p className="font-medium capitalize text-white flex items-center gap-3">
                      {order.paymentMethod === 'vodafone' ? 'Vodafone Cash' : order.paymentMethod}
                      {order.receiptImage && (
                        <button 
                          onClick={() => setSelectedReceipt(order.receiptImage!)}
                          className="flex items-center gap-1 text-xs bg-accent/20 text-accent px-2 py-1 rounded hover:bg-accent/40 transition-colors"
                        >
                          <Eye className="w-3 h-3" /> View Receipt
                        </button>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                          <span className="text-white">{item.quantity}x {item.name}</span>
                          <span className="font-semibold">{item.price * item.quantity} EGP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-2xl w-full bg-background border border-white/10 p-2 rounded-2xl shadow-2xl">
            <button 
              onClick={() => setSelectedReceipt(null)}
              className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedReceipt} alt="Transfer Receipt" className="w-full h-auto max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
