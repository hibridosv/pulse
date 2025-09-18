'use client'
import useDasboardStore from '@/stores/dashboardStore'
import useProductStore from '@/stores/productStore';
import { DateTime } from 'luxon';
import { useEffect } from 'react'

export function useKardexLogic(id: string) {
  const { loadKardex, loadProduct } = useProductStore();

  useEffect(() => {
        const actualDate = DateTime.now();
        const formatedDate = actualDate.toFormat('yyyy-MM-dd');
        loadKardex(encodeURI(`products/${id}/kardex?option=1&initialDate=${formatedDate} 00:00:00`));
        loadProduct(`products/${id}?included=prices,category,quantityUnit,provider,brand,location`);
  }, [loadKardex, id, loadProduct])

}
