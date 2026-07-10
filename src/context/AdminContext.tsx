import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, Order } from '../types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neon Genesis',
    price: 850,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80',
    description: 'Streetwear',
  },
  {
    id: '2',
    name: 'Liquid Metal',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80',
    description: 'Custom 3D',
  },
  {
    id: '3',
    name: 'Void Walker',
    price: 950,
    image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80',
    description: 'Oversized',
  },
  {
    id: '4',
    name: 'Cyber YZ',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80',
    description: 'Limited Edition',
  }
];

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
