'use client';

import React, { useState, useRef, useEffect, useCallback, FC } from 'react';
import ReactDOM from 'react-dom'; // Importar ReactDOM para Portals
import { FiMoreVertical } from 'react-icons/fi';

interface DropdownOption {
  label: string;
  onClick?: () => void; // Ahora opcional
  href?: string; // Nueva propiedad para enlaces
}

interface DropDownProps {
  options: DropdownOption[];
  buttonContent?: React.ReactNode; // Contenido opcional para el botón
}

export const DropDown: FC<DropDownProps> = ({ options, buttonContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref para el contenedor del dropdown
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref para el botón que activa el dropdown
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    openUpwards: false,
  });

  // Calcula la posición del dropdown
  const calculatePosition = useCallback(() => {
    if (buttonRef.current && dropdownRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth; // Ancho real del menú
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const dropdownHeight = dropdownRef.current.offsetHeight; // Altura real del menú

      let newTop = rect.top + window.scrollY - dropdownHeight; // Forzar posición arriba
      let newLeft = rect.right + window.scrollX - dropdownWidth; // Posición a la izquierda
      let openUpwards = true; // Forzar hacia arriba

      setPosition({
        top: newTop,
        left: newLeft,
        width: rect.width, 
        openUpwards: openUpwards,
      });
    }
  }, [isOpen]); // Recalcular cuando se abre/cierra

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Recalcula posición al abrir y al redimensionar la ventana
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
    }
    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, calculatePosition]);

  const handleOptionClick = (option: DropdownOption) => {
    if (option.onClick) {
      option.onClick();
    }
    // Si es un link, la navegación se maneja por el navegador, no cerramos aquí
    if (!option.href) {
      setIsOpen(false); 
    }
  };

  // Contenido del menú dropdown
  const menuContent = (
    <div
      ref={dropdownRef}
      className="rounded-md shadow-lg bg-bg-content ring-1 ring-black ring-opacity-5 z-50"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        minWidth: position.width,
      }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1">
        {options.map((option, index) => {
          const commonClasses = "block w-full text-left px-4 py-2 text-sm text-text-base hover:bg-bg-subtle cursor-pointer";
          
          if (option.href) {
            return (
              <a
                key={index}
                href={option.href}
                onClick={() => handleOptionClick(option)} // Para cerrar si no es un link
                className={commonClasses}
                role="menuitem"
              >
                {option.label}
              </a>
            );
          } else {
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={commonClasses}
                role="menuitem"
              >
                {option.label}
              </button>
            );
          }
        })}
      </div>
    </div>
  );

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-bg-content text-text-base p-1 rounded-md shadow-sm border border-bg-subtle hover:bg-bg-subtle focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {buttonContent || <FiMoreVertical size={20} />}
      </button>

      {isOpen && ReactDOM.createPortal(menuContent, document.body)}
    </div>
  );
};