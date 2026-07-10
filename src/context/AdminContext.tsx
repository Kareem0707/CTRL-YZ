import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, Order } from '../types';

const INITIAL_PRODUCTS: Product[] = Array.from({ length: 31 }).map((_, idx) => ({
  id: String(idx + 1),
  name: `CTRL YZ #${idx + 1}`,
  price: 450,
  image: `/assets/products/product-${idx + 1}.jpg`,
  description: 'Premium CTRL YZ Streetwear Collection',
}));

interface AdminContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);

  const addProduct = (product: Product) => setProducts([...products, product]);
  const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));
  const addOrder = (order: Order) => setOrders([order, ...orders]);

  return (
    <AdminContext.Provider value={{ products, orders, addProduct, deleteProduct, addOrder }}>
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
