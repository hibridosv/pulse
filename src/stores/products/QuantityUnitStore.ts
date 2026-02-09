import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface QuantityUnitStoreState {
  quantityUnits: any; 
  quantityUnit: any; 
  error: boolean;
  loading: boolean;
  loadQuantityUnits: (url: string) => Promise<void>;
}

const useQuantityUnitStore = create<QuantityUnitStoreState>((set) => ({
  quantityUnits: null,
  quantityUnit: null,
  error: false,
  loading: false,
  loadQuantityUnits: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ quantityUnits: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useQuantityUnitStore;
