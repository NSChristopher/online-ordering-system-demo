export interface BusinessInfo {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  hours?: string;
  logoUrl?: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  sortOrder: number;
  items?: MenuItem[];
}

export interface MenuItem {
  id: number;
  menuCategoryId: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  visible: boolean;
  sortOrder: number;
  category?: MenuCategory;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  orderType: 'delivery' | 'to-go';
  total: number;
  status: 'new' | 'accepted' | 'rejected' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card';
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  priceAtOrder: number;
  itemNameAtOrder: string;
  menuItem: MenuItem;
}

export interface CreateOrderData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  orderType: 'delivery' | 'to-go';
  paymentMethod: 'cash' | 'card';
  items: {
    menuItemId: number;
    quantity: number;
  }[];
}