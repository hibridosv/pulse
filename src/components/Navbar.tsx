'use client';

import useConfigStore from '@/stores/configStore';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoHome } from 'react-icons/io5';
import Drawer from './Drawer'; // Restauramos la importación del Drawer

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para el Drawer
  const { user, client, permission } = useConfigStore();

  return (
    <>
      <nav className="bg-primary p-2 text-text-inverted shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-4">
         
         <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-text-inverted hover:text-secondary"
            >
              <HiMenu size={32} />
            </button>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <div>{ user?.name }</div>
            <div>|</div>
            <div>{ client?.nombre_comercial }</div>
          </div>

          <div>
            <Link href="/orders/products" className="text-text-inverted hover:text-secondary">
              <IoHome size={26} />
            </Link>
          </div>

        </div>
      </nav>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
