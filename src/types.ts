export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  paymentMethod: string;
  receiptImage?: string; // For Vodafone Cash or InstaPay
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}
