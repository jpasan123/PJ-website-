import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isBrowser } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(i => i.product_id === item.product_id);

        if (existingItem) {
          set({
            items: currentItems.map(i =>
              i.product_id === item.product_id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...currentItems, item] });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.product_id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map(item =>
            item.product_id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      clearCart: () => {
        set({ items: [] });
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => (isBrowser() ? localStorage : null)),
      skipHydration: true,
    }
  )
);