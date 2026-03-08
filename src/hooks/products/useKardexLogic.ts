'use client'
import useProductStore from '@/stores/products/productStore';
import { useEffect } from 'react';

export function useKardexLogic(id: string) {
  const { loadKardex, loadProduct } = useProductStore();

  useEffect(() => {
        loadKardex(encodeURI(`kardex/products/${id}`));
        loadProduct(`products/${id}?included=prices,category,quantityUnit,provider,brand,location`);
  }, [loadKardex, id, loadProduct])

}
