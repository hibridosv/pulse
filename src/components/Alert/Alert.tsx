'use client';

import React, { useState } from 'react';

// --- Prop Types ---
type AlertType = 'info' | 'success' | 'danger' | 'warning' | 'dark';

export interface AlertProps {
  type?: AlertType;
  title?: string;
  text: string; // Changed from children
  isDismissible?: boolean;
  className?: string;
}

// --- Icon Components ---
const InfoIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
  </svg>
);

const SuccessIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
  </svg>
);

const DangerIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
    </svg>
);

const WarningIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.02-1.742 3.02H4.42c-1.532 0-2.492-1.686-1.742-3.02l5.58-9.92zM10 5a1 1 0 011 1v3a1 1 0 01-2 0V6a1 1 0 011-1zm1 5a1 1 0 10-2 0v2a1 1 0 102 0v-2z" clipRule="evenodd"></path>
    </svg>
);

const DismissIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
    </svg>
);


// --- Style and Icon Mapping ---
const alertStyles: { [key in AlertType]: { classes: string; icon: React.ReactNode } } = {
  info: {
    classes: 'bg-info/10 text-info border-info/20',
    icon: <InfoIcon />,
  },
  success: {
    classes: 'bg-success/10 text-success border-success/20',
    icon: <SuccessIcon />,
  },
  danger: {
    classes: 'bg-danger/10 text-danger border-danger/20',
    icon: <DangerIcon />,
  },
  warning: {
    classes: 'bg-warning/10 text-warning border-warning/20',
    icon: <WarningIcon />,
  },
  dark: {
    classes: 'bg-bg-subtle text-text-base border-bg-subtle',
    icon: <InfoIcon />,
  },
};

// --- Main Alert Component ---
export function Alert({ type = "success", title, text, isDismissible = false, className = '' }: AlertProps) {
  const [isOpen, setIsOpen] = useState(true); // Internal state for visibility
  const style = alertStyles[type];

  if (!isOpen) {
    return null; // The component hides itself
  }

  return (
    <div
      className={`p-2 text-sm rounded-lg border ${style.classes} ${className}`}
      role="alert"
    >
        <div className='flex items-center'>
            <span className="shrink-0 w-5 h-5 mr-2">{style.icon}</span>
            <span className="font-semibold text-base">{title}</span>
            <span className="ml-3 text-base">{text}</span>
        </div>

      {isDismissible && ( // Render based on the boolean prop
        <div className="ml-auto pl-3">
          <button
            type="button"
            className="-mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 inline-flex items-center justify-center h-8 w-8"
            onClick={() => setIsOpen(false)} // Internal logic to hide
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <DismissIcon />
          </button>
        </div>
      )}
    </div>
  );
}