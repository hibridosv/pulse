import { deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface quotesStoreI {
  quotes: any | null;
  quote: any | null;
  error: boolean;
  loading: boolean;
  deleting?: boolean;
  loadQuotes: (url: string) => Promise<void>;
  loadQuote: (url: string) => Promise<void>;
  deleteQuote: (url: string) => Promise<void>;
}

const quotesStore = create<quotesStoreI>((set) => ({
  quotes: null,
  quote: null,
  error: false,
  loading: false,
  deleting: false,

  loadQuotes: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ quotes: response.data.data, error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

    loadQuote: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ quote: response.data.data, error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  deleteQuote: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      useToastMessageStore.getState().setMessage(response);
      set({ error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ deleting: false });
    }
  },

}));

export default quotesStore;
