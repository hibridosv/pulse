import { useEffect } from 'react';

import productRemovedStore from '@/stores/productRemovedStore';

export function useProductRemoveLogic() {
 const { product, loadProduct, loadProducts} = productRemovedStore();

    useEffect(() => {
        loadProduct(`removes/initial?sort=-created_at&included=employee,failures,failures.employee,failures.deleted_by,failures.product&filter[status]=1`);
    }, []);


      useEffect(() => {
        if (!product) {
            loadProducts(`removes?sort=-created_at&included=employee,failures,failures.employee,failures.deleted_by,failures.product&filter[status]=2&perPage=10`);
        }
    }, [product]);

}
