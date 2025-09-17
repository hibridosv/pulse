'use client'
import useProductStore from '@/stores/productStore'
import { useEffect } from 'react'

export function useProductLogic(currentPage: any, searchTerm: string, sortBy: string) {
  const { loadProducts } = useProductStore()

  useEffect(() => {
      loadProducts(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&included=prices,category,quantityUnit,provider,brand,location&perPage=15${currentPage}${searchTerm}`)
  }, [loadProducts, currentPage, searchTerm, sortBy])

}
