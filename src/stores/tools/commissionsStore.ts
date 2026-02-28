import { getServices, createService, updateService, deleteService } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';

interface CommissionsStoreI {
  commissions: any | null;
  activeCommission: any | null;
  ordersCommission: any | null;
  error: boolean;
  loading: boolean;
  saving: boolean;

  loadCommissions: (url: string) => Promise<void>;
  loadActiveCommission: () => Promise<boolean>;
  loadOrdersCommission: (referredId: string) => Promise<void>;
  createCommission: (userId: string) => Promise<boolean>;
  cancelCommission: (id: string, userId: string) => Promise<boolean>;
  saveCommission: (id: string, userId: string) => Promise<boolean>;
  payCommission: (id: string) => Promise<boolean>;
  deleteCommission: (id: string) => Promise<boolean>;
  toggleOrderPay: (orderId: string, userId: string, active: boolean) => Promise<boolean>;
  clearActive: () => void;
}

const commissionsStore = create<CommissionsStoreI>((set, get) => ({
  commissions: null,
  activeCommission: null,
  ordersCommission: null,
  error: false,
  loading: false,
  saving: false,

  loadCommissions: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ commissions: response.data.data, error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  loadActiveCommission: async () => {
    set({ loading: true });
    try {
      const response = await getServices('tools/commissions/active?type=1');
      if (!response.data.data?.message) {
        set({ activeCommission: response.data.data, error: false });
        return true;
      }
      set({ activeCommission: null });
      return false;
    } catch {
      set({ activeCommission: null });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  loadOrdersCommission: async (referredId: string) => {
    try {
      const response = await getServices(`tools/commissions/orders?userId=${referredId}`);
      if (!response.data.data?.message) {
        set({ ordersCommission: response.data.data });
      }
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    }
  },

  createCommission: async (userId: string) => {
    set({ saving: true });
    try {
      const response = await createService('tools/commissions/create', { userId, type: 1 });
      if (!response.data.data?.message) {
        set({ activeCommission: response.data.data, error: false });
        return true;
      }
      useToastMessageStore.getState().setError('Faltan algunos datos importantes');
      return false;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  cancelCommission: async (id: string, userId: string) => {
    set({ saving: true });
    try {
      const response = await updateService(`tools/commissions/cancel/${id}`, { userId });
      if (response.data.data?.type === 'successful') {
        set({ activeCommission: null });
        return true;
      }
      useToastMessageStore.getState().setError('Error al cancelar');
      return false;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  saveCommission: async (id: string, userId: string) => {
    set({ saving: true });
    try {
      const response = await updateService(`tools/commissions/save/${id}`, { userId });
      if (response.data.data?.type === 'successful') {
        set({ activeCommission: null });
        return true;
      }
      useToastMessageStore.getState().setError('Error al guardar');
      return false;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  payCommission: async (id: string) => {
    set({ saving: true });
    try {
      const response = await updateService(`tools/commissions/pay/${id}`, {});
      if (response.data.data?.type === 'successful') {
        useToastMessageStore.getState().setMessage(response);
        return true;
      }
      useToastMessageStore.getState().setError('Error al pagar');
      return false;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  deleteCommission: async (id: string) => {
    set({ saving: true });
    try {
      const response = await deleteService(`tools/commissions/${id}`);
      useToastMessageStore.getState().setMessage(response);
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  toggleOrderPay: async (orderId: string, userId: string, active: boolean) => {
    try {
      const response = await updateService(`tools/commissions/add/${orderId}`, { userId, active });
      if (response.data.data?.type === 'error') {
        useToastMessageStore.getState().setError('Error al actualizar');
        return false;
      }
      return true;
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    }
  },

  clearActive: () => set({ activeCommission: null, ordersCommission: null }),
}));

export default commissionsStore;
