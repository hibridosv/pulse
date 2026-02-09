import { createService, deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';



interface cashRemittancesStoreProps {
  remittances: any | null;
  error: boolean;
  loading: boolean;
  sending: boolean;
  deleting: boolean;
  loadRemittances: (url: string) => Promise<void>;
  createRemittance: (data: any) => Promise<void>;
  deleteRemittance: (url: string) => Promise<void>;
}

const cashRemittancesStore = create<cashRemittancesStoreProps>((set) => ({
    remittances: null,
    error: false,
    loading: false,
    sending: false,
    deleting: false,
    loadRemittances: async (url: string) => {
        set({ loading: true });
        try {
            const response = await getServices(url);
            set({ remittances: response.data.data, error: false });
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    createRemittance: async (data) => {
        set({ sending: true });
        try {
            const response = await createService("cash/remittances", data);
            set({ remittances: response.data.data, error: false });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
        } finally {
            set({ sending: false });
        }
    },
    
    deleteRemittance: async (url: string) => {
        set({ deleting: true });
        try {
            const response = await deleteService(url); 
            set({ remittances: response.data.data, error: false });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
        } finally {
            set({ deleting: false });
        }
    },

}));

export default cashRemittancesStore;
