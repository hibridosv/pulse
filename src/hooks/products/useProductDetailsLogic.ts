import { Product } from '@/interfaces/products';
import { useEffect } from 'react';
import { useGetRequest } from '../request/useGetRequest';



export function useProductDetailsLogic(product: Product, isShow: boolean) {
  const { getRequest, responseData, loading } = useGetRequest();

    useEffect(() => {
        if (isShow && product?.id) {
            getRequest(`orders/products/${product?.id}/quantity`, false);
        }
    }, [getRequest, product, isShow]);

    return { responseData, loading };
}
