import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface ProductLinkedStoreState {
  products: any | null;
  error: Error | null;
  loading: boolean;
  productId: string | null;
  loadProducts: (url: string) => Promise<void>;
}

const useProductLinkedStore = create<ProductLinkedStoreState>((set) => ({
  products: null,
  loading: false,
  error: null,
  productId: null,
  loadProducts: async (id: string) => {
    let url = `products/${id}/linked`;
    set({ loading: true });
    try {
        const response = await getServices(url);
        set({ products: response.data.data, error: null });
        set({ productId: id });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

}));

export default useProductLinkedStore;
