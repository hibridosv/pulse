import { create } from 'zustand';

// Define un tipo de unión para el elemento seleccionado
type SelectedElement = any | null;

interface SelectedElementState {
  elementSelected: SelectedElement;
  setElement: (element: SelectedElement) => void; // Para establecer cualquier tipo
  clearElement: () => void; // Para limpiar/resetear
}

const useSelectedElementStore = create<SelectedElementState>((set) => ({
  elementSelected: null, // Inicializamos con null para reflejar que puede ser cualquier tipo o ninguno
  
  setElement: (element) => {
    set({ elementSelected: element });
  },
  
  clearElement: () => {
    set({ elementSelected: null }); // Reseteamos a null para consistencia
  },
}));

export default useSelectedElementStore;