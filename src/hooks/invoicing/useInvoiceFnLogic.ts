'use client'
import { postForPrint } from '@/services/OtherServices';
import { createService, updateService } from '@/services/services';
import useConfigStore from '@/stores/configStore';
import useStateStore from '@/stores/stateStorage';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import useToastMessageStore from '@/stores/toastMessageStore';
import { useRouter } from 'next/navigation';

export function useInvoiceFnLogic() {
  const router = useRouter();
  const { openLoading, closeLoading, loading: sending } = useStateStore()
  const { setError, setMessage } = useToastMessageStore();
  const { clearSelectedElement } = useTempSelectedElementStore();
  const { system, activeConfig } = useConfigStore();
   
  
  const sendRemissions = async (id: string) => {
      openLoading("sendRemissions")
      try {
          const response = await updateService(`remissions/${id}/charge`, {});
          if (response.status === 200) {
            clearSelectedElement("remissionNote");
            router.push("/dashboard");
          }
      } catch (error) {
          setError(error)
      } finally {
        closeLoading("sendRemissions");
      }
    }


  const printOrder = async (id: string) => {
    try {
      openLoading("printing")
      const response = await createService(`documents/print`, { invoice: id });
      if (response.status === 200) {
        if (activeConfig && activeConfig.includes("print-local")) {
          await postForPrint(system?.local_url_print ?? 'http://127.0.0.1/impresiones/', 'POST', response.data);
        }
        setMessage(response)
      }
    } catch (error) {
      setError(error)
    } finally {
      closeLoading("printing");
    }
  };

  const deleteOrder = async (id: string) => {
    openLoading("deleting")
    try {
      await createService(`invoices/delete`, {invoice: id});
    } catch (error) {
      setError(error)
    } finally {
      closeLoading("deleting");
    }
  };


  return { sendRemissions, sending, printOrder, deleteOrder};

}
