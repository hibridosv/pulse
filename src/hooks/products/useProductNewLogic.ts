'use client'
import useBrandsStore from '@/stores/brandsStore'
import useCategoriesStore from '@/stores/categoriesStore'
import useContactStore from '@/stores/ContactStore'
import useLocationStore from '@/stores/LocationsStore'
import useProductStore from '@/stores/productStore'
import useQuantityUnitStore from '@/stores/QuantityUnitStore'
import { useEffect } from 'react'

export function useProductNewLogic() {
  const { loadProducts, products: lastProducts } = useProductStore();
  const { loadCategories, categories } = useCategoriesStore();
  const { loadBrands, brands } = useBrandsStore();
  const { loadQuantityUnits, quantityUnits } = useQuantityUnitStore();
  const { loadContacts, contacts: providers } = useContactStore();
  const { loadLocations, locations } = useLocationStore();

  useEffect(() => {
    if (!lastProducts) {
      loadProducts("products?perPage=10&page=1");
    }
    if (!categories) {
      loadCategories("categories");
    }
    if (!brands) {
      loadBrands("brands");
    }
    if (!quantityUnits) {
      loadQuantityUnits("quantityunits");
    }
    if (!providers) {
      loadContacts('contacts');
    }
    if (!locations) {
      loadLocations('locations');
    }
  }, []);

  const onSubmit = async (data: any) => {
    console.log(data);
  }

  return { onSubmit, categories, lastProducts, brands, quantityUnits, providers, locations }

}
