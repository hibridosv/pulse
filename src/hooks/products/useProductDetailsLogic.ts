import { useEffect } from 'react';
import { Product } from '@/interfaces/products';
import { useGetRequest } from '../request/useGetRequest';



export function useProductDetailsLogic(product: Product, isShow: boolean) {
  const { getRequest } = useGetRequest();

    useEffect(() => {
        if (isShow && product?.id) {
            getRequest(`orders/products/${product?.id}/quantity`, false);
        }
    }, [getRequest, product?.id, isShow]);

}
