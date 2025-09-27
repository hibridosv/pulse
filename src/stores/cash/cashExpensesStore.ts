import { create } from 'zustand';
import { getServices, createService, deleteService, updateService } from '@/services/services';
import useToastMessageStore from '../toastMessageStore';



interface cashExpensesStoreProps {
  expenses: any | null;
  expensesCategories: any | null;
  error: Error | null;
  loading: boolean;
  deleting: boolean;
  loadExpenses: (url: string) => Promise<void>;
  loadExpensesCategories: (url: string) => Promise<void>;
  createExpense: (data: any) => Promise<void>;
  createExpenseCategory: (data: any) => Promise<void>;
  deleteExpense: (url: string) => Promise<void>;
}

const cashExpensesStore = create<cashExpensesStoreProps>((set) => ({
    expenses: null,
    expensesCategories: null,
    error: null,
    loading: false,
    deleting: false,
    loadExpenses: async (url: string) => {
        set({ loading: true });
        try {
            const response = await getServices(url);
            set({ expenses: response.data.data, error: null });
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },

    loadExpensesCategories: async (url: string) => {
        set({ loading: true });
        try {
            const response = await getServices(url);
            set({ expensesCategories: response.data.data, error: null });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            set({ loading: false });
        }
    },


    createExpense: async (data) => {
        set({ loading: true });
        try {
            const response = await createService("cash/expenses", data);
            set({ expenses: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },

    createExpenseCategory: async (data) => {
        set({ loading: true });
        try {
            const response = await createService("cash/categories", data);
            set({ expensesCategories: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ loading: false });
        }
    },
    
    deleteExpense: async (url: string) => {
        set({ deleting: true });
        try {
            const response = await deleteService(url); 
            set({ expenses: response.data.data, error: null });
            useToastMessageStore.getState().setMessage(response);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        } finally {
            set({ deleting: false });
        }
    },

}));

export default cashExpensesStore;
