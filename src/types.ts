export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: string;
  paymentMethod: string;
  receiptImage?: string; // For Vodafone Cash or InstaPay
  customerName: string;
  phone: string;
  address: string;
}
