import { deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface ProductStoreState {
  products: any | null;
  product: any | null;
  statistics: any | null;
  kardex: any | null;
  kardexDetails: any | null;
  error: Error | null;
  loading: boolean;
  loadingStat: boolean;
  deleting: boolean;
  loadProducts: (url: string) => Promise<void>;
  loadProduct: (url: string) => Promise<void>;
  loadStatistics: (url: string) => Promise<void>;
  deleteProduct: (url: string, id: string) => Promise<void>;
  loadKardex: (url: string) => Promise<void>;
  loadKardexDetails: (url: string) => Promise<void>;
}

const useProductStore = create<ProductStoreState>((set) => ({
  products: null,
  product: null,
  statistics: null,
  kardex: null,
  kardexDetails: null,
  error: null,
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
