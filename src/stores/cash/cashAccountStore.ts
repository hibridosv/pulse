import { create } from 'zustand';
import { getServices, createService, deleteService, updateService } from '@/services/services';
import useToastMessageStore from '../toastMessageStore';



interface cashAccountStoreProps {
  accounts: any | null;
  error: Error | null;
  loading: boolean;
  deleting: boolean;
  loadAccount: (url: string) => Promise<void>;
  createAccount: (data: any) => Promise<void>;
  deleteAccount: (url: string) => Promise<void>;
}

const cashAccountStore = create<cashAccountStoreProps>((set) => ({
    accounts: null,
    error: null,
    loading: false,
    deleting: false,
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
        set({ loading: true });
        try {
            const response = await createService("removes", data);
            set({ accounts: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
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

}));

export default cashAccountStore;
