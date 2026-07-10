import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, Order } from '../types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium T-Shirt',
    price: 450,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    description: 'High quality cotton t-shirt',
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
    description: 'Classic blue denim jacket',
  },
  {
    id: '3',
    name: 'Leather Sneakers',
    price: 850,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    description: 'Comfortable everyday sneakers',
  },
  {
    id: '4',
    name: 'Sunglasses',
    price: 300,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    description: 'UV protection sunglasses',
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
