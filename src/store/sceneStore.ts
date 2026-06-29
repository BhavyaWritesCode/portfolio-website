import { create } from "zustand";
import type { ReactNode } from "react";

export type PageScene = "home" | "about" | "skills" | "projects" | "open-source" | "resume" | "404" | null;

interface SceneStore {
  activeScene: PageScene;
  setScene: (scene: PageScene) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  activeScene: null,
  setScene: (activeScene) => set({ activeScene }),
}));
