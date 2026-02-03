'use client'
import adjustStore from '@/stores/tools/adjustStore';
import { useEffect } from 'react';

export function useAjustmentLogic(currentPage?: any, initialLoad: boolean = false) {
  const { loadAdjustments, error } = adjustStore()

  useEffect(() => {
    if (initialLoad) {
        loadAdjustments(`tools/adjust?sort=-created_at&filterWhere[status]==1&perPage=10${currentPage}`)
    }
  }, [loadAdjustments, currentPage, initialLoad])



  return {  error };

}
