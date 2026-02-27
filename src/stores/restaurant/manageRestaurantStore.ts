import { createService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface manageRestaurantStoreI {
  categories: any; 
  category: any;
  options: any;
  workStations: any;
  productAdded: any;
  error: boolean;
  loading: boolean;
  sending: boolean;
  loadCategories: (url: string) => Promise<void>;
  loadOptions: (url: string) => Promise<void>;
  loadWorkStations: (url: string) => Promise<void>;
  addProduct: (url: string, data: any) => Promise<boolean>;
}

const manageRestaurantStore = create<manageRestaurantStoreI>((set) => ({
  categories: null,
  category: null,
  options: null,
  workStations: null,
  productAdded: null,
  error: false,
  loading: false,
  sending: false,
  loadCategories: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ categories: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },
  loadOptions: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ options: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },
  loadWorkStations: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ workStations: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    addProduct: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            set({ productAdded: response.data.data, error: false });
            useToastMessageStore.getState().setMessage(response);
            return true;
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
            return false;
        } finally {
            set({ sending: false });
        }
    },

  

}));

export default manageRestaurantStore;
