import { create } from 'zustand';
import { deleteService, getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';
import useModalStore from './modalStorage';




const useProductStore = create((set) => ({
  products: [],
  statistics: [],
  product: [],
  error: [],
  loading: false,
  loadingStat: false,
  deleting: false,

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

  deleteProduct: async (url, id) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      set((state) => {
        const updatedProducts = state.products.data.filter((product) => product.id !== id);
        return {
          products: {
            ...state.products,
            data: updatedProducts,
          }
        };
      });
      useToastMessageStore.getState().setMessage(response);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ deleting: false });
    }
  },

}));

export default useProductStore;
