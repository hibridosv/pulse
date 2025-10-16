'use client'
import { useEffect, useState } from 'react';
import { useGetRequest } from '../request/useGetRequest';

export function useSearchDocumentLogic(currentPage: any, searchTerm: string) {
  const { getRequest, responseData, loading } = useGetRequest();
  const [searchTermNew, setSearchTermNew] = useState("");



  useEffect(() => {

        if (searchTerm != searchTermNew ) {
            setSearchTermNew(searchTerm);
            getRequest(`orders?filterWhere[status]==3&included=invoiceAssigned,client,casheir&sort=-charged_at&perPage=15&page=1${searchTerm}`, false)
        } else {
           getRequest(`orders?filterWhere[status]==3&included=invoiceAssigned,client,casheir&sort=-charged_at&perPage=15${currentPage}${searchTerm}`, false)
        }
  }, [currentPage, searchTerm, searchTermNew])

  return { loading, responseData};

}
