import { create } from 'zustand';
import { getServices, createService } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


interface ProductRemovedStoreState {
  products: any | null;
  product: any | null;
  error: Error | null;
  loading: boolean;
  loadProducts: (url: string) => Promise<void>;
  loadProduct: (url: string) => Promise<void>;
  createPrincipal: (data: any) => Promise<void>;
}

const productRemovedStore = create<ProductRemovedStoreState>((set) => ({
    products: null,
    product: null,
    loading: false,
    error: null,
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
            console.log("Response: ", response);
            set({ product: response.data.data, error: null });
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },


    createPrincipal: async (data) => {
        set({ loading: true });
        try {
            const response = await createService("removes", data);
            console.log("Response: ", response);
            set({ product: response.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },

}));

export default productRemovedStore;
