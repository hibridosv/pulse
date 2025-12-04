'use client'
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { usePostRequest } from '../request/usePostRequest';


export function useAccountPayableSaveLogic() {
  const { getSelectedElement } = useTempSelectedElementStore();
  const elementSelected = getSelectedElement('clientSelectedBySearchModal');
  const { loading, postRequest } = usePostRequest();  


  const savePayable = async (data: any) => {
    data.provider_id = elementSelected?.id;
    data.status = 1;
    data.balance = data.quantity;
    data.invoice_number = data.invoice == 0 ? 0 : data.invoice_number;
    console.log("Submitting data:", data);
    postRequest("accounts/payable", data);
  }

  return {savePayable, loading};

}