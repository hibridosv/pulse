import { deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface adjustStoreI {
  adjustments: any | null;
  adjustment: any | null;
  error: Error | null;
  loading: boolean;
  loadingAdjustment: boolean;
  deleting?: boolean;
  loadAdjustments: (url: string) => Promise<void>;
  loadAdjustment: (url: string) => Promise<void>;
  deleteAdjust: (url: string) => Promise<void>;
}

const adjustStore = create<adjustStoreI>((set) => ({
  adjustments: null,
  adjustment: null,
  error: null,
  loading: false,
  loadingAdjustment: false,
  deleting: false,

  loadAdjustments: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ adjustments: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    loadAdjustment: async (url: string) => {
    set({ loadingAdjustment: true });
    try {
      const response = await getServices(url);
      set({ adjustment: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loadingAdjustment: false });
    }
  },

  deleteAdjust: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      useToastMessageStore.getState().setMessage(response);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ deleting: false });
    }
  },

}));

export default adjustStore;
