# Project: Pulse

This document provides a reference for the technical stack and conventions used in this project.

## Core Technologies

- **Framework**: Next.js (v14+)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand

## Backend Integration

- **API**: The frontend consumes a Laravel API.
- **Authentication**: Authentication is handled via Laravel Passport (OAuth2).

### Authentication Details (NextAuth.js)

The project uses NextAuth.js for authentication, configured with a `CredentialsProvider` to interact with the Laravel API.

- **Configuration File**: `src/app/api/auth/[...nextauth]/route.ts`
- **Provider**: `CredentialsProvider` for username/password authentication against the Laravel API's OAuth token endpoint.
- **Session Management**: `jwt` and `session` callbacks are used to store and expose the `accessToken` obtained from Laravel.
- **Custom Login Page**: The login page is explicitly set to the root path (`/`) via the `pages` option in NextAuth.js configuration (`signIn: '/'`).
- **Middleware Protection**: `src/middleware.ts` is configured to protect specific routes (`/dashboard`, `/protected`, `/products`) by redirecting unauthenticated users to the custom login page.

## Key Project Conventions

- **Component Structure**: [To be defined]
- **State Management**: Zustand stores are used for global and feature-specific state.
- **API Requests**: All API requests are handled through a centralized `httpService` using `axios`. This service automatically injects the NextAuth.js `accessToken` into request headers and provides basic error handling.
  - **Service File**: `src/services/httpService.ts`
  - **Base URL**: Configured via `process.env.NEXT_PUBLIC_API_URL`. Ensure this environment variable is set in `.env.local`.
  - **Authentication Flow**: The service intercepts requests to add the `Bearer` token from the active NextAuth.js session. It also includes a response interceptor to handle `401 Unauthorized` errors (e.g., for token expiration).
- **Linting**: ESLint with the `next` configuration is used to maintain code quality.
- **Import Alias**: The project uses `@/*` to reference files from the `src` directory.

## Agent Operational Rules

- **No Inline Change Comments**: Do not add comments to the code explaining what was changed (e.g., `// Changed this line to fix bug X`). Explain changes in the chat, not in the code itself. The code should only contain comments that explain *why* the code is written a certain way if the logic is complex, following standard best practices.

---

## Theming and Styling System

The project implements a robust theming system based on CSS Custom Properties (variables) and Tailwind CSS, allowing for dynamic theme switching.

### 1. How It Works

- **CSS Custom Properties**: All theme colors are defined as CSS variables (e.g., `--color-primary`, `--color-bg-base`) within `src/styles/globals.css`.
- **`data-theme` Attribute**: Themes are activated by setting the `data-theme` attribute on the `<html>` element (e.g., `<html data-theme="blue">`). The `:root` selector defines the default theme.
- **Tailwind CSS Integration**: `tailwind.config.ts` is configured to read these CSS variables, enabling the use of theme-aware Tailwind classes like `bg-primary` or `text-text-base`. The `rgb(var(...) / <alpha-value>)` syntax allows for Tailwind's opacity modifiers (e.g., `bg-primary/50`).

### 2. Available Themes

All themes are designed as **light themes** (light backgrounds, dark text) but feature distinct, often darker, primary colors for high-contrast elements like navigation bars.

- **`mdb` (Default)**:
  - **Primary Color**: `#243A51` (Dark Blue-Gray)
  - **Description**: A professional, clean theme with a classic blue-gray primary.
- **`blue`**:
  - **Primary Color**: Custom Dark Blue (`#162B69`)
  - **Description**: A vibrant theme with a deep, custom blue primary.
- **`green`**:
  - **Primary Color**: Custom Dark Green (`#0C381F`)
  - **Description**: A fresh theme with a rich, custom green primary.
- **`navy` (Custom)**:
  - **Primary Color**: `#223E5A` (Dark Navy Blue)
  - **Description**: A custom theme using a provided palette of dark navy blues.

### 3. Theme Switching

Theme switching is managed via a Zustand store and a visual selector in the Drawer component.

