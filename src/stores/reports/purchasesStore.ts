import { deleteService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';


interface purchasesStoreI {
  purchases: any;
  invoices: any;
  duplicateInvoice: any;
  error: boolean;
  loading: boolean;
  loadingInvoices: boolean;
  loadingDuplicate: boolean;
  deleting: boolean;
  loadPurchases: (url: string) => Promise<boolean>;
  loadInvoices: (url: string) => Promise<boolean>;
  loadDuplicateInvoice: (id: string) => Promise<void>;
  deleteInvoice: (url: string) => Promise<boolean>;
}

const purchasesStore = create<purchasesStoreI>((set) => ({
  purchases: null,
  invoices: null,
  duplicateInvoice: null,
  error: false,
  loading: false,
  loadingInvoices: false,
  loadingDuplicate: false,
  deleting: false,
  loadPurchases: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ purchases: response.data.data, error: false });
      return true;
    } catch (error) {
      set({ error: true });
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
  loadInvoices: async (url: string) => {
    set({ loadingInvoices: true });
    try {
      const response = await getServices(url);
      set({ invoices: response.data.data, error: false });
      return true;
    } catch (error) {
      set({ invoices: null, error: true });
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ loadingInvoices: false });
    }
  },

  loadDuplicateInvoice: async (id: string) => {
    set({ loadingDuplicate: true, duplicateInvoice: null });
    try {
      const response = await getServices(`purchases/${id}`);
      set({ duplicateInvoice: response.data.data });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loadingDuplicate: false });
    }
  },

  deleteInvoice: async (url: string) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url);
      useToastMessageStore.getState().setMessage(response);
      set({ error: false });
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
      return false;
    } finally {
      set({ deleting: false });
    }
  },

}));

export default purchasesStore;
