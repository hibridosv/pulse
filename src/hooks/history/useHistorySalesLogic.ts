import cashAccountStore from '@/stores/cash/cashAccountStore';
import { useEffect } from 'react';


export function useHistorySalesLogic() {
 const { loadAccount } = cashAccountStore();

    useEffect(() => {
        loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
    }, [loadAccount]);

}
