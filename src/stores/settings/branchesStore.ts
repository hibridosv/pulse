import { createService, getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from '../toastMessageStore';

interface BranchesStoreI {
  remoteUrls: any;
  tenants: any;
  loading: boolean;
  sending: boolean;
  error: boolean;

  loadRemoteUrls: (email: string) => Promise<void>;
  loadTenants: () => Promise<void>;
  linkTenant: (tenantId: number) => Promise<boolean>;
}

const branchesStore = create<BranchesStoreI>((set) => ({
  remoteUrls: null,
  tenants: null,
  loading: false,
  sending: false,
  error: false,

  loadRemoteUrls: async (email: string) => {
    set({ loading: true });
    try {
      const response = await getServices(`remoteurl/${email}`);
      if (response.data) {
        set({ remoteUrls: response.data, error: false });
      }
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  loadTenants: async () => {
    try {
      const response = await getServices('tenants');
      if (response.data) {
        set({ tenants: response.data });
      }
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    }
  },

  linkTenant: async (tenantId: number) => {
    set({ sending: true });
    try {
      const response = await createService('linkedsystems/create', { to_tenant_id: tenantId });
      if (response.data?.type === 'successful') {
        useToastMessageStore.getState().setMessage(response.data.message);
        return true;
      } else {
        useToastMessageStore.getState().setError(response.data?.message);
        return false;
      }
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      return false;
    } finally {
      set({ sending: false });
    }
  },
}));

export default branchesStore;