- **Zustand Store (`src/stores/themeStore.ts`)**:
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
        theme: 'mdb', // Default theme
        setTheme: (newTheme) => {
          set({ theme: newTheme });
          // Update the attribute in the DOM
          document.documentElement.setAttribute('data-theme', newTheme);
        },
      }),
      {
        name: 'theme-storage', // localStorage key
      }
    )
  );

  // Hook to initialize the theme on the client
  export const useInitializeTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme-storage');
      if (savedTheme) {
        const { state } = JSON.parse(savedTheme);
        document.documentElement.setAttribute('data-theme', state.theme);
      } else {
        // If nothing saved, set mdb theme as default
        document.documentElement.setAttribute('data-theme', 'mdb');
      }
    }
  };
  ```

- **Visual Theme Switcher (`src/components/Drawer.tsx`)**:
  - Located in the side drawer.
  - Displays small color circles representing each theme's primary color.
  - The active theme's circle is highlighted with a white ring.
  - Example usage in `Drawer.tsx`:
    ```jsx
    <div className="flex justify-center items-center p-2 gap-3 z-10 bg-primary/95">
        <button
          title="MDB"
          onClick={() => setTheme('mdb')}
          className={`w-6 h-6 rounded-full transition-all ${theme === 'mdb' ? 'ring-2 ring-offset-2 ring-offset-primary ring-white' : ''}`}
          style={{ backgroundColor: '#243A51' }}
        />
        <button
          title="Azul"
          onClick={() => setTheme('blue')}
          className={`w-6 h-6 rounded-full transition-all ${theme === 'blue' ? 'ring-2 ring-offset-2 ring-offset-primary ring-white' : ''}`}
          style={{ backgroundColor: '#162B69' }}
        />
        <button
          title="Verde"
          onClick={() => setTheme('green')}
          className={`w-6 h-6 rounded-full transition-all ${theme === 'green' ? 'ring-2 ring-offset-2 ring-offset-primary ring-white' : ''}`}
          style={{ backgroundColor: '#0C381F' }}
        />
        <button
          title="Navy"
          onClick={() => setTheme('navy')}
          className={`w-6 h-6 rounded-full transition-all ${theme === 'navy' ? 'ring-2 ring-offset-2 ring-offset-primary ring-white' : ''}`}
          style={{ backgroundColor: '#223E5A' }}
        />
    </div>
    ```

### 4. Component Styling Conventions

Components are styled to be theme-aware and professional, following these patterns:

- **Card-like Containers**: Many components (e.g., `ShowProductsStatistics`, `ShowProductsTable`, `LinkList`) are wrapped in `div` elements with classes like `bg-bg-content rounded-lg shadow-sm border border-bg-subtle`.
- **Text Colors**:
  - `text-text-base`: Primary text color.
  - `text-text-muted`: Secondary or less emphasized text.
  - `text-text-inverted`: Text color for use on primary-colored backgrounds (e.g., buttons, Navbar).
- **Backgrounds**:
  - `bg-bg-base`: Main page background.
  - `bg-bg-content`: Background for cards, modals, etc.
  - `bg-bg-subtle`: Subtle backgrounds, hover states, table headers, and borders.
- **Semantic Colors**: `text-success`, `text-danger`, `text-warning`, `text-info` are used for status indicators.
- **Table Styling**:
  - **Header**: `bg-bg-subtle/60`, `text-text-base`, with `border-b-2 border-bg-subtle` for separation.
  - **Cell Borders**: `border-r border-bg-subtle` for vertical separation in headers, and `divide-x divide-bg-subtle` on `<tr>` for vertical separation in body cells.
  - **Row Dividers**: `divide-y divide-bg-subtle` on `<tbody>`.
  - **Zebra Striping**: `odd:bg-bg-subtle/40` on `<tr>` for alternating row colors.
  - **Hover States**: `hover:bg-bg-subtle` on `<tr>`.
  - **Conditional Styling**: E.g., `bg-danger/10 text-danger` for status indicators (like out-of-stock products).
- **Responsive Design**: Components like `Pagination` utilize `flex-wrap` and conditional visibility (`hidden sm:inline`) to adapt to different screen sizes.

### 5. Modal Component

The `Modal` component (`src/components/modal/Modal.tsx`) provides a flexible `size` prop to control its width.

| Size Prop | Tailwind Class |
| :-------- | :------------- |
| `xs`      | `max-w-xs`     |
| `sm`      | `max-w-sm`     |
| `md`      | `max-w-md`     |
| `lg`      | `max-w-lg`     |
| `xl`      | `max-w-xl`     |
| `xl2`     | `max-w-2xl`    |
| `xl3`     | `max-w-3xl`    |
| `xl4`     | `max-w-4xl`    |
| `xl5`     | `max-w-5xl`    |
| `xl6`     | `max-w-6xl`    |
| `xl7`     | `max-w-7xl`    |
| `full`    | `max-w-full`   |


## Cambios Recientes del Agente

Esta sección documenta los cambios significativos realizados por el agente para mejorar la calidad del código, la coherencia de los estilos y la funcionalidad del proyecto.

### 1. Configuración y Corrección de ESLint

-   **Configuración de ESLint:** Se creó el archivo `.eslintrc.json` con la configuración `next/core-web-vitals` para establecer un estándar de linting en el proyecto, resolviendo problemas de configuración interactiva.
