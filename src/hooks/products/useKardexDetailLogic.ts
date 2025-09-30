'use client'
import useProductStore from '@/stores/products/productStore';
import { useEffect } from 'react';

export function useKardexDetailLogic(id: string) {
  const { loadKardexDetails } = useProductStore();

  useEffect(() => {
    if (id) {
        loadKardexDetails(`kardex/details/${id}`);
    }
  }, [loadKardexDetails, id])

}
