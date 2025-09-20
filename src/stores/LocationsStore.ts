import { create } from 'zustand';
import { getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


interface LocationStoreState {
  locations: any; 
  location: any; 
  error: Error | null;
  loading: boolean;
  loadLocations: (url: string) => Promise<void>;
}

const useLocationStore = create<LocationStoreState>((set) => ({
  locations: null,
  location: null,
  error: null,
  loading: false,
  loadLocations: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ locations: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useLocationStore;
