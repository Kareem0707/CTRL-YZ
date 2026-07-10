import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Home } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Products', path: '/admin/products', icon: <Package className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-white/5">
          <h2 className="font-display font-bold text-2xl tracking-widest text-accent uppercase">CTRL YZ Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-accent text-white font-bold' : 'text-foreground/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/70 hover:bg-white/5 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
