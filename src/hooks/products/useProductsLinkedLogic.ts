'use client'
import { Product } from '@/interfaces/products';
import { createService, getServices } from '@/services/services';
import useProductLinkedStore from '@/stores/productLinkedStore';
import useProductStore from '@/stores/productStore'
import useSelectedElementStore from '@/stores/selectedElementStorage';
import useStateStore from '@/stores/stateStorage';
import useToastMessageStore from '@/stores/toastMessageStore';
import { useEffect, useState } from 'react'

export function useProductLinkedLogic(currentPage: any, searchTerm: string, sortBy: string, product: any, isShow: boolean) {
  const { loadProducts } = useProductStore()
  const [searchTermNew, setSearchTermNew] = useState("");
  const [sortByNew, setSortByNew] = useState("");
  const [ products, setProducts ] = useState([]) as any;
  const { openLoading, closeLoading } = useStateStore();
  const { clearElement } = useSelectedElementStore();
  const { loadProducts: fetchDataLinked, products: productsLinked, loading, productId} = useProductLinkedStore();

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

    if (isShow) {
        if(searchTerm === "") {
            setProducts([]);
        } else if (searchTerm != searchTermNew || sortBy != sortByNew) {
            setSearchTermNew(searchTerm);
            setSortByNew(sortBy);
            fetchData(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&perPage=10&page=1${searchTerm}`)
        } else {
            fetchData(`products?sort=${sortBy}&filterWhere[status]==1&filterWhere[is_restaurant]==0&perPage=10${currentPage}${searchTerm}`)
        } 
    }
  }, [loadProducts, currentPage, searchTerm, sortBy, searchTermNew, sortByNew, product, openLoading, closeLoading, isShow]);


    useEffect(() => {
        if (isShow && product?.id && product.product_type == 3 && productId != product?.id) {
            fetchDataLinked(product?.id);
        }
  }, [product, isShow, fetchDataLinked])


const onSubmit = async (data: any) => {
    try {
      const response = await createService(`products/${data.product_id}/linked`, data);
      useToastMessageStore.getState().setMessage(response);
      await fetchDataLinked(data.product_id);
      clearElement();
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      console.error(error);
    }
}

    return { products, onSubmit, productsLinked, loading }; 
}
