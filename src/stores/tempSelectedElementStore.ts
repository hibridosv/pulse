import { create } from 'zustand';

interface TempSelectedElementState {
  elements: Record<string, any>;
  setSelectedElement: (id: string, element: any) => void;
  clearSelectedElement: (id?: string) => void;
  getSelectedElement: (id: string) => any | undefined;
}

const useTempSelectedElementStore = create<TempSelectedElementState>((set, get) => ({
  elements: {},
  setSelectedElement: (id, element) =>
    set((state) => ({
      elements: {
        ...state.elements,
        [id]: element,
      },
    })),
  clearSelectedElement: (id) =>
    set((state) => {
      if (id) {
        const newElements = { ...state.elements };
        delete newElements[id];
        return { elements: newElements };
      } else {
        return { elements: {} }; // Clear all if no id is provided
      }
    }),
  getSelectedElement: (id) => get().elements[id],
}));

export default useTempSelectedElementStore;
