import { createService, deleteService, getServices, updateService } from '@/services/services';
import { create } from 'zustand';
import useModalStore from './modalStorage';
import useToastMessageStore from './toastMessageStore';
import useTempStorage from './useTempStorage';


interface ContactStoreState {
  contacts: any; 
  contact: any; 
  error: boolean;
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  loadContacts: (url: string) => Promise<void>;
  createContact: (data: any) => Promise<void>;
  updateContact: (url: string, data: any) => Promise<void>;
  deleteContact: (url: string) => Promise<void>;
}

const useContactStore = create<ContactStoreState>((set) => ({
  contacts: null,
  contact: null,
  error: false,
  loading: false,
  saving: false,
  deleting: false,
  loadContacts: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ contacts: response.data.data, error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  createContact: async (data) => {
        set({ saving: true });
        try {
            const response = await createService("contacts", data);
            set({ contact: response.data.data, error: false });
            useToastMessageStore.getState().setMessage(response);
            useModalStore.getState().closeModal('contactAdd');
            useTempStorage.getState().setElement("contactDetails", response.data.data);
            useModalStore.getState().openModal('contactDetails');
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
        } finally {
            set({ saving: false });
        }
    },

    updateContact: async (url, data) => {
        set({ saving: true });
        try {
            const response = await updateService(url, data);
            set({ contact: response.data.data, error: false });
            useToastMessageStore.getState().setMessage(response);
            useModalStore.getState().closeModal('contactAdd');
            useTempStorage.getState().setElement("contactDetails", response.data.data);
            useModalStore.getState().openModal('contactDetails');
        } catch (error) {
            useToastMessageStore.getState().setError(error);
            set({ error: true });
        } finally {
            set({ saving: false });
        }
    },

    deleteContact: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url);
      useToastMessageStore.getState().setMessage(response);
      set({ error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ deleting: false });
    }
  },

}));

export default useContactStore;
