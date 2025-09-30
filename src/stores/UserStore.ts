import { create } from 'zustand';
import {  getServices } from '@/services/services';
import useToastMessageStore from './toastMessageStore';


interface UserStoreProps {
  users: any; 
  user: any; 
  error: Error | null;
  loading: boolean;
  saving: boolean;
  loadUsers: (url: string) => Promise<void>;

}

const useUserStore = create<UserStoreProps>((set) => ({
  users: null,
  user: null,
  error: null,
  loading: false,
  saving: false,
 
  loadUsers: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ users: response.data.data, error: null });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
    } finally {
      set({ loading: false });
    }
  },


}));

export default useUserStore;
