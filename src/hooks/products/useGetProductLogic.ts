import { RowType } from '@/components/products/ProductDetailsGetModal';
import { useEffect } from 'react';
import { useGetRequest } from '../request/useGetRequest';



export function useGetProductLogic(productId: string, isShow: boolean, row: RowType = "id") {
  const { getRequest, responseData, loading } = useGetRequest();

    useEffect(() => {
        if (isShow && productId) {
            console.log("Desde el useEffect", productId)
            getRequest(`products/find?filterWhere[${row}]==${productId}&included=prices,category,quantityUnit,provider,brand,location`, false);
        }
    }, [getRequest, productId, isShow, row]);

    return { responseData, loading };
}
