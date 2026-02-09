import { createService, getServices } from '@/services/services';
import { create } from 'zustand';
import useTempSelectedElementStore from '../tempSelectedElementStore';
import useToastMessageStore from '../toastMessageStore';


interface ordersProductsStoreI {
  orders: any | null;
  order: any | null;
  error: Error | null;
  loading: boolean;
  sending: boolean;
  saving: boolean;
  deleting: boolean;
  loadOrders: (url: string) => Promise<void>;
  loadOrder: (url: string, showToast?: boolean) => Promise<void>;
  payOrder: (url: string, data: any) => Promise<void>;
  saveOrder: (url: string, data: any) => Promise<void>;
  deleteOrder: (url: string, id: string) => Promise<void>;

}

const ordersProductsStore = create<ordersProductsStoreI>((set) => ({
  orders: null,
  order: null,
  error: null, 
  loading: false,
  sending: false,
  saving: false,
  deleting: false,

  loadOrders: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ orders: response.data.data, error: null });
    } catch (error) {
      set({ orders: null });
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    loadOrder: async (url: string, showToast: boolean = true) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ order: response.data.data, error: null });
    } catch (error) {
      if (showToast) {
        useToastMessageStore.getState().setError(error);
      }
      set({ order: null });
    } finally {
      set({ loading: false });
    }
  },


    payOrder: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            set({ order: null });
            useTempSelectedElementStore.getState().setSelectedElement("paymentSuccess", response.data.data);
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ sending: false });
        }
    },

    saveOrder: async (url, data) => {
        set({ saving: true });
        try {
            const response = await createService(url, data);
            set({ order: null, error: null});
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ saving: false });
        }
    },

  deleteOrder: async (url: string, id: string) => {
    // set({ deleting: true });
    // try {
    //   const response = await deleteService(url); 
    //   set((state: any) => {
    //     const updated = state.orders.data.filter((order: any) => order.id !== id);
    //     return {
    //       orders: {
    //         ...state.orders,
    //         data: updated,
    //       }
    //     };
    //   });
    //   useToastMessageStore.getState().setMessage(response);
    //   useTempSelectedElementStore.getState().clearSelectedElement("paymentPayableAdd");
    //   useModalStore.getState().closeModal("paymentPayableAdd");
    // } catch (error) {
    //   useToastMessageStore.getState().setError(error);
    // } finally {
    //   set({ deleting: false });
    // }
  },

  

}));

export default ordersProductsStore;
