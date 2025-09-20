import { create } from 'zustand';
import { getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';

interface DashboardState {
  cards: any | null;
  chartWeek: any | null;
  chartDay: any | null;
  error: any | null;
  loading: boolean;
  loadCards: () => Promise<void>;
  loadChardWeek: () => Promise<void>;
  loadChardDay: () => Promise<void>;
}

const useDashBoardStore = create<DashboardState>((set) => ({
  cards: null,
  chartWeek: null,
  chartDay: null,
  error: null,
  loading: false,
  loadCards: async () => {
    set({ loading: true });
    try {
      const response = await getServices("dashboard");
      set({ cards: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },
  loadChardWeek: async () => {
    set({ loading: true });
    try {
      const response = await getServices("dashboard/char-week");
      set({ chartWeek: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },

    loadChardDay: async () => {
    set({ loading: true });
    try {
      const response = await getServices("dashboard/char-day");
      set({ chartDay: response.data.data, error: null });
    } finally {
      set({ loading: false });
    }
  },

}));

export default useDashBoardStore;

