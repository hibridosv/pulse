import { create } from 'zustand';
import { getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';



const useCutStore = create((set) => ({
  cuts: [],
  cut: [],
  error: [],
  loading: false,
  loadCuts: async (url) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ cuts: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    loadCut: async (url) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ cut: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },



}));

export default useCutStore;
