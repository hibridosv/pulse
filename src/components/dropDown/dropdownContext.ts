import React from 'react';

interface DropdownContextType {
  setIsOpen: (isOpen: boolean) => void;
}

export const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);
