import { create } from 'zustand';
import { createService, deleteService, getServices, updateService } from '@/services/services';
import useToastMessageStore from './toastMessageStore';
import useModalStore from './modalStorage';
import useTempSelectedElementStore from './tempSelectedElementStore';


interface ContactStoreState {
  contacts: any; 
  contact: any; 
  error: Error | null;
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
  error: null,
  loading: false,
  saving: false,
  deleting: false,
  loadContacts: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ contacts: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

  createContact: async (data) => {
        set({ saving: true });
        try {
            const response = await createService("contacts", data);
            set({ contact: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
            useModalStore.getState().closeModal('contactAdd');
            useTempSelectedElementStore.getState().setSelectedElement("contactDetails", response.data.data);
            useModalStore.getState().openModal('contactDetails');
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ saving: false });
        }
    },

    updateContact: async (url, data) => {
        set({ saving: true });
        try {
            const response = await updateService(url, data);
            set({ contact: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
            useModalStore.getState().closeModal('contactAdd');
            useTempSelectedElementStore.getState().setSelectedElement("contactDetails", response.data.data);
            useModalStore.getState().openModal('contactDetails');
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ saving: false });
        }
    },

    deleteContact: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url);
      useToastMessageStore.getState().setMessage(response);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ deleting: false });
    }
  },

}));

export default useContactStore;
