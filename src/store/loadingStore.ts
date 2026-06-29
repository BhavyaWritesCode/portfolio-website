import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  setLoading: (isLoading) => set({ isLoading }),
}));
