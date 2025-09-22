import { create } from 'zustand';

interface State {
  loading: Record<string, boolean>; // Un objeto que guarda el estado de los modales por su ID
  openLoading: (loadingId: string) => void; // Función para abrir un modal
  closeLoading: (loadingId: string) => void; // Función para cerrar un modal
}

const useStateStore = create<State>((set) => ({
  loading: {},
  openLoading: (loadingId) => set((state) => ({ loading: { ...state.loading, [loadingId]: true } })),
  closeLoading: (loadingId) => set((state) => {
    const newLoading = { ...state.loading };
    delete newLoading[loadingId];
    return { loading: newLoading };
  }),
}));

export default useStateStore;