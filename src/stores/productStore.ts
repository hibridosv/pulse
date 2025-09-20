import { create } from 'zustand';
import { deleteService, getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


const useProductStore = create((set) => ({
  products: [],
  product: [],
  statistics: [],
  kardex: [],
  kardexDetails: [],
  error: [],
  loading: false,
  loadingStat: false,
  deleting: false,

  loadProducts: async (url: string) => {
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

    loadProduct: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ product: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

  loadStatistics: async (url: string) => {
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

  deleteProduct: async (url: string, id: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      set((state: any) => {
        const updatedProducts = state.products.data.filter((product: any) => product.id !== id);
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

  loadKardex: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ kardex: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    loadKardexDetails: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ kardexDetails: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

}));

export default useProductStore;
