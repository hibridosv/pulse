'use client'
import manageRestaurantStore from '@/stores/restaurant/manageRestaurantStore';
import { useEffect, useState } from 'react';

export function useRestaurantMenuLogic(currentPage: any, searchTerm: string) {
  const { loadProducts } = manageRestaurantStore()
  const [searchTermNew, setSearchTermNew] = useState("");

  useEffect(() => {
        if (searchTerm != searchTermNew) {
          setSearchTermNew(searchTerm);
          loadProducts(`products?sort=created_at&included=restaurant.workstation,prices,category,assigments.option,menu_order&filterWhere[status]==1&filterWhere[is_restaurant]==1&perPage=20&page=1${searchTerm}`)
        } else {
           loadProducts(`products?sort=created_at&included=restaurant.workstation,prices,category,assigments.option,menu_order&filterWhere[status]==1&filterWhere[is_restaurant]==1&perPage=20${currentPage}${searchTerm}`)
        }
  }, [loadProducts, currentPage, searchTerm, searchTermNew])

}
