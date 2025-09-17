import { create } from 'zustand';
import { deleteService, getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';




const useProductStore = create((set) => ({
  products: [],
  statistics: [],
  product: [],
  error: [],
  loading: false,
  loadingStat: false,

  loadProducts: async (url) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ products: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

  loadStatistics: async (url) => {
    set({ loadingStat: true });
    try {
      const response = await getServices(url);
      set({ statistics: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loadingStat: false });
    }
  },

}));

export default useProductStore;
