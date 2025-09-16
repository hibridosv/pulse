import { create } from 'zustand';
import { getServices, createService, updateService, deleteService } from '@/services/services';
import useToastMessageStore from './toastMessageStore';
import useModalStore from './modalStorage';
import useConfigStore from './configStore';


const useCashDrawerStore = create((set) => ({
  cashDrawers: [],
  error: [],
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
