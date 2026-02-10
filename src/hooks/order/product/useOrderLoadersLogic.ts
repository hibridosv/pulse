'use client'
import useUserStore from '@/stores/UserStore';
import { useEffect } from 'react';


export function useOrderLoadersLogic(isShow: boolean = false) {
  const { loadUsers } = useUserStore();


  useEffect(() => {
    if (isShow) {
        loadUsers(`users?filterWhere[is_visible]==1&filterWhere[status]==1&sort=-created_at`);
    }
  }, [isShow, loadUsers]);
   
}