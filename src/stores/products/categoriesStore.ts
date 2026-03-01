import { createService, deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';

const CATEGORIES_URL = 'categories?sort=-created_at&included=subcategories&filterWhere[category_type]==1&filterWhere[is_restaurant]==0';

interface CategoryStoreState {
  categories: any;
  category: any;
  error: boolean;
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  loadCategories: (url?: string) => Promise<void>;
  createCategory: (data: any) => Promise<boolean>;
  deleteCategory: (id: number) => Promise<boolean>;
}

const useCategoriesStore = create<CategoryStoreState>((set, get) => ({
  categories: null,
  category: null,
  error: false,
  loading: false,
  saving: false,
  deleting: false,
  loadCategories: async (url?: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url ?? CATEGORIES_URL);
      set({ categories: response.data.data, error: false });
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },
  createCategory: async (data: any) => {
    set({ saving: true });
    try {
      const response = await createService('categories', data);
      useToastMessageStore.getState().setMessage(response);
      await get().loadCategories();
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },
  deleteCategory: async (id: number) => {
    set({ deleting: true });
    try {
      await deleteService(`categories/${id}`);
      useToastMessageStore.getState().setMessage('Categoría eliminada');
      await get().loadCategories();
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ deleting: false });
    }
  },
}));

export default useCategoriesStore;
