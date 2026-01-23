import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface quotesStoreI {
  quotes: any | null;
  quote: any | null;
  error: Error | null;
  loading: boolean;
  loadQuotes: (url: string) => Promise<void>;
  loadQuote: (url: string) => Promise<void>;
}

const quotesStore = create<quotesStoreI>((set) => ({
  quotes: null,
  quote: null,
  error: null,
  loading: false,

  loadQuotes: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ quotes: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    loadQuote: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ quote: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

}));

export default quotesStore;
