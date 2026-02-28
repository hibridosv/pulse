import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';

interface RestaurantOrdersStoreI {
  orders: any | null;
  error: boolean;
  loading: boolean;

  loadOrders: (url: string) => Promise<void>;
}

const restaurantOrdersStore = create<RestaurantOrdersStoreI>((set) => ({
  orders: null,
  error: false,
  loading: false,

  loadOrders: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ orders: response.data.data, error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));

export default restaurantOrdersStore;
