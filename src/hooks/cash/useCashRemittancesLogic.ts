import { useEffect } from 'react';
import cashAccountStore from '@/stores/cash/cashAccountStore';
import cashRemittancesStore from '@/stores/cash/cashRemittancesStore';



export function useCashRemittancesLogic() {
 const { loadAccount } = cashAccountStore();
 const { loadRemittances } = cashRemittancesStore();

    useEffect(() => {
        loadRemittances(`cash/remittances/find`);
        loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
    }, [loadAccount, loadRemittances]);

}
