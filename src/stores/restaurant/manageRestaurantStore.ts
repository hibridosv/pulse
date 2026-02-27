import { createService, deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface manageRestaurantStoreI {
  products: any;
  categories: any; 
  category: any;
  options: any;
  workStations: any;
  productAdded: any;
  error: boolean;
  loadingCategories: boolean;
  loadingOptions: boolean;
  loadingWorkStations: boolean;
  loadingProducts: boolean;
  sending: boolean;
  deleting: boolean;
  loadProducts: (url: string) => Promise<void>;
  loadCategories: (url: string) => Promise<void>;
  deleteCategory: (url: string) => Promise<void>;
  loadOptions: (url: string) => Promise<void>;
  deleteOption: (url: string) => Promise<void>;
  loadWorkStations: (url: string) => Promise<void>;
  addProduct: (url: string, data: any) => Promise<boolean>;
  addCategory: (url: string, data: any) => Promise<boolean>;
  addOption: (url: string, data: any) => Promise<boolean>;
}

const manageRestaurantStore = create<manageRestaurantStoreI>((set) => ({
  products: null,
  categories: null,
  category: null,
  options: null,
  workStations: null,
  productAdded: null,
  error: false,
  loadingCategories: false,
  loadingOptions: false,
  loadingWorkStations: false,
  loadingProducts: false,
  sending: false,
  deleting: false,
  loadProducts: async (url: string) => {
    set({ loadingProducts: true });
    try {
      const response = await getServices(url);
      set({ products: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loadingProducts: false });
    }
  },
  loadCategories: async (url: string) => {
    set({ loadingCategories: true });
    try {
      const response = await getServices(url);
      set({ categories: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loadingCategories: false });
    }
  },
  deleteCategory: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      manageRestaurantStore.getState().loadCategories("categories?sort=created_at&filterWhere[category_type]==2&filterWhere[is_restaurant]==1");
      useToastMessageStore.getState().setMessage(response);
      set({ error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ deleting: false });
    }
  },
  loadOptions: async (url: string) => {
    set({ loadingOptions: true });
    try {
      const response = await getServices(url);
      set({ options: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loadingOptions: false });
    }
  },
  deleteOption: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      manageRestaurantStore.getState().loadOptions("restaurant/options?included=variants");
      useToastMessageStore.getState().setMessage(response);
      set({ error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ deleting: false });
    }
  },
  loadWorkStations: async (url: string) => {
    set({ loadingWorkStations: true });
    try {
      const response = await getServices(url);
      set({ workStations: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loadingWorkStations: false });
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
  addCategory: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            set({ error: false });
            manageRestaurantStore.getState().loadCategories("categories?sort=created_at&filterWhere[category_type]==2&filterWhere[is_restaurant]==1");
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
  addOption: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            set({ error: false });
            manageRestaurantStore.getState().loadOptions("restaurant/options?included=variants");
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
