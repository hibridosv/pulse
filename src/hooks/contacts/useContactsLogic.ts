import { useEffect } from 'react';
import useContactStore from '@/stores/ContactStore';


export function useContactsLogic(currentPage: string, searchTerm: string) {
  const { loadContacts } = useContactStore();



    useEffect(() => {
        if (searchTerm === "") {
            loadContacts(`contacts?sort=-created_at&included=employee&filterWhere[status]==1&perPage=10${currentPage}${searchTerm}`);
        } else {
            loadContacts(`contacts?sort=-created_at&included=employee&filterWhere[status]==1&perPage=10&page=1${searchTerm}`);
        }
    }, [loadContacts, currentPage, searchTerm]);

}
