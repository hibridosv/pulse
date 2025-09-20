'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';
import { IoHome } from 'react-icons/io5';
import Drawer from './Drawer'; // Restauramos la importación del Drawer
import useConfigStore from '@/stores/configStore';

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para el Drawer
  const { user, client, permission } = useConfigStore();

  return (
    <>
      <nav className="bg-primary p-2 text-text-inverted shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Lado Izquierdo: Botón de Menú y Título */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-text-inverted hover:text-secondary"
            >
              <HiMenu size={32} />
            </button>
            <Link href="/dashboard" className="text-xl font-bold text-text-inverted">
              Pulse
            </Link>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <div>{ client?.nombre_comercial }</div>
            <div>|</div>
            <div>{ user?.name }</div>
          </div>

          {/* Lado Derecho (puedes añadir más cosas aquí) */}
          <div>
            <Link href="/dashboard" className="text-text-inverted hover:text-secondary">
              <IoHome size={26} />
            </Link>
          </div>
        </div>
      </nav>
      {/* Componente Drawer que se muestra u oculta */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
