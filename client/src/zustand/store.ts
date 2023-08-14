import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  setUser: (user: any) => set({ user }),
}));
