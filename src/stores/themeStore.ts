// src/stores/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  theme: 'indigo' | 'green';
  setTheme: (theme: 'indigo' | 'green') => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'indigo', // Tema por defecto
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage', // Nombre para el localStorage
    }
  )
);
