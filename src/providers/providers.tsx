'use client';

import { SessionProvider } from 'next-auth/react';
import { useThemeStore } from '@/stores/themeStore';
import { useEffect } from 'react';

type Props = {
  children?: React.ReactNode;
};

// Componente para manejar la lógica del tema
function ThemeManager({ children }: Props) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeManager>{children}</ThemeManager>
    </SessionProvider>
  );
};
