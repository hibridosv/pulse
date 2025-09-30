'use client'
import useProductStore from '@/stores/products/productStore';
import { DateTime } from 'luxon';
import { useEffect } from 'react';

export function useKardexLogic(id: string) {
  const { loadKardex, loadProduct } = useProductStore();

  useEffect(() => {
        const actualDate = DateTime.now();
        const formatedDate = actualDate.toFormat('yyyy-MM-dd');
        loadKardex(encodeURI(`kardex/products/${id}?option=1&initialDate=${formatedDate} 00:00:00`));
        loadProduct(`products/${id}?included=prices,category,quantityUnit,provider,brand,location`);
  }, [loadKardex, id, loadProduct])

}
