import { useEffect } from 'react';

import productRemovedStore from '@/stores/productRemovedStore';
import useContactStore from '@/stores/ContactStore';
import productAddStore from '@/stores/productAddStore';

export function useProductAddLogic() {
 const { loadProduct, loadProducts} = productAddStore();
  const { loadContacts, contacts: providers } = useContactStore();

    useEffect(() => {
        loadProduct(`registers/principal/find?included=provider,registers.product&filter[status]=0`);
        loadProducts(`registers/principal?sort=-created_at&included=provider,registers.product,employee&filter[status]=1&perPage=10`);
    }, [loadProduct, loadProducts]);


    useEffect(() => {
        if (!providers) {
            loadContacts('contacts?filterWhere[is_provider]==1');
        }
    }, [loadContacts, providers]);


}
