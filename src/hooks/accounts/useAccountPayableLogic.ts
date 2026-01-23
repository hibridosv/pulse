'use client'
import useAccountPayableStore from '@/stores/accounts/accountPayableStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { useEffect } from 'react';

export function useAccountPayableLogic(currentPage?: any, initialLoad: boolean = false) {
  const { loadAccounts, createAccount, createPayment, error, deleteAccount, createCreditNote, deleteCreditNote} = useAccountPayableStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const selectedOption = getSelectedElement("optionSelected") || {id: 2};
  const contactSelected = getSelectedElement('clientSelectedBySearch');
  const elementSelected = getSelectedElement('clientSelectedBySearchModal');
  const payableRecord = getSelectedElement('paymentPayableAdd');


  useEffect(() => {
     if (initialLoad) {
       loadAccounts(`accounts/payable?included=provider,employee,payments.employee,payments.deletedBy,note&${selectedOption?.id != 2 ? `filterWhere[status]==${selectedOption?.id}&`:``}${contactSelected?.id ? `filterWhere[provider_id]==${contactSelected.id}&` : ``}sort=-created_at&perPage=10${currentPage ? currentPage : ''}`)
      }
  }, [currentPage, loadAccounts, contactSelected, selectedOption, initialLoad]);


    const savePayable = async (data: any) => {
      data.provider_id = elementSelected?.id;
      data.status = 1;
      data.balance = data.quantity;
      data.invoice_number = data.invoice == 0 ? 0 : data.invoice_number;

      await createAccount("accounts/payable", data);
        if (!error) {
            loadAccounts(`accounts/payable?included=provider,employee,payments.employee,payments.deletedBy,note&${selectedOption?.id != 2 ? `filterWhere[status]==${selectedOption?.id}&`:``}${contactSelected?.id ? `filterWhere[provider_id]==${contactSelected.id}&` : ``}sort=-created_at&perPage=10${currentPage ? currentPage : ''}`)
        }
  }

    const savePayment = async (data: any) => {

      data.status = 1;
      data.account_type = 2;
      data.creditSelected = payableRecord?.id;
      await createPayment("accounts/payment", data); 
      if (!error) {
            loadAccounts(`accounts/payable?included=provider,employee,payments.employee,payments.deletedBy,note&${selectedOption?.id != 2 ? `filterWhere[status]==${selectedOption?.id}&`:``}${contactSelected?.id ? `filterWhere[provider_id]==${contactSelected.id}&` : ``}sort=-created_at&perPage=10${currentPage ? currentPage : ''}`)
    }
  }

  const deletePayableAccount = async () => {
      await deleteAccount(`accounts/payable/${payableRecord?.id}`, payableRecord?.id);
  }


  const saveCreditNote = async (data: any) => {
      data.credits_payable_id = payableRecord?.id;
      await createCreditNote("accounts/notes", data);
      if (!error) {
            loadAccounts(`accounts/payable?included=provider,employee,payments.employee,payments.deletedBy,note&${selectedOption?.id != 2 ? `filterWhere[status]==${selectedOption?.id}&`:``}${contactSelected?.id ? `filterWhere[provider_id]==${contactSelected.id}&` : ``}sort=-created_at&perPage=10${currentPage ? currentPage : ''}`)
    }
  }

  const delCreditNote = async () => {
      await deleteCreditNote(`accounts/notes/${payableRecord?.note?.id}`);
  }


  return { savePayable, savePayment, deletePayableAccount, saveCreditNote, delCreditNote };  
}