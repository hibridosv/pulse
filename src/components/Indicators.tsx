'use client';

import React from 'react';

// --- Prop Types ---
type IndicatorType = 'success' | 'info' | 'danger' | 'warning' | 'dark' | 'inactive';

export interface IndicatorProps {
  type?: IndicatorType;
  text?: string;
  className?: string;
}

// --- Style Mapping ---
const indicatorStyles: { [key in IndicatorType]: { dot: string; text: string } } = {
  success: {
    dot: 'bg-success',
    text: 'text-text-base',
  },
  info: {
    dot: 'bg-info',
    text: 'text-text-base',
  },
  danger: {
    dot: 'bg-danger',
    text: 'text-text-base',
  },
  warning: {
    dot: 'bg-warning',
    text: 'text-text-base',
  },
  dark: {
    dot: 'bg-text-base',
    text: 'text-text-base',
  },
  inactive: {
    dot: 'bg-bg-subtle',
    text: 'text-text-muted',
  },
};

// --- Main Indicator Component ---
export function Indicator({ type = "success", text = "", className = '' }: IndicatorProps) {
  const style = indicatorStyles[type];

  if (!style) return null; // Return null if type is invalid

  return (
    <span className={`inline-flex items-center text-sm font-medium ${style.text} ${className}`}>
      <span className={`flex w-2.5 h-2.5 rounded-full me-1.5 shrink-0 ${style.dot}`}></span>
      {text}
    </span>
  );
}