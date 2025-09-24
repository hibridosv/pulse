'use client'
import useDasboardStore from '@/stores/dashboardStore'
import useProductStore from '@/stores/productStore';
import { useEffect } from 'react'

export function useKardexDetailLogic(id: string) {
  const { loadKardexDetails } = useProductStore();

  useEffect(() => {
    if (id) {
        loadKardexDetails(`kardex/details/${id}`);
    }
  }, [loadKardexDetails, id])

}
