'use client'
import useProductStore from '@/stores/products/productStore';
import { useEffect, useState } from 'react';

export function useLinkedProductsLogic(currentPage: any, searchTerm: string, sortBy: string) {
  const { loadProducts } = useProductStore()
  const [searchTermNew, setSearchTermNew] = useState("");
  const [sortByNew, setSortByNew] = useState("");

  useEffect(() => {
        if (searchTerm != searchTermNew || sortBy != sortByNew) {
          setSearchTermNew(searchTerm);
          setSortByNew(sortBy);
          loadProducts(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&filterWhere[product_type]==3&included=prices,category,quantityUnit,provider,brand,location&perPage=15&page=1${searchTerm}`)
        } else {
           loadProducts(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&filterWhere[product_type]==3&included=prices,category,quantityUnit,provider,brand,location&perPage=15${currentPage}${searchTerm}`)
        }
  }, [loadProducts, currentPage, searchTerm, sortBy, searchTermNew, sortByNew])

}
