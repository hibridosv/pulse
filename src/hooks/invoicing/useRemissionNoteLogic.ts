'use client'
import { updateService } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import useToastMessageStore from '@/stores/toastMessageStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetRequest } from '../request/useGetRequest';

export function useRemissionNoteLogic(currentPage: any, searchTerm: string) {
  const { getRequest, responseData, loading } = useGetRequest();
  const [searchTermNew, setSearchTermNew] = useState("");
  const router = useRouter();
  const { openLoading, closeLoading, loading: sending } = useStateStore()
  const { setMessage, setError } = useToastMessageStore();
   
  
  const sendRemissions = async (id: string) => {
      openLoading("sendRemissions")
      try {
          const response = await updateService(`remissions/charge/${id}`, {});
          if (response.status === 200) {
            router.push("/sales/quick");
          }
      } catch (error) {
          console.error(error);
          setError(error)
      } finally {
        closeLoading("sendRemissions");
      }
    }



  useEffect(() => {

        if (searchTerm != searchTermNew ) {
          setSearchTermNew(searchTerm);
            getRequest(`remissions?sort=-created_at&included=products,client,employee,delivery,referred,invoiceAssigned&perPage=10&page=1${searchTerm}`, false)
        } else {
           getRequest(`remissions?sort=-created_at&included=products,client,employee,delivery,referred,invoiceAssigned&perPage=10${currentPage}${searchTerm}`, false)
        }
  }, [currentPage, searchTerm, searchTermNew])

  return { loading, responseData, sendRemissions, sending};

}
