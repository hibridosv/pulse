import { create } from 'zustand';
const useToastMessageStore = create((set) => ({
  message: null,
  error: null,
  setMessage: (message: any) => set({ message }),
  clearMessage: () => set({ message: null }),
  setError: (error: any) => set({ error }),
  clearError: () => set({ error: null }),
}));
export default useToastMessageStore;
