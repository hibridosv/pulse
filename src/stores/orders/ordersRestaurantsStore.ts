import { Order } from '@/interfaces/order';
import { errorSound, successSound } from '@/lib/config/config';
import { createService, deleteService, getServices, updateService } from '@/services/services';
import { create } from 'zustand';
import useModalStore from '../modalStorage';
import useTempSelectedElementStore from '../tempSelectedElementStore';
import useToastMessageStore from '../toastMessageStore';


interface ordersRestaurantsStoreI {
  orders: any | null;
  order: any | null;
  lastResponse: any | null;
  error: boolean;
  loading: boolean;
  sending: boolean;
  saving: boolean;
  collecting: boolean;
  deleting: boolean;
  addOrder: (url: string, data: any) => Promise<void>;
  loadOrders: (url: string, showToast?: boolean) => Promise<void>;
  loadOrder: (url: string, showToast?: boolean) => Promise<void>;
  payOrder: (url: string, data: any) => Promise<void>;
  saveOrder: (url: string, data: any) => Promise<void>;
  deleteOrder: (url: string) => Promise<void>;
  updateOrder: (url: string, data: any, showToast?: boolean) => Promise<void>;
  saveAs: (url: string, data: any) => Promise<void>;
  deleteProduct: (url: string) => Promise<void>;
  setOrders: (orders: Order[]) => void;
}

const ordersRestaurantsStore = create<ordersRestaurantsStoreI>((set) => ({
  orders: null,
  order: null,
  lastResponse: null,
  error: false, 
  loading: false,
  sending: false,
  saving: false,
  collecting: false,
  deleting: false,


  addOrder: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            if (response.status == 200) {
              set({ order: response.data.data, error: false });
              successSound()
            } else {
              set({ order: null, error: false });
              ordersRestaurantsStore.getState().loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
            }
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
            errorSound();
        } finally {
            set({ sending: false });
        }
    },


  loadOrders: async (url: string, showToast: boolean = true) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ orders: response.data.data, error: false });
    } catch (error) {
      set({ orders: null });
      if (showToast) {
      useToastMessageStore.getState().setError(error);
      }
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  loadOrder: async (url: string, showToast: boolean = true) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ order: response.data.data, error: false });
    } catch (error) {
      if (showToast) {
        useToastMessageStore.getState().setError(error);
      }
      set({ order: null });
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },


  payOrder: async (url, data) => {
        set({ collecting: true });
        useModalStore.getState().openModal('paymentSuccess');
        try {
            const response = await createService(url, data);
            set({ order: null, error: false, lastResponse: response.data.data });
            useTempSelectedElementStore.getState().setSelectedElement("paymentSuccess", response.data.data);
            ordersRestaurantsStore.getState().loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            useModalStore.getState().closeModal('paymentSuccess');
            set({ error: true });
        } finally {
            set({ collecting: false });
        }
    },

  saveOrder: async (url, data) => {
        set({ saving: true });
        try {
            const response = await updateService(url, data);
            set({ order: response.data.data, error: false });
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
        } finally {
            set({ saving: false });
        }
    },

  deleteOrder: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      set({ order: null, error: false});
      ordersRestaurantsStore.getState().loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
      useToastMessageStore.getState().setMessage(response);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ deleting: false });
    }
  },

  updateOrder: async (url, data, showToast: boolean = true) => {
        set({ sending: true });
        try {
            const response = await updateService(url, data);
            set({ order: response.data.data, error: false });
            if (showToast) {
              useToastMessageStore.getState().setMessage(response);
            }
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
        } finally {
            set({ sending: false });
        }
    },

  saveAs: async (url, data) => {
        set({ sending: true });

    },

  deleteProduct: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      if (response.status == 200) {
        set({ order: response.data.data, error: false });        
      } else {
        set({ order: null, error: false});
        ordersRestaurantsStore.getState().loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
      }
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ deleting: false });
    }
  },

  
  setOrders: async (orders: any) => {
    set({ orders });
  },

}));

export default ordersRestaurantsStore;
