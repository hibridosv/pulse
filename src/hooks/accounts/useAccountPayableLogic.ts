'use client'
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { useEffect } from 'react';
import { useGetRequest } from '../request/useGetRequest';

export function useAccountPayableLogic(currentPage: any) {
  const { getRequest, responseData, loading } = useGetRequest();
  const { getSelectedElement } = useTempSelectedElementStore();
  const selectedOption = getSelectedElement("optionSelected");
  const contactSelected = getSelectedElement('clientSelectedBySearch');

  useEffect(() => {

           getRequest(`accounts/payable?${selectedOption?.id != 2 ? `filterWhere[status]==${selectedOption?.id}&`:``}${contactSelected?.id ? `filterWhere[provider_id]==${contactSelected.id}&` : ``}sort=-created_at&perPage=10${currentPage}`, false)

  }, [currentPage, getRequest, contactSelected, selectedOption]);

  return { loading, responseData};

}