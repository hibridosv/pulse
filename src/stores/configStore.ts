import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';
import { User } from '@/interfaces/user';
import { CashDrawer } from '@/interfaces/cashdrawers';

interface ConfigStoreState {
  configurations: any[];
  activeConfig: any[];
  system: any[];
  payMethods: any[];
  permission: any[];
  user: User | null;
  invoiceExist: boolean;
  isInvoiceExpires: number;
  role: string | null;
  cashdrawer: CashDrawer | null;
  client: any[];
  tenant: any[];
  isLoaded: boolean;
  loading: boolean;
  error: Error | null;
  loadConfig: () => Promise<void>;
  setActiveConfig: (activeConfig: any) => void;
  clearConfig: () => void;
}

const useConfigStore = create(
  persist<ConfigStoreState>(
    (set) => ({
      configurations: [],
      activeConfig: [],

      system: [],
      payMethods: [],
      permission: [],
      user: null,
      invoiceExist: false,
      isInvoiceExpires: 0,
      role: null,

      cashdrawer: null,

      client: [],
      tenant: [],

      isLoaded: false,
      loading: false,
      error: null,

      loadConfig: async () => {
        set({ loading: true });
        try {
          const response = await getServices('config/initial');
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
          set({ isLoaded: true });
        } catch (error) {
          useToastMessageStore.getState().setError(error);
        } finally {
          set({ loading: false });
        }
      },

      setActiveConfig: (activeConfig: any) => {
        set({ activeConfig });
      },

      clearConfig: () => {
        set({ 
          configurations: [],
          system: [],
          payMethods: [],
          permission: [],
          user: null,
          invoiceExist: false,
          isInvoiceExpires: 0,
          role: null,
          cashdrawer: null,
          client: [],
          tenant: [],
          isLoaded: false,
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
