import { ProductType } from '@/types/types';
import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],
  addProduct: (product: ProductType) =>
    set((state) => ({ items: [...state.items, { product, quantity: 1 }] })),
}));
