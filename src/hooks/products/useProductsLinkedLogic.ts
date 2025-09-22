'use client'
import { Product } from '@/interfaces/products';
import { getServices } from '@/services/services';
import useProductStore from '@/stores/productStore'
import useStateStore from '@/stores/stateStorage';
import { useEffect, useState } from 'react'

export function useProductLinkedLogic(currentPage: any, searchTerm: string, sortBy: string) {
  const { loadProducts } = useProductStore()
  const [searchTermNew, setSearchTermNew] = useState("");
  const [sortByNew, setSortByNew] = useState("");
  const [ products, setProducts ] = useState([]) as any;
  const { openLoading, closeLoading } = useStateStore();

  useEffect(() => {
        const fetchData = async (url: string) => {
            openLoading("productSearch");
            try {
                const response = await getServices(url);
                setProducts(response.data.data);
            } catch (error) {
                    console.error('Error fetching data:', error);
            } finally {
                closeLoading("productSearch");
            }
        };
        if(searchTerm === "") {
            setProducts([]);
        } else if (searchTerm != searchTermNew || sortBy != sortByNew) {
          setSearchTermNew(searchTerm);
          setSortByNew(sortBy);
          fetchData(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&perPage=10&page=1${searchTerm}`)
        } else {
           fetchData(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&perPage=10${currentPage}${searchTerm}`)
        }
  }, [loadProducts, currentPage, searchTerm, sortBy, searchTermNew, sortByNew])

    return { products }; 
}
