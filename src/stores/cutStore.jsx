import { create } from 'zustand';
import { deleteService, getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';
import useCashDrawerStore from './cashdrawersStore';
import useConfigStore from './configStore';



const useCutStore = create((set) => ({
  cuts: [],
  cut: [],
  error: [],
  loading: false,
  deleting: false,
  loadCuts: async (url) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ cuts: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    loadCut: async (url) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ cut: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    deleteCut: async (url) => {
    set({ deleting: true });
    try {
      const response = await deleteService(url); 
      await useCutStore.getState().loadCuts('cuts?included=employee,cashdrawer&sort=-updated_at&perPage=10');
      await useCashDrawerStore.getState().loadCashDrawers();
      await useConfigStore.getState().loadConfig();
      useToastMessageStore.getState().setMessage(response);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ deleting: false });
    }
  },


}));

export default useCutStore;
