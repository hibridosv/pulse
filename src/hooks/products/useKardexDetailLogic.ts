'use client'
import useDasboardStore from '@/stores/dashboardStore'
import useProductStore from '@/stores/productStore';
import { DateTime } from 'luxon';
import { useEffect } from 'react'

export function useKardexDetailLogic(id: string) {
  const { loadKardexDetails } = useProductStore();

  useEffect(() => {
    if (id) {
        loadKardexDetails(`products/kardex/${id}`);
    }
  }, [loadKardexDetails, id])

}
