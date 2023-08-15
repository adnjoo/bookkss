import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));

export const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
