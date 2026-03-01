import { getServices, updateService } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface QuantityUnitStoreState {
  quantityUnits: any;
  quantityUnit: any;
  error: boolean;
  loading: boolean;
  loadQuantityUnits: (url?: string) => Promise<void>;
  updateQuantityUnit: (id: number, data: any) => Promise<boolean>;
}

const useQuantityUnitStore = create<QuantityUnitStoreState>((set, get) => ({
  quantityUnits: null,
  quantityUnit: null,
  error: false,
  loading: false,
  loadQuantityUnits: async (url?: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url ?? 'quantityunits');
      set({ quantityUnits: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },
  updateQuantityUnit: async (id: number, data: any) => {
    try {
      await updateService(`quantityunits/${id}`, data);
      useToastMessageStore.getState().setMessage('Unidad actualizada');
      await get().loadQuantityUnits();
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    }
  },
}));

export default useQuantityUnitStore;
