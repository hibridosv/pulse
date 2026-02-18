'use client'
import accountReceivableStore from '@/stores/accounts/accountReceivableStore';
import useConfigStore from '@/stores/configStore';
import useTempStorage from '@/stores/useTempStorage';
import { useEffect } from 'react';
import { usePostRequest } from '../request/usePostRequest';
import { usePutRequest } from '../request/usePutRequest';

export function useAccountReceivableLogic(currentPage?: any, initialLoad: boolean = false) {
  const { loadAccounts, createPayment, error, checkIn } = accountReceivableStore();
  const { getElement } = useTempStorage();
  const selectedOption = getElement("optionSelected");
  const contactSelected = getElement('clientSelectedBySearch');
  const receivableRecord = getElement('paymentReceivableAdd');
  const { responseData: postData, loading: postLoading, postRequest } = usePostRequest() as { responseData: any; loading: boolean; postRequest: any };
  const { responseData: putData, loading: putLoading, putRequest } = usePutRequest() as { responseData: any; loading: boolean; putRequest: any };

  const { activeConfig, system } = useConfigStore();


  useEffect(() => { 
          if (initialLoad && selectedOption) {
            loadAccounts(`accounts/receivable?included=order.products,order.invoiceAssigned,employee,payments.employee,payments.deletedBy,client&${selectedOption?.id != 2 ? `filterWhere[status]==${selectedOption?.id}&`:``}${contactSelected?.id ? `filterWhere[client_id]==${contactSelected.id}&` : ``}sort=-created_at&perPage=10${currentPage ? currentPage : ''}`);
            }
  }, [currentPage, loadAccounts, contactSelected, selectedOption, initialLoad]);


    const savePayment = async (data: any) => {

      data.status = 1;
      data.account_type = 1;
      data.creditSelected = receivableRecord?.id;
      await createPayment("accounts/payment", data); 
      if (!error) {
            loadAccounts(`accounts/receivable?included=order.products,order.invoiceAssigned,employee,payments.employee,payments.deletedBy,client&${selectedOption?.id != 2 ? `filterWhere[status]==${selectedOption?.id}&`:``}${contactSelected?.id ? `filterWhere[client_id]==${contactSelected.id}&` : ``}sort=-created_at&perPage=10${currentPage ? currentPage : ''}`)
    }
  }


    const handleCheckIn = async() => {
      await checkIn("accounts/checkin", receivableRecord); 
      if (!error) {
            loadAccounts(`accounts/receivable?included=order.products,order.invoiceAssigned,employee,payments.employee,payments.deletedBy,client&${selectedOption?.id != 2 ? `filterWhere[status]==${selectedOption?.id}&`:``}${contactSelected?.id ? `filterWhere[client_id]==${contactSelected.id}&` : ``}sort=-created_at&perPage=10${currentPage ? currentPage : ''}`)
    }
  }

  const isPrint = async () => {
    try {
      putRequest(`accounts/payment/${receivableRecord?.id}/print`, {});
      if (putData && putData?.type == "successful") {
          if (activeConfig && activeConfig.includes("print-local")) {
            await postRequest(system?.local_url_print ?? 'http://127.0.0.1/impresiones/', putData.data, false);
          }
      }
    } catch (error) {
      console.error(error);
    } 
  }

  return { savePayment, isPrint, handleCheckIn };  
}