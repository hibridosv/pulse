'use client'
import manageRestaurantStore from '@/stores/restaurant/manageRestaurantStore';
import { useEffect } from 'react';

export function useRestaurantMenuLogic(currentPage: any, searchTerm: string) {
  const { loadProducts } = manageRestaurantStore();

  useEffect(() => {
    const page = searchTerm ? '&page=1' : currentPage;
    loadProducts(`products?sort=created_at&included=restaurant.workstation,prices,category,assigments.option,menu_order&filterWhere[status]==1&filterWhere[is_restaurant]==1&perPage=20${page}${searchTerm}`);
  }, [loadProducts, currentPage, searchTerm]);
}
