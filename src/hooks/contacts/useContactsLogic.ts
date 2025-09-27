import { useEffect } from 'react';
import useContactStore from '@/stores/ContactStore';


export function useContactsLogic(currentPage: string, searchTerm: string) {
  const { loadContacts } = useContactStore();



    useEffect(() => {
        loadContacts(`contacts?sort=-created_at&included=employee&filterWhere[status]==1&perPage=10${currentPage}${searchTerm}`);
    }, [loadContacts, currentPage, searchTerm]);

}
