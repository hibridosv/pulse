'use client';

import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { PopperContext } from './popperContext';

interface PopperProps {
  label: React.ReactNode;
  children: React.ReactNode;
  closeOnClick?: boolean;
}

const isTouchDevice = () =>
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const Popper: FC<PopperProps> = ({ label, children, closeOnClick = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = useCallback(() => {
    if (labelRef.current && popperRef.current) {
      const rect = labelRef.current.getBoundingClientRect();
      const popperHeight = popperRef.current.offsetHeight;
      const popperWidth = popperRef.current.offsetWidth;

      let newTop = rect.bottom + window.scrollY;
      if (newTop + popperHeight > window.innerHeight + window.scrollY) {
        newTop = rect.top + window.scrollY - popperHeight;
      }

      let newLeft = rect.right + window.scrollX - popperWidth;
      if (newLeft < 0) {
        newLeft = rect.left + window.scrollX;
      }

      setPosition({
        top: newTop,
        left: newLeft,
        width: rect.width,
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      return () => {
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isOpen, calculatePosition]);

  // Cerrar al tocar fuera en dispositivos táctiles
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideTouch = (e: TouchEvent | MouseEvent) => {
      if (
        popperRef.current && !popperRef.current.contains(e.target as Node) &&
        labelRef.current && !labelRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('touchstart', handleOutsideTouch);
    document.addEventListener('mousedown', handleOutsideTouch);
    return () => {
      document.removeEventListener('touchstart', handleOutsideTouch);
      document.removeEventListener('mousedown', handleOutsideTouch);
    };
  }, [isOpen]);

  const handleEnter = () => {
    if (isTouchDevice()) return;
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
    }
    setIsOpen(true);
  };

  const handleLeave = () => {
    if (isTouchDevice()) return;
    leaveTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  const menuContent = (
    <div
      ref={popperRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="rounded-md shadow-lg bg-bg-content ring-1 ring-black ring-opacity-5 z-50"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        minWidth: position.width,
      }}
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  );

  return (
    <div className="relative inline-block" onMouseLeave={handleLeave}>
      <div
        ref={labelRef}
        onMouseEnter={handleEnter}
        onClick={handleClick}
      >
        {label}
      </div>

      {isOpen && ReactDOM.createPortal(
        <PopperContext.Provider value={{ setIsOpen, closeOnClick }}>
          {menuContent}
        </PopperContext.Provider>,
        document.body
      )}
    </div>
  );
};
