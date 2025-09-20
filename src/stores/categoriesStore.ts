import { create } from 'zustand';
import { getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


interface CategoryStoreState {
  categories: any; 
  category: any;
  error: Error | null;
  loading: boolean;
  loadCategories: (url: string) => Promise<void>;
}

const useCategoriesStore = create<CategoryStoreState>((set) => ({
  categories: null,
  category: null,
  error: null,
  loading: false,
  loadCategories: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ categories: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useCategoriesStore;
