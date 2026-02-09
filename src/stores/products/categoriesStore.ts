import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface CategoryStoreState {
  categories: any; 
  category: any;
  error: boolean;
  loading: boolean;
  loadCategories: (url: string) => Promise<void>;
}

const useCategoriesStore = create<CategoryStoreState>((set) => ({
  categories: null,
  category: null,
  error: false,
  loading: false,
  loadCategories: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ categories: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useCategoriesStore;
