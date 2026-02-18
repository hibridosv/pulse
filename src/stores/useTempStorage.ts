import { create } from 'zustand';

interface TempSelectedElementState {
  elements: Record<string, any>;
  setElement: (id: string, element: any) => void;
  clearElement: (id?: string) => void;
  getElement: (id: string) => any | undefined;
}

const useTempSelectedElementStore = create<TempSelectedElementState>((set, get) => ({
  elements: {},
  setElement: (id, element) =>
    set((state) => ({
      elements: {
        ...state.elements,
        [id]: element,
      },
    })),
  clearElement: (id) =>
    set((state) => {
      if (id) {
        const newElements = { ...state.elements };
        delete newElements[id];
        return { elements: newElements };
      } else {
        return { elements: {} }; // Clear all if no id is provided
      }
    }),
  getElement: (id) => get().elements[id],
}));

export default useTempSelectedElementStore;
