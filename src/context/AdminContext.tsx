import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, Order } from '../types';
import { supabase } from '../lib/supabase';

const INITIAL_PRODUCTS: Product[] = Array.from({ length: 31 }).map((_, idx) => ({
  id: String(idx + 1),
  name: `CTRL YZ #${idx + 1}`,
  price: 450,
  image: `/assets/products/product-${idx + 1}.jpg`,
  description: 'Premium CTRL YZ Streetwear Collection',
  isBestSeller: idx < 3, // Make first 3 best sellers by default as an example
}));

interface AdminContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setLoading(false);
        return; // Fallback to local INITIAL_PRODUCTS if no keys provided yet
      }

      try {
        const { data: dbProducts, error: pError } = await supabase.from('products').select('*');
        if (!pError && dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
        }

        const { data: dbOrders, error: oError } = await supabase.from('orders').select('*');
        if (!oError && dbOrders) {
          setOrders(dbOrders);
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addProduct = async (product: Product) => {
    if (supabase) {
      await supabase.from('products').insert([product]);
    }
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    if (supabase) {
      await supabase.from('products').update(updatedFields).eq('id', id);
    }
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = async (id: string) => {
    if (supabase) {
      await supabase.from('products').delete().eq('id', id);
    }
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = async (order: Order) => {
    if (supabase) {
      await supabase.from('orders').insert([order]);
    }
    setOrders(prev => [order, ...prev]);
  };

  return (
    <AdminContext.Provider value={{ products, orders, addProduct, updateProduct, deleteProduct, addOrder, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
