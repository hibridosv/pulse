import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface purchasesStoreI {
  purchases: any; 
  error: boolean;
  loading: boolean;
  loadPurchases: (url: string) => Promise<boolean>;
}

const purchasesStore = create<purchasesStoreI>((set) => ({
  purchases: null,
  error: false,
  loading: false,
  loadPurchases: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ purchases: response.data.data, error: false });
      return true;
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

}));

export default purchasesStore;
