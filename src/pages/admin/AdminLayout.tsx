import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Home, Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-6 h-6 shrink-0" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag className="w-6 h-6 shrink-0" /> },
    { name: 'Products', path: '/admin/products', icon: <Package className="w-6 h-6 shrink-0" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      {/* Overlay for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`glass border-r border-white/5 flex flex-col transition-all duration-300 absolute md:relative z-50 h-full
          ${isExpanded ? 'w-64' : 'w-20'} md:w-64`}
      >
        <div className="h-20 flex items-center justify-center px-4 border-b border-white/5 relative">
          <h2 className={`font-display font-bold tracking-widest text-accent uppercase whitespace-nowrap overflow-hidden transition-all duration-300
             ${isExpanded ? 'w-auto opacity-100 text-xl' : 'w-0 opacity-0 md:w-auto md:opacity-100 md:text-2xl'} `}>
            CTRL YZ
          </h2>
          {/* Mobile Toggle Button */}
          <button 
            className={`md:hidden p-2 hover:bg-white/10 rounded-lg text-accent shrink-0 absolute transition-all duration-300 ${isExpanded ? 'right-4' : 'mx-auto'}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-4 overflow-hidden">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsExpanded(false)}
                title={item.name}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 ${isExpanded ? 'gap-4 justify-start' : 'justify-center md:justify-start md:gap-4'} ${
                  isActive ? 'bg-accent text-white shadow-[0_0_15px_rgba(var(--color-accent),0.3)]' : 'text-foreground/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className={`whitespace-nowrap font-medium transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 md:w-auto md:opacity-100'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 overflow-hidden">
          <Link 
            to="/" 
            className={`flex items-center p-3 rounded-xl text-foreground/70 hover:bg-white/5 hover:text-white transition-all duration-300 ${isExpanded ? 'gap-4 justify-start' : 'justify-center md:justify-start md:gap-4'}`} 
            title="Back to Store"
          >
            <Home className="w-6 h-6 shrink-0" />
            <span className={`whitespace-nowrap font-medium transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 md:w-auto md:opacity-100'}`}>
              Back to Store
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen ml-20 md:ml-0 transition-all duration-300 w-full">
        <Outlet />
      </main>
    </div>
  );
}
