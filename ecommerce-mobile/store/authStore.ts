import { AuthStoreType, userType } from '@/types/types';
import { create } from 'zustand';

export const useAuth = create<AuthStoreType>((set) => ({
  user: null,
  token: null,

  setUser: (user: userType) => set({ user }),
  setToken: (token: string) => set({ token }),
  clearUser: () => set({ user: null, token: null }),
}));
