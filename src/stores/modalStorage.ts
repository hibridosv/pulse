import { create } from 'zustand';

// Definimos los tipos para el estado y las acciones.
interface ModalState {
  modals: Record<string, boolean>; // Un objeto que guarda el estado de los modales por su ID
  openModal: (modalId: string) => void; // Función para abrir un modal
  closeModal: (modalId: string) => void; // Función para cerrar un modal
}

// Creamos el storage de Zustand con los tipos definidos.
const useModalStore = create<ModalState>((set) => ({
  modals: {},
  openModal: (modalId) => set((state) => ({ modals: { ...state.modals, [modalId]: true } })),
  closeModal: (modalId) => set((state) => {
    const newModals = { ...state.modals };
    delete newModals[modalId];
    return { modals: newModals };
  }),
}));

export default useModalStore;
