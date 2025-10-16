'use client'
import { useEffect, useState } from 'react';
import { useGetRequest } from '../request/useGetRequest';

export function useCreditNoteLogic(currentPage: any, searchTerm: string) {
  const { getRequest } = useGetRequest();
  const [searchTermNew, setSearchTermNew] = useState("");

  useEffect(() => {

        if (searchTerm != searchTermNew ) {
          setSearchTermNew(searchTerm);
            getRequest(`remissions?sort=-created_at&included=products,client,employee,delivery,referred,invoiceAssigned&perPage=10&page=1${searchTerm}`, false)
        } else {
           getRequest(`remissions?sort=-created_at&included=products,client,employee,delivery,referred,invoiceAssigned&perPage=10${currentPage}${searchTerm}`, false)
        }
  }, [currentPage, searchTerm, searchTermNew])

}
