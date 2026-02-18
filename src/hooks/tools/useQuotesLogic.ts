'use client'
import { updateService } from '@/services/services';
import useModalStore from '@/stores/modalStorage';
import useStateStore from '@/stores/stateStorage';
import useToastMessageStore from '@/stores/toastMessageStore';
import quotesStore from '@/stores/tools/quotesStore';
import useTempStorage from '@/stores/useTempStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useQuotesLogic(currentPage?: any, searchTerm?: any, initialLoad: boolean = false) {
  const { loadQuotes, deleteQuote, error } = quotesStore()
  const [searchTermNew, setSearchTermNew] = useState("");
  const router = useRouter();
  const { openLoading, closeLoading, loading: sending } = useStateStore()
  const { clearSelectedElement } = useTempStorage();
  const { setError } = useToastMessageStore();
  const { closeModal } = useModalStore();

  useEffect(() => {
    if (initialLoad) {
        if (searchTerm != searchTermNew) {
          setSearchTermNew(searchTerm);
          loadQuotes(`tools/quotes?sort=-created_at&included=products,client&perPage=10&page=1${searchTerm}`)
        } else {
           loadQuotes(`tools/quotes?sort=-created_at&included=products,client&perPage=10${currentPage}${searchTerm}`)
        }
    }
  }, [loadQuotes, currentPage, searchTerm, searchTermNew, initialLoad])

  const deleteRegister = async (url: string) => {
    await deleteQuote(url);
    if (!error) {
            loadQuotes(`tools/quotes?sort=-created_at&included=products,client&perPage=10&page=1`)
    }
  };

  const chargeRegisters = async (id: string) => {
      openLoading("sendQuote")
      try {
          const response = await updateService(`tools/quotes/${id}/charge`, {});
          if (response.status === 200) {
            router.push("/orders");
          }
        } catch (error) {
          setError(error)
        } finally {
          closeLoading("sendQuote");
          clearSelectedElement("quoteDetail");
          closeModal("quoteDetail");
      }
  }

  return { deleteRegister, chargeRegisters, sending };

}
