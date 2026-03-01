import { getServices, createService, deleteService } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface LocationStoreState {
  locations: any;
  location: any;
  error: boolean;
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  loadLocations: (url?: string) => Promise<void>;
  createLocation: (data: any) => Promise<boolean>;
  deleteLocation: (id: number) => Promise<boolean>;
}

const useLocationStore = create<LocationStoreState>((set, get) => ({
  locations: null,
  location: null,
  error: false,
  loading: false,
  saving: false,
  deleting: false,
  loadLocations: async (url?: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url ?? 'locations');
      set({ locations: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },
  createLocation: async (data: any) => {
    set({ saving: true });
    try {
      await createService('locations', data);
      useToastMessageStore.getState().setMessage('Ubicación creada');
      await get().loadLocations();
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },
  deleteLocation: async (id: number) => {
    set({ deleting: true });
    try {
      await deleteService(`locations/${id}`);
      useToastMessageStore.getState().setMessage('Ubicación eliminada');
      await get().loadLocations();
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ deleting: false });
    }
  },
}));

export default useLocationStore;
