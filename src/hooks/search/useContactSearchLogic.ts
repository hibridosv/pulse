'use client'
import useContactStore from '@/stores/ContactStore';
import { useEffect, useState } from 'react';

export function useContactSearchLogic(currentPage: any, searchTerm: string, sortBy: string, param: string, pagination: number) {
  const { loadContacts } = useContactStore()
  const [searchTermNew, setSearchTermNew] = useState("");
  const [sortByNew, setSortByNew] = useState("");

  useEffect(() => {
        if ((searchTerm != searchTermNew || sortBy != sortByNew) && searchTerm != "") {
          console.log(`contacts?sort=-created_at&included=employee&filterWhere[status]==1${param}&perPage=${pagination}&page=1${searchTerm}`)
          setSearchTermNew(searchTerm);
          setSortByNew(sortBy);
          loadContacts(`contacts?sort=-created_at&included=employee&filterWhere[status]==1${param}&perPage=${pagination}&page=1${searchTerm}`)
        }
  }, [currentPage, searchTerm, sortBy, searchTermNew, sortByNew])

}
