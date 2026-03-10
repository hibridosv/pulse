import { getFirstElement } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import purchasesStore from '@/stores/reports/purchasesStore';
import useTempStorage from '@/stores/useTempStorage';
import { useEffect } from 'react';


export function usePurchasesLogic() {
    const { loadPurchases, loadInvoices, purchases } = purchasesStore()
    const { client } = useConfigStore();
    const { setElement } = useTempStorage();
    
    useEffect(() => {          
        if (client) {
            loadPurchases(`purchases?filterWhere[nit]==${client?.nit}&sort=-created_at`);
        }  
    }, [loadPurchases, client]);
    
    useEffect(() => {          
        if (purchases) {
        const id = getFirstElement(purchases).id;
        loadInvoices(`purchases/${id}/invoices`);
    }  
    }, [loadInvoices, purchases]);



}
