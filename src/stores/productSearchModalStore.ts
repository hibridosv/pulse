import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from './toastMessageStore';


interface productSearchModalStoreI {
  products: any | null;
  product: any | null;
  error: boolean;
  loading: boolean;

  loadProducts: (url: string) => Promise<void>;
  loadProduct: (url: string) => Promise<void>;
}

const productSearchModalStore = create<productSearchModalStoreI>((set) => ({
  products: null,
  product: null,
  error: false,
  loading: false,

  loadProducts: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ products: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    loadProduct: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ product: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default productSearchModalStore;
