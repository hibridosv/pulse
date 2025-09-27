import { create } from 'zustand';
import { getServices, createService, deleteService, updateService } from '@/services/services';
import useToastMessageStore from '../toastMessageStore';
import cashAccountStore from './cashAccountStore';



interface cashTransferStoreI {
  transfers: any | null;
  error: Error | null;
  loading: boolean;
  sending: boolean;
  deleting: boolean;
  loadTransfers: (url: string) => Promise<void>;
  createTransfer: (data: any) => Promise<void>;
  deleteTransfer: (url: string) => Promise<void>;
}

const cashTransferStore = create<cashTransferStoreI>((set) => ({
    transfers: null,
    error: null,
    loading: false,
    sending: false,
    deleting: false,
    loadTransfers: async (url: string) => {
        set({ loading: true });
        try {
            const response = await getServices(url);
            set({ transfers: response.data.data, error: null });
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },

    createTransfer: async (data) => {
        set({ sending: true });
        try {
            const response = await createService("cash/transfers", data);
            set({ transfers: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
            cashAccountStore.getState().loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ sending: false });
        }
    },

    
    deleteTransfer: async (url: string) => {
        set({ deleting: true });
        try {
            const response = await deleteService(url); 
            set({ transfers: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
            cashAccountStore.getState().loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ deleting: false });
        }
    },

}));

export default cashTransferStore;
