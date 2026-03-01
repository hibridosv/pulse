import { createService, deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface BrandStoreState {
  brands: any;
  brand: any;
  error: boolean;
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  loadBrands: (url?: string) => Promise<void>;
  createBrand: (data: any) => Promise<boolean>;
  deleteBrand: (id: number) => Promise<boolean>;
}

const useBrandsStore = create<BrandStoreState>((set, get) => ({
  brands: null,
  brand: null,
  error: false,
  loading: false,
  saving: false,
  deleting: false,
  loadBrands: async (url?: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url ?? 'brands');
      set({ brands: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },
  createBrand: async (data: any) => {
    set({ saving: true });
    try {
      const response = await createService('brands', data);
      useToastMessageStore.getState().setMessage(response);
      await get().loadBrands();
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },
  deleteBrand: async (id: number) => {
    set({ deleting: true });
    try {
      const response = await deleteService(`brands/${id}`);
      useToastMessageStore.getState().setMessage(response);
      await get().loadBrands();
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ deleting: false });
    }
  },
}));

export default useBrandsStore;
