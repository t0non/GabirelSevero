import { create } from 'zustand';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getFreeShippingProgress: () => number;
}

const FREE_SHIPPING_THRESHOLD = 160;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product) => set((state) => {
    const existingIndex = state.items.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const newItems = [...state.items];
      newItems[existingIndex].quantity += 1;
      return { items: newItems, isOpen: true };
    }
    return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map((item) => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    )
  })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  getTotal: () => {
    return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
  getFreeShippingProgress: () => {
    const total = get().getTotal();
    return Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  }
}));
