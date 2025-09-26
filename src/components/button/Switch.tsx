'use client';

import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  name?: string;
  disabled?: boolean;
  sizing?: 'sm' | 'md' | 'lg';
  className?: string;
  labelPlacement?: 'left' | 'right';
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  name,
  disabled = false,
  sizing = 'md',
  className = '',
  labelPlacement = 'right',
}) => {
  const sizeClasses = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'after:h-4 after:w-4',
      translate: 'peer-checked:after:translate-x-full',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'after:h-5 after:w-5',
      translate: 'peer-checked:after:translate-x-full',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'after:h-6 after:w-6 after:top-[2px]',
      translate: 'peer-checked:after:translate-x-full',
    },
  };

  const selectedSize = sizeClasses[sizing];

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const labelSpan = (
    <span
      className={`text-sm font-medium text-text-base ${
        labelPlacement === 'right' ? 'ms-3' : 'me-3'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      {label}
    </span>
  );

  return (
    <label
      className={`inline-flex items-center ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {labelPlacement === 'left' && labelSpan}
      <input
        type="checkbox"
        name={name}
        className="sr-only peer"
        checked={checked}
        onChange={handleOnChange}
        disabled={disabled}
      />
      <div
        className={`
          relative rounded-full 
          bg-bg-subtle
          peer-focus:outline-none 
          peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary/50 peer-focus:ring-offset-bg-base
          peer-checked:after:border-white 
          after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
          after:bg-white after:border-bg-subtle after:border after:rounded-full 
          after:transition-all 
          peer-checked:bg-primary
          ${selectedSize.track}
          ${selectedSize.thumb}
          ${selectedSize.translate}
          ${disabled ? 'opacity-50' : ''}
        `}
      ></div>
      {labelPlacement === 'right' && labelSpan}
    </label>
  );
};

Switch.displayName = 'Switch';