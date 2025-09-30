'use client'
import useProductStore from '@/stores/products/productStore';
import { useEffect, useState } from 'react';

export function useLowStockLogic(currentPage: any, searchTerm: string, sortBy: string) {
  const { loadProducts } = useProductStore()
  const [searchTermNew, setSearchTermNew] = useState("");
  const [sortByNew, setSortByNew] = useState("");

  useEffect(() => {
        if (searchTerm != searchTermNew || sortBy != sortByNew) {
          setSearchTermNew(searchTerm);
          setSortByNew(sortBy);
          loadProducts(`lowstock?sort=${sortBy}&filterWhere[is_restaurant]==0&included=prices,category,quantityUnit,provider,brand,location&perPage=15&page=1${searchTerm}`)
        } else {
           loadProducts(`lowstock?sort=${sortBy}&filterWhere[is_restaurant]==0&included=prices,category,quantityUnit,provider,brand,location&perPage=15${currentPage}${searchTerm}`)
        }
  }, [loadProducts, currentPage, searchTerm, sortBy, searchTermNew, sortByNew])

}
