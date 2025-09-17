'use client'
import useProductStore from '@/stores/productStore'
import { useEffect, useState } from 'react'

export function useProductLogic(currentPage: any, searchTerm: string, sortBy: string) {
  const { loadProducts } = useProductStore()
  const [searchTermNew, setSearchTermNew] = useState("");

  useEffect(() => {
        if (searchTerm != searchTermNew) {
          setSearchTermNew(searchTerm);
          loadProducts(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&included=prices,category,quantityUnit,provider,brand,location&perPage=15&page=1${searchTerm}`)
        } else {
           loadProducts(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&included=prices,category,quantityUnit,provider,brand,location&perPage=15${currentPage}${searchTerm}`)
        }
  }, [loadProducts, currentPage, searchTerm, sortBy])

}
