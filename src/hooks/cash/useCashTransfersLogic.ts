import { useEffect } from 'react';
import cashAccountStore from '@/stores/cash/cashAccountStore';
import cashTransferStore from '@/stores/cash/cashTransferStore';


export function useCashTransfersLogic(currentPage: string) {
 const { loadAccount } = cashAccountStore();
 const { loadTransfers} = cashTransferStore();


    useEffect(() => {
        loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
    }, [loadAccount]);

    useEffect(() => {
        loadTransfers(`cash/transfers?included=employee,account&sort=-created_at&perPage=10${currentPage}`);
    }, [loadTransfers, currentPage]);
}
