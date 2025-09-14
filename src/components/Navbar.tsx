'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/stores/themeStore';
import { HiMenu } from 'react-icons/hi';
import Drawer from './Drawer'; // Restauramos la importación del Drawer

export const Navbar = () => {
  const { theme, setTheme } = useThemeStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para el Drawer

  return (
    <>
      <nav className="bg-background-main p-4 text-text-main shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Lado Izquierdo: Botón de Menú y Título */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-text-main hover:text-primary"
            >
              <HiMenu size={28} />
            </button>
            <Link href="/dashboard" className="text-xl font-bold text-primary">
              Pulse
            </Link>
          </div>

          {/* Centro: Controles para cambiar el tema */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Theme:</span>
            <button
              onClick={() => setTheme('indigo')}
              className={`px-3 py-1 rounded text-sm ${theme === 'indigo' ? 'bg-primary text-white' : 'bg-secondary'}`}
            >
              Indigo
            </button>
            <button
              onClick={() => setTheme('green')}
              className={`px-3 py-1 rounded text-sm ${theme === 'green' ? 'bg-primary text-white' : 'bg-secondary'}`}
            >
              Green
            </button>
          </div>

          {/* Lado Derecho (puedes añadir más cosas aquí) */}
          <div>
            {/* Icono de Home o similar si lo necesitas */}
          </div>
        </div>
      </nav>
      {/* Componente Drawer que se muestra u oculta */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
