import { useEffect } from 'react';

import productRemovedStore from '@/stores/productRemovedStore';
import useContactStore from '@/stores/ContactStore';
import productAddStore from '@/stores/productAddStore';

export function useProductAddLogic() {
 const { loadProduct } = productAddStore();
  const { loadContacts, contacts: providers } = useContactStore();

    useEffect(() => {
        loadProduct(`registers/principal/find?included=provider,registers.product&filter[status]=0`);
    }, [loadProduct]);


    useEffect(() => {
        if (!providers) {
            loadContacts('contacts?filterWhere[is_provider]==1');
        }
    }, [loadContacts, providers]);


}
