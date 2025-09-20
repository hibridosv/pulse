import { create } from 'zustand';
import { getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


interface QuantityUnitStoreState {
  quantityUnits: any; 
  quantityUnit: any; 
  error: Error | null;
  loading: boolean;
  loadQuantityUnits: (url: string) => Promise<void>;
}

const useQuantityUnitStore = create<QuantityUnitStoreState>((set) => ({
  quantityUnits: null,
  quantityUnit: null,
  error: null,
  loading: false,
  loadQuantityUnits: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ quantityUnits: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useQuantityUnitStore;
