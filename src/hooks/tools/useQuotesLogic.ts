'use client'
import quotesStore from '@/stores/tools/quotesStore';
import { useEffect, useState } from 'react';

export function useQuotesLogic(currentPage: any, searchTerm: string) {
  const { loadQuotes } = quotesStore()
  const [searchTermNew, setSearchTermNew] = useState("");

  useEffect(() => {
        if (searchTerm != searchTermNew) {
          setSearchTermNew(searchTerm);
          loadQuotes(`tools/quotes?sort=-created_at&included=products,client&perPage=10&page=1${searchTerm}`)
        } else {
           loadQuotes(`tools/quotes?sort=-created_at&included=products,client&perPage=10${currentPage}${searchTerm}`)
        }
  }, [loadQuotes, currentPage, searchTerm, searchTermNew])

}
