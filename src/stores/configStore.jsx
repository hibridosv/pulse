import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getServices } from '@/services/services';

const useConfigStore = create(
  persist(
    (set) => ({
      configurations: [],

      system: [],
      payMethods: [],
      permission: [],
      user: [],
      invoiceExist: false,
      isInvoiceExpires: 0,
      role: null,

      cashdrawer: [],

      client: [],
      tenant: [],

      isLoaded: false,
      loading: false,
      error: null,

      loadConfig: async () => {
        set({ loading: true });
        try {
          const response = await getServices('configuration/initial');
          let data = response.data;
          console.log(data);
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
          console.error(error)
        } finally {
          set({ loading: false });
        }
      },

      clearConfig: () => {
        set({ 
          configurations: [],
          system: [],
          payMethods: [],
          permission: [],
          user: [],
          invoiceExist: false,
          isInvoiceExpires: 0,
          role: "",
          cashdrawer: [],
          client: [],
          tenant: [],
          isLoaded: false,
         });
      },

    }),
    {
      name: 'config-storage', // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);



export default useConfigStore;
