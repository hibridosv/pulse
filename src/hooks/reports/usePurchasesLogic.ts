import useConfigStore from '@/stores/configStore';
import purchasesStore from '@/stores/reports/purchasesStore';
import { useEffect } from 'react';
import { useDownloadLink } from '../useDownloadLink';


export function usePurchasesLogic() {
    const { loadPurchases, loading } = purchasesStore()
    const { client } = useConfigStore();
    console.log(client)
    const { links, addLink} = useDownloadLink();



  useEffect(() => {          
    if (client) {
        loadPurchases(`purchases?filterWhere[status]==1&filterWhere[nit]==${client?.nit}&sort=-created_at`);
    }  
    }, [loadPurchases, client]);
    


}
