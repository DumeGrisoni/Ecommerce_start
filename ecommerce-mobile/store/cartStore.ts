import { CartStateType, ProductType } from '@/types/types';
import { create } from 'zustand';

export const useCart = create<CartStateType>((set) => ({
  items: [],
  addProduct: (product: ProductType, quantity: number) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return { items: [...state.items, { product, quantity }] };
      }
    }),
  removeProduct: (productId: number) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),
  resetCart: () => set({ items: [] }),
  incrementQuantity: (productId: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),
  decrementQuantity: (productId: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      ),
    })),
}));
