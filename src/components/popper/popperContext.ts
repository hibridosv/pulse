import { createContext, useContext } from 'react';

interface PopperContextType {
  setIsOpen: (isOpen: boolean) => void;
  closeOnClick: boolean;
}

export const PopperContext = createContext<PopperContextType | undefined>(undefined);

export const usePopper = () => {
  const context = useContext(PopperContext);
  if (!context) {
    throw new Error('usePopper must be used within a Popper component');
  }
  return context;
};
