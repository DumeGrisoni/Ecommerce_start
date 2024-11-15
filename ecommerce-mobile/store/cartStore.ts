import { CartStateType, ProductType } from '@/types/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCart = create<CartStateType>()(
  persist(
    (set) => ({
      items: [],

      // Ajouter un produit au panier
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

      // Supprimer un produit du panier
      removeProduct: (productId: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      // Réinitialiser le panier
      resetCart: () => set({ items: [] }),

      // Incrémenter la quantité d'un produit
      incrementQuantity: (productId: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // Décrémenter la quantité d'un produit
      decrementQuantity: (productId: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
              : item
          ),
        })),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
