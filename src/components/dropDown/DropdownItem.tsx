'use client';

import React, { FC, useContext } from 'react';
import Link from 'next/link'; // Importar el componente Link de Next.js
import { DropdownContext } from './dropdownContext';

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string; // Para enlaces externos (<a>)
  as?: string;   // Para enlaces internos de Next.js (<Link>)
  target?: string; // Para target="_blank" en enlaces externos
}

/**
 * Componente DropdownItem
 *
 * Representa una opción individual dentro de un Dropdown.
 * Puede funcionar como un botón para ejecutar acciones, un enlace externo,
 * o un enlace interno de Next.js para navegación en la aplicación.
 *
 * Uso:
 * 1. Para acciones (renderiza un <button>):
 *    <DropdownItem onClick={() => alert('Acción ejecutada')}>Ejecutar Acción</DropdownItem>
 *
 * 2. Para enlaces externos (renderiza un <a>):
 *    <DropdownItem href="https://www.google.com" target="_blank">Ir a Google</DropdownItem>
 *
 * 3. Para enlaces internos de Next.js (renderiza un <Link>):
 *    <DropdownItem as="/dashboard">Ir a Dashboard</DropdownItem>
 *
 * Propiedades:
 * - children: Contenido a mostrar dentro del item (texto, icono, etc.).
 * - onClick?: Función a ejecutar cuando se hace clic (opcional).
 * - href?: URL para enlaces externos (opcional).
 * - as?: Ruta interna de Next.js para navegación (opcional).
 * - target?: Atributo 'target' para enlaces (ej. "_blank" para nueva pestaña).
 *
 * Nota: Si se proporcionan 'href' y 'as', 'as' tendrá prioridad (Next.js Link).
 * Si se proporcionan 'href'/'as' y 'onClick', el 'onClick' se ejecutará antes de la navegación.
 */
export const DropdownItem: FC<DropdownItemProps> = ({ children, onClick, href, as, target }) => {
  const context = useContext(DropdownContext);

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    // Cierra el dropdown a menos que sea un enlace externo que abre en una nueva pestaña
    if (context && (!href || target !== '_blank')) {
      context.setIsOpen(false);
    }
  };

  const commonClasses = "block w-full text-left px-4 py-2 text-sm text-text-base hover:bg-bg-subtle cursor-pointer";

  if (as) {
    return (
      <Link
        href={as}
        onClick={handleClick}
        className={commonClasses}
        role="menuitem"
      >
        {children}
      </Link>
    );
  } else if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={commonClasses}
        role="menuitem"
        target={target}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={commonClasses}
        role="menuitem"
      >
        {children}
      </button>
    );
  }
};
