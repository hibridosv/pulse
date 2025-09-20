import { create } from 'zustand';
import { getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


interface ContactStoreState {
  contacts: any; 
  contact: any; 
  error: Error | null;
  loading: boolean;
  loadContacts: (url: string) => Promise<void>;
}

const useContactStore = create<ContactStoreState>((set) => ({
  contacts: null,
  contact: null,
  error: null,
  loading: false,
  loadContacts: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ contacts: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useContactStore;
