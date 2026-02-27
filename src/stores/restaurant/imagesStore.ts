import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface imagesStoreI {
  images: any; 
  error: boolean;
  loading: boolean;
  loadImages: (url: string) => Promise<void>;
}

const imagesStore = create<imagesStoreI>((set) => ({
  images: null,
  error: false,
  loading: false,
  loadImages: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ images: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

}));

export default imagesStore;
