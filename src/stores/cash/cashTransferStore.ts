import { createService, deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';
import cashAccountStore from './cashAccountStore';



interface cashTransferStoreI {
  transfers: any | null;
  history: any | null;
  error: boolean;
  loading: boolean;
  sending: boolean;
  deleting: boolean;
  loadTransfers: (url: string) => Promise<void>;
  createTransfer: (data: any) => Promise<void>;
  deleteTransfer: (url: string) => Promise<void>;
  loadHistory: (url: string) => Promise<void>;
}

const cashTransferStore = create<cashTransferStoreI>((set) => ({
    transfers: null,
    history: null,
    error: false,
    loading: false,
    sending: false,
    deleting: false,
    loadTransfers: async (url: string) => {
        set({ loading: true });
        try {
            const response = await getServices(url);
            set({ transfers: response.data.data, error: false });
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true})
        } finally {
            set({ loading: false });
        }
    },

    createTransfer: async (data) => {
        set({ sending: true });
        try {
            const response = await createService("cash/transfers", data);
            set({ transfers: response.data.data, error: false });
            useToastMessageStore.getState().setMessage(response);
            cashAccountStore.getState().loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true})
        } finally {
            set({ sending: false });
        }
    },

    
    deleteTransfer: async (url: string) => {
        set({ deleting: true });
        try {
            const response = await deleteService(url); 
            set({ transfers: response.data.data, error: false });
            useToastMessageStore.getState().setMessage(response);
            cashAccountStore.getState().loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true})
        } finally {
            set({ deleting: false });
        }
    },

    
    loadHistory: async (url: string) => {
        set({ loading: true });
        try {
            const response = await getServices(url);
            set({ history: response.data.data, error: false });
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true})
        } finally {
            set({ loading: false });
        }
    },

}));

export default cashTransferStore;
