import { create } from "zustand";

export type CursorState =
  | "default"
  | "link"
  | "card"
  | "text"
  | "canvas"
  | "dragging"
  | "click"
  | "hold";

interface CursorStore {
  state: CursorState;
  x: number;
  y: number;
  ringX: number;
  ringY: number;
  isVisible: boolean;
  setState: (state: CursorState) => void;
  setPosition: (x: number, y: number) => void;
  setRingPosition: (x: number, y: number) => void;
  setVisible: (visible: boolean) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  state: "default",
  x: -100,
  y: -100,
  ringX: -100,
  ringY: -100,
  isVisible: false,
  setState: (state) => set({ state }),
  setPosition: (x, y) => set({ x, y }),
  setRingPosition: (ringX, ringY) => set({ ringX, ringY }),
  setVisible: (isVisible) => set({ isVisible }),
}));
