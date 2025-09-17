# Guía de Temas y Colores con Tailwind CSS

Esta guía explica cómo utilizar el sistema de temas dinámicos implementado en el proyecto.

## 1. Cómo Funciona

El sistema se basa en **variables de color CSS** definidas en `src/styles/globals.css`. Todos los temas disponibles son **temas claros** (fondo claro, texto oscuro), pero usan un color primario oscuro para elementos como la barra de navegación, creando un alto contraste.

Utilizamos un selector de atributo `[data-theme]` en la etiqueta `<html>` para cambiar entre las diferentes paletas de colores.

- **Tema por defecto**: `mdb`.
- **Otros temas**: `blue`, `green`, `navy`.

## 2. Paletas de Colores Disponibles

Ahora tienes 4 temas claros disponibles:

1.  **`mdb` (Predeterminado)**: Un tema claro profesional que usa `#243A51` como color primario.
2.  **`blue`**: Un tema claro con una paleta de azules muy oscuros.
3.  **`green`**: Un tema claro con una paleta de verdes muy oscuros.
4.  **`navy` (Custom)**: Un tema claro que usa la paleta de colores personalizada que definiste.

## 3. Cómo Cambiar de Tema

En el menú lateral (`Drawer.tsx`) existe un selector de temas visual. En lugar de botones con texto, verás una selección de círculos de colores. Cada círculo representa el color primario de un tema. El tema activo se resalta con un anillo blanco a su alrededor.

El código para el store de Zustand que maneja la lógica necesita ser actualizado para incluir el nuevo tema:

**Ejemplo con un store de Zustand (`themeStore.ts`):**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'mdb' | 'blue' | 'green' | 'navy';

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'mdb', // Tema por defecto
      setTheme: (newTheme) => {
        set({ theme: newTheme });
        // Actualiza el atributo en el DOM
        document.documentElement.setAttribute('data-theme', newTheme);
      },
    }),
    {
      name: 'theme-storage', // nombre para el localStorage
    }
  )
);

// Hook para inicializar el tema en el cliente
export const useInitializeTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme-storage');
    if (savedTheme) {
      const { state } = JSON.parse(savedTheme);
      document.documentElement.setAttribute('data-theme', state.theme);
    } else {
      // Si no hay nada guardado, establece el tema mdb por defecto
      document.documentElement.setAttribute('data-theme', 'mdb');
    }
  }
};
```