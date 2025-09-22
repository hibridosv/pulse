import { useState, useEffect } from 'react';
import { Product } from '@/interfaces/products';
import { useGetRequest } from '../request/useGetRequest';
import { getServices } from '@/services/services';
import useStateStore from '@/stores/stateStorage';



export function useProductDetailsLogic(product: Product, isShow: boolean) {
  const [ productsLinked, setProductsLinked ] = useState([]) as any;
  const { getRequest } = useGetRequest();
  const { openLoading, closeLoading } = useStateStore();

    useEffect(() => {
        if (isShow && product?.id) {
            getRequest(`orders/products/${product?.id}/quantity`, false);
        }
    }, [getRequest, product?.id, isShow]);

    useEffect(() => {
        const fetchDataLinked = async (url: string) => {
            openLoading("productLinked");
            try {
                const response = await getServices(url);
                setProductsLinked(response.data.data);
            } catch (error) {
                    console.error('Error fetching data:', error);
            } finally {
                closeLoading("productLinked");
            }
        };
        if (isShow && product?.id && product.product_type == 3) {
            fetchDataLinked(`products/${product?.id}/linked`);
        }
    }, [product, isShow, openLoading, closeLoading]);

    return { productsLinked  };
}
