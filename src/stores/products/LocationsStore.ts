import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface LocationStoreState {
  locations: any; 
  location: any; 
  error: boolean;
  loading: boolean;
  loadLocations: (url: string) => Promise<void>;
}

const useLocationStore = create<LocationStoreState>((set) => ({
  locations: null,
  location: null,
  error: false,
  loading: false,
  loadLocations: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ locations: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useLocationStore;
