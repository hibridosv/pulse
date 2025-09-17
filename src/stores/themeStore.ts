// src/stores/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  theme: 'mdb' | 'green';
  setTheme: (theme: 'mdb' | 'green') => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'mdb', // Tema por defecto
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage', // Nombre para el localStorage
    }
  )
);
