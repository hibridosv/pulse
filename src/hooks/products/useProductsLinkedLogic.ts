'use client'
import { Product } from '@/interfaces/products';
import { createService, getServices } from '@/services/services';
import useProductStore from '@/stores/productStore'
import useSelectedElementStore from '@/stores/selectedElementStorage';
import useStateStore from '@/stores/stateStorage';
import useToastMessageStore from '@/stores/toastMessageStore';
import { useEffect, useState } from 'react'

export function useProductLinkedLogic(currentPage: any, searchTerm: string, sortBy: string, product: any) {
  const { loadProducts } = useProductStore()
  const [searchTermNew, setSearchTermNew] = useState("");
  const [sortByNew, setSortByNew] = useState("");
  const [ products, setProducts ] = useState([]) as any;
  const [ productsLinked, setProductsLinked ] = useState([]) as any;
  const { openLoading, closeLoading } = useStateStore();
  const { clearElement } = useSelectedElementStore();

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
  }, [loadProducts, currentPage, searchTerm, sortBy, searchTermNew, sortByNew, product])

    const fetchDataLinked = async (url: string) => {
        try {
            const response = await getServices(url);
            setProductsLinked(response.data.data);
        } catch (error) {
                console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataLinked(`products/${product?.id}/linked`);
  }, [product])


const onSubmit = async (data: any) => {
    console.log(data);
    openLoading("productSending");
    try {
      const response = await createService(`products/${data.product_id}/linked`, data);
      useToastMessageStore.getState().setMessage(response);
      await fetchDataLinked(`products/${data.product_id}/linked`);
      clearElement();
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      console.error(error);
    } finally {
        closeLoading("productSending");
    }
}

    return { products, onSubmit, productsLinked }; 
}
