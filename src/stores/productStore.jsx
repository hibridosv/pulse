import { create } from 'zustand';
import { deleteService, getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';




const useProductStore = create((set) => ({
  products: [],
  product: [],
  error: [],
  loading: false,
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



}));

export default useProductStore;
