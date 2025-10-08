'use client';

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, FC } from 'react';
import ReactDOM from 'react-dom';
import { FiChevronDown } from 'react-icons/fi'; // Cambiado a FiChevronDown para un botón de dropdown
import { DropdownContext } from './dropdownContext';

interface DropdownProps {
  label: React.ReactNode; // Texto para el botón que abre el dropdown
  children: React.ReactNode; // Los DropdownItems y DropdownDividers
}

export const Dropdown: FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref para el menú dropdown
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref para el botón que activa el dropdown
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Calcula la posición del dropdown
  const calculatePosition = useCallback(() => {
    if (buttonRef.current && dropdownRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight; // Altura real del menú
      const dropdownWidth = dropdownRef.current.offsetWidth; // Ancho real del menú

      let newTop;
      const spaceAbove = rect.top;

      // Si no hay espacio arriba para mostrar el dropdown, muéstralo debajo del botón.
      if (spaceAbove < dropdownHeight) {
        newTop = rect.bottom + window.scrollY;
      } else {
        // Si hay espacio, muéstralo arriba.
        newTop = rect.top + window.scrollY - dropdownHeight;
      }

      let newLeft = rect.right + window.scrollX - dropdownWidth; // Posición a la izquierda

      setPosition({
        top: newTop,
        left: newLeft,
        width: rect.width, 
      });
    }
  }, []); // 'isOpen' eliminado

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
  useLayoutEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
    }
    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, calculatePosition]);

  // Contenido del menú dropdown
  const menuContent = (
    <div
      ref={dropdownRef}
      className="rounded-md shadow-lg bg-bg-content ring-1 ring-black ring-opacity-5 z-50"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        minWidth: position.width, // Asegura que el menú no sea más estrecho que el botón
      }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  );

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-bg-content text-text-base p-1 rounded-md shadow-sm border border-bg-subtle hover:bg-bg-subtle focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center gap-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label} <FiChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && ReactDOM.createPortal(
        <DropdownContext.Provider value={{ setIsOpen }}>
          {menuContent}
        </DropdownContext.Provider>
      , document.body)}
    </div>
  );
};
