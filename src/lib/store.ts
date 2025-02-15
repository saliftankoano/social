import { create } from "zustand";

export type Platform = "tiktok" | "twitter" | "linkedin";

interface PromptState {
  prompt: string;
  platforms: Platform[];
  setPrompt: (prompt: string) => void;
  setPlatforms: (platforms: Platform[]) => void;
}

export const usePromptStore = create<PromptState>()((set) => ({
  prompt: "",
  platforms: ["tiktok"],
  setPrompt: (prompt) => set({ prompt }),
  setPlatforms: (platforms) => set({ platforms }),
}));
