import { createService, deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useModalStore from '../modalStorage';
import useTempSelectedElementStore from '../tempSelectedElementStore';
import useToastMessageStore from '../toastMessageStore';


interface AccountPayableStoreState {
  accounts: any | null;
  account: any | null;
  error: Error | null;
  loading: boolean;
  sending: boolean;
  deleting: boolean;
  loadAccounts: (url: string) => Promise<void>;
  loadAccount: (url: string) => Promise<void>;
  createAccount: (url: string, data: any) => Promise<void>;
  deleteAccount: (url: string, id: string) => Promise<void>;
  createPayment: (url: string, data: any) => Promise<void>;
  deletePayment: (url: string) => Promise<void>;
}

const useAccountPayableStore = create<AccountPayableStoreState>((set) => ({
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
      console.log("Fetched accounts payable:", response.data.data);
      set({ accounts: response.data.data, error: null });
    } catch (error) {
      set({ accounts: null });
      useToastMessageStore.getState().setError(error);
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


    createAccount: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            // set({ accounts: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ sending: false });
        }
    },

  deleteAccount: async (url: string, id: string) => {
    console.log("Deleting account payable with ID:", id);
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      set((state: any) => {
        const updated = state.accounts.data.filter((account: any) => account.id !== id);
        return {
          accounts: {
            ...state.accounts,
            data: updated,
          }
        };
      });
      useToastMessageStore.getState().setMessage(response);
      useTempSelectedElementStore.getState().clearSelectedElement("paymentPayableAdd");
      useModalStore.getState().closeModal("paymentPayableAdd");
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ deleting: false });
    }
  },

  createPayment: async (url, data) => {
        set({ sending: true });
        try {
            const response = await createService(url, data);
            useToastMessageStore.getState().setMessage(response);
            useTempSelectedElementStore.getState().setSelectedElement("paymentPayableAdd", response.data.data);
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
      useTempSelectedElementStore.getState().setSelectedElement("paymentPayableAdd", response.data.data);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ deleting: false });
    }
  },
  

}));

export default useAccountPayableStore;
