import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SoundStore {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (enabled: boolean) => void;
}

export const useSoundStore = create<SoundStore>()(
  persist(
    (set) => ({
      enabled: false,
      toggle: () => set((state) => ({ enabled: !state.enabled })),
      setEnabled: (enabled) => set({ enabled }),
    }),
    {
      name: "bhavya-sound-pref",
    }
  )
);
