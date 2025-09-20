import { create } from 'zustand';
import { getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


interface BrandStoreState {
  brands: any; 
  brand: any;
  error: Error | null;
  loading: boolean;
  loadBrands: (url: string) => Promise<void>;
}

const useBrandsStore = create<BrandStoreState>((set) => ({
  brands: null,
  brand: null,
  error: null,
  loading: false,
  loadBrands: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ brands: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useBrandsStore;
