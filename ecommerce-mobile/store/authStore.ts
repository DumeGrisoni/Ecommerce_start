import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStoreType, userType } from '@/types/types';

export const useAuth = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user: userType) => set({ user }),
      setToken: (token: string) => set({ token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
