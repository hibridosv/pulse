import { create } from 'zustand';
import { getServices, createService, deleteService, updateService } from '@/services/services';
import useToastMessageStore from '../toastMessageStore';



interface cashAccountStoreProps {
  accounts: any | null;
  error: Error | null;
  loading: boolean;
  sending: boolean;
  deleting: boolean;
  transfering: boolean;
  loadAccount: (url: string) => Promise<void>;
  createAccount: (data: any) => Promise<void>;
  deleteAccount: (url: string) => Promise<void>;
  transferAccount: (data: any) => Promise<void>;
}

const cashAccountStore = create<cashAccountStoreProps>((set) => ({
    accounts: null,
    error: null,
    loading: false,
    sending: false,
    deleting: false,
    transfering: false,
    loadAccount: async (url: string) => {
        set({ loading: true });
        try {
            const response = await getServices(url);
            set({ accounts: response.data.data, error: null });
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },

    createAccount: async (data) => {
        set({ sending: true });
        try {
            const response = await createService("cash/accounts", data);
            set({ accounts: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ sending: false });
        }
    },

    
    deleteAccount: async (url: string) => {
        set({ deleting: true });
        try {
            const response = await deleteService(url); 
            set({ accounts: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ deleting: false });
        }
    },

    transferAccount: async (data) => {
        set({ transfering: true });
        try {
            const response = await createService("cash/accounts/transfer", data);
            set({ accounts: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ transfering: false });
        }
    },

}));

export default cashAccountStore;
