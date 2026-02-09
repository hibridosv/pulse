import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface BrandStoreState {
  brands: any; 
  brand: any;
  error: boolean;
  loading: boolean;
  loadBrands: (url: string) => Promise<void>;
}

const useBrandsStore = create<BrandStoreState>((set) => ({
  brands: null,
  brand: null,
  error: false,
  loading: false,
  loadBrands: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ brands: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useBrandsStore;
