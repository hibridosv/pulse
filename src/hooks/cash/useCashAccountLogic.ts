import { useEffect } from 'react';
import cashAccountStore from '@/stores/cash/cashAccountStore';


export function useCashAccountLogic() {
 const { loadAccount } = cashAccountStore();

    useEffect(() => {
        loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
    }, [loadAccount]);

}
