import { create } from 'zustand';
import { getServices, createService, updateService, deleteService } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


const useCashDrawerStore = create((set) => ({
  cashDrawers: [],
  error: [],
  loading: false,
  loadCashDrawers: async (url) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ cashDrawers: response.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },



}));

export default useCashDrawerStore;
