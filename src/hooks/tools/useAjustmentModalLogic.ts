'use client'
import adjustStore from '@/stores/tools/adjustStore';
import useTempStorage from '@/stores/useTempStorage';
import { useEffect } from 'react';

export function useAjustmentModalLogic(currentPage?: any, isShow: boolean = false) {
    const { loadAdjustment } = adjustStore()
    const { getElement } = useTempStorage();
    const record = getElement('adjustmentDetails') || null;


  useEffect(() => {
      if (isShow && record) {
          loadAdjustment(`tools/adjust/${record.id}/products?perPage=25${currentPage}`)
      }
  }, [loadAdjustment, currentPage, isShow, record])
  

}
