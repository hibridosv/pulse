import { createService, deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useTempSelectedElementStore from '../tempSelectedElementStore';
import useToastMessageStore from '../toastMessageStore';


interface accountReceivableStoreI {
  accounts: any | null;
  account: any | null;
  error: Error | null;
  loading: boolean;
  sending: boolean;
  deleting: boolean;
  loadAccounts: (url: string) => Promise<void>;
  loadAccount: (url: string) => Promise<void>;
  createPayment: (url: string, data: any) => Promise<void>;
  deletePayment: (url: string) => Promise<void>;
  checkIn: (url: string, data: any) => Promise<void>;
}

const accountReceivableStore = create<accountReceivableStoreI>((set) => ({
  accounts: null,
  account: null,
  error: null, 
  loading: false,
  sending: false,
  deleting: false,

  loadAccounts: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      console.log("account receivable store loadAccounts response:", response);
      set({ accounts: response.data.data, error: null });
    } catch (error) {
      set({ accounts: null });
    } finally {
      set({ loading: false });
    }
  },

    loadAccount: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ account: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


  createPayment: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            useToastMessageStore.getState().setMessage(response);
            useTempSelectedElementStore.getState().setSelectedElement("paymentReceivableAdd", response.data.data);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ sending: false });
        }
    },


    deletePayment: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      useToastMessageStore.getState().setMessage(response);
      useTempSelectedElementStore.getState().setSelectedElement("paymentReceivableAdd", response.data.data);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ deleting: false });
    }
  },

    checkIn: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            useToastMessageStore.getState().setMessage(response);
            useTempSelectedElementStore.getState().setSelectedElement("paymentReceivableAdd", response.data.data);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ sending: false });
        }
    },
  

}));

export default accountReceivableStore;
