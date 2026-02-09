import { getServices } from '@/services/services';
import { create } from 'zustand';
import useToastMessageStore from './toastMessageStore';


interface UserStoreProps {
  users: any; 
  user: any; 
  error: boolean;
  loading: boolean;
  saving: boolean;
  loadUsers: (url: string) => Promise<void>;

}

const useUserStore = create<UserStoreProps>((set) => ({
  users: null,
  user: null,
  error: false,
  loading: false,
  saving: false,
 
  loadUsers: async (url: string) => {
    set({ loading: true });
    try {
      const response = await getServices(url);
      set({ users: response.data.data, error: false });
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },


}));

export default useUserStore;
