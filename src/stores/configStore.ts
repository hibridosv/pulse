import { CashDrawer } from '@/interfaces/cashdrawers';
import { User } from '@/interfaces/user';
import { getServices } from '@/services/services';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useToastMessageStore from './toastMessageStore';

interface ConfigStoreState {
  configurations: any;
  activeConfig: any;
  system: any;
  payMethods: any;
  permission: any;
  user: User | null;
  invoiceExist: boolean;
  isInvoiceExpires: number;
  role: string | null;
  cashdrawer: CashDrawer | null;
  client: any | null;
  tenant: any;
  invoiceTypes: any;
  isLoaded: boolean;
  loading: boolean;
  error: boolean;
  loadConfig: () => Promise<void>;
  setActiveConfig: (activeConfig: any) => void;
  clearConfig: () => void;
}

const useConfigStore = create(
  persist<ConfigStoreState>(
    (set) => ({
      configurations: null,
      activeConfig: null,
      system: null,
      payMethods: null,
      permission: null,
      user: null,
      invoiceExist: false,
      isInvoiceExpires: 0,
      role: null,
      cashdrawer: null,
      client: null,
      tenant: null,
      invoiceTypes: null,
      isLoaded: false,
      loading: false,
      error: false,

      loadConfig: async () => {
        set({ loading: true });
        try {
          const response = await getServices('config/find');
          let data = response.data.data;
          set({ configurations: data.configurations });
          set({ system: data.system });
          set({ payMethods: data.payMethods });
          set({ permission: data.permission });
          set({ user: data.user });
          set({ invoiceExist: data.invoiceExist });
          set({ isInvoiceExpires: data.isInvoiceExpires });
          set({ role: data.role });
          set({ cashdrawer: data.cashdrawer });
          set({ client: data.client });
          set({ tenant: data.tenant });
          set({ invoiceTypes: data.invoiceTypes });
          set({ isLoaded: true });
          set({ error: false });
        } catch (error) {
          useToastMessageStore.getState().setError(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },

      setActiveConfig: (activeConfig: any) => {
        set({ activeConfig });
      },

      clearConfig: () => {
        set({ 
            configurations: null,
            activeConfig: null,
            system: null,
            payMethods: null,
            permission: null,
            user: null,
            invoiceExist: false,
            isInvoiceExpires: 0,
            role: null,
            cashdrawer: null,
            client: null,
            tenant: null,
            invoiceTypes: null,
            isLoaded: false,
            loading: false,
            error: false,
         });
      },

    }),
    {
      name: 'config-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);




export default useConfigStore;
