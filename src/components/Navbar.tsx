'use client';

import { useConfigLogic } from '@/hooks/config/useConfigLogic';
import useConfigStore from '@/stores/configStore';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoHome } from 'react-icons/io5';
import Drawer from './Drawer'; // Restauramos la importación del Drawer

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para el Drawer
  const { user, client, permission } = useConfigStore();
 useConfigLogic(); // carga todas las configuraciones necesarias

  return (
    <>
      <nav className="bg-primary px-2 py-1.5 sm:p-2 text-text-inverted shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-2 sm:px-4">

         <div className="flex items-center">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-text-inverted hover:text-secondary"
            >
              <HiMenu size={26} className="sm:w-8 sm:h-8" />
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-4 font-semibold text-xs sm:text-sm">
            <div className="hidden sm:block">{ user?.name }</div>
            <div className="hidden sm:block">|</div>
            <div className="truncate max-w-[160px] sm:max-w-none">{ client?.nombre_comercial }</div>
          </div>

          <div>
            <Link href="/orders/products" className="text-text-inverted hover:text-secondary">
              <IoHome size={22} className="sm:w-7 sm:h-7" />
            </Link>
          </div>

        </div>
      </nav>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
