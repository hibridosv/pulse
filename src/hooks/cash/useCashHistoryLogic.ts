import { useEffect } from 'react';
import cashAccountStore from '@/stores/cash/cashAccountStore';
import cashTransferStore from '@/stores/cash/cashTransferStore';


export function useCashHistoryLogic(currentPage: string) {
 const { loadAccount, accounts } = cashAccountStore();
 const { loadHistory } = cashTransferStore();


    useEffect(() => {
        loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
    }, [loadAccount]);

    useEffect(() => {
        loadHistory(`cash/transfers/history?included=employee,accountTo,accountFrom&sort=-created_at&perPage=10${currentPage}`);
    }, [loadHistory, currentPage, accounts]);
}
