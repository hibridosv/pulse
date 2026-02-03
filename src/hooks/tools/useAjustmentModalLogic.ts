'use client'
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import adjustStore from '@/stores/tools/adjustStore';
import { useEffect } from 'react';

export function useAjustmentModalLogic(currentPage?: any, isShow: boolean = false) {
    const { loadAdjustment } = adjustStore()
    const { getSelectedElement } = useTempSelectedElementStore();
    const record = getSelectedElement('adjustmentDetails') || null;


  useEffect(() => {
      if (isShow && record) {
          console.log("Loading adjustment details for record:", record);
          loadAdjustment(`tools/adjust/${record.id}/products?perPage=25${currentPage}`)
      }
  }, [loadAdjustment, currentPage, isShow, record])
  

}
