import { create } from 'zustand';
interface ToastMessageState {
  message: any | null;
  error: any | null;
  setMessage: (message: any) => void;
  clearMessage: () => void;
  setError: (error: any) => void;
  clearError: () => void;
}

const useToastMessageStore = create<ToastMessageState>((set) => ({
  message: null,
  error: null,
  setMessage: (message: any) => set({ message }),
  clearMessage: () => set({ message: null }),
  setError: (error: any) => set({ error }),
  clearError: () => set({ error: null }),
}));
export default useToastMessageStore;
