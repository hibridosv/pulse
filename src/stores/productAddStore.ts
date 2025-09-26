import { create } from 'zustand';
import { getServices, createService, deleteService, updateService } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


interface ProductAddStoreState {
  products: any | null;
  product: any | null;
  error: Error | null;
  loading: boolean;
  deleting: boolean;
  saving: boolean;
  loadProducts: (url: string) => Promise<void>;
  loadProduct: (url: string) => Promise<void>;
  createPrincipal: (data: any) => Promise<void>;
  createProduct: (data: any) => Promise<void>;
  deleteProduct: (url: string) => Promise<void>;
  savePrincipal: (url: string) => Promise<void>;
}

const productAddStore = create<ProductAddStoreState>((set) => ({
    products: null,
    product: null,
    loading: false,
    saving: false,
    error: null,
    deleting: false,
    loadProducts: async (url: string) => {
        set({ loading: true });
        try {
            const response = await getServices(url);
            set({ products: response.data.data, error: null });
        } catch (error) {
            console.error('Error fetching data:', error);
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
            console.error('Error fetching data:', error);
        } finally {
            set({ loading: false });
        }
    },


    createPrincipal: async (data) => {
        set({ loading: true });
        try {
            const response = await createService("registers/principal", data);
            set({ product: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },

    createProduct: async (data) => {
        set({ loading: true });
        try {
            const response = await createService("registers", data);
            set({ product: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async (url: string) => {
        set({ deleting: true });
        try {
            const response = await deleteService(url); 
            set({ product: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ deleting: false });
        }
    },

    savePrincipal: async (url: string) => {
        set({ saving: true });
        try {
            const response = await updateService(url, {}); 
            set({ product: null, error: null });
            useToastMessageStore.getState().setMessage(response);
            await productAddStore.getState().loadProducts(`registers/principal?sort=-created_at&included=provider,registers.product,employee&filter[status]=1&perPage=10`);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ saving: false });
        }
    },

}));

export default productAddStore;
