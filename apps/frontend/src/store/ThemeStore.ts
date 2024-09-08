import create from "zustand";

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false, // 기본은 라이트 모드
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLightMode: () => set(() => ({ isDarkMode: false })),
  setDarkMode: () => set(() => ({ isDarkMode: true })),
}));
