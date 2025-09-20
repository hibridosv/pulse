import { create } from 'zustand';
import { getServices, createService, updateService, deleteService } from '@/services/services';
import useToastMessageStore from './toastMessageStore';
import useModalStore from './modalStorage';
import useConfigStore from './configStore';
import useCutStore from './cutStore';


interface CashDrawerState {
  cashDrawers: any[]; // Consider defining a more specific type for cashDrawers
  error: Error | null;
  loading: boolean;
  loadCashDrawers: () => Promise<void>;
  openCashDrawer: (url: string, data: any) => Promise<void>;
  closeCashDrawer: (url: string, data: any) => Promise<void>;
}

const useCashDrawerStore = create<CashDrawerState>((set) => ({
  cashDrawers: [],
  error: null,
  loading: false,
  loadCashDrawers: async () => {
    set({ loading: true });
    try {
      const response = await getServices("cashdrawers?included=employee&filterWhere[status]=!0");
      set({ cashDrawers: response.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

  openCashDrawer: async (url, data) => {
    try {
      set({ loading: true });
      const response = await updateService(url, data);
      await useCashDrawerStore.getState().loadCashDrawers();
      await useConfigStore.getState().loadConfig();
      await useCutStore.getState().loadCuts('cuts?included=employee,cashdrawer&sort=-updated_at&perPage=10');
      useToastMessageStore.getState().setMessage(response);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
      useModalStore.getState().closeModal('cashDrawerOpen');
    }
  },
  
  
  closeCashDrawer: async (url, data) => {
    try {
      set({ loading: true });
      const response = await updateService(url, data);
      await useCashDrawerStore.getState().loadCashDrawers();
      await useConfigStore.getState().loadConfig();
      await useCutStore.getState().loadCuts('cuts?included=employee,cashdrawer&sort=-updated_at&perPage=10');
      useToastMessageStore.getState().setMessage(response);
      useModalStore.getState().openModal('cashDrawerDetails');
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
      useModalStore.getState().closeModal('cashDrawerOpen');
    }
  },


}));

export default useCashDrawerStore;
