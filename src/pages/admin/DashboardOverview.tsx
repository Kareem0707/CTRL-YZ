import { useAdmin } from '../../context/AdminContext';
import { DollarSign, ShoppingBag, Package } from 'lucide-react';

export default function DashboardOverview() {
  const { orders, products } = useAdmin();

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-green-500/20 text-green-400 rounded-xl">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <p className="text-foreground/60 text-sm font-semibold uppercase tracking-wider">Total Sales</p>
            <p className="text-3xl font-bold text-white">{totalSales} EGP</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-blue-500/20 text-blue-400 rounded-xl">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <p className="text-foreground/60 text-sm font-semibold uppercase tracking-wider">Total Orders</p>
            <p className="text-3xl font-bold text-white">{totalOrders}</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-purple-500/20 text-purple-400 rounded-xl">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <p className="text-foreground/60 text-sm font-semibold uppercase tracking-wider">Products</p>
            <p className="text-3xl font-bold text-white">{totalProducts}</p>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-2xl mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-foreground/50">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-foreground/50 text-sm uppercase tracking-wider">
                  <th className="pb-4 font-semibold">Order ID</th>
                  <th className="pb-4 font-semibold">Date</th>
                  <th className="pb-4 font-semibold">Customer</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-accent font-medium">#{order.id}</td>
                    <td className="py-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-4">{order.customerName}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-bold uppercase">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 font-bold">{order.total} EGP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
