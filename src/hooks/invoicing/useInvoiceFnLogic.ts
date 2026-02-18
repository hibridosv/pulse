'use client'
import { updateService } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import useToastMessageStore from '@/stores/toastMessageStore';
import useTempStorage from '@/stores/useTempStorage';
import { useRouter } from 'next/navigation';

export function useInvoiceFnLogic() {
  const router = useRouter();
  const { openLoading, closeLoading, loading: sending } = useStateStore()
  const { setError } = useToastMessageStore();
  const { clearElement } = useTempStorage();
   
  
  const sendRemissions = async (id: string) => {
      openLoading("sendRemissions")
      try {
          const response = await updateService(`remissions/${id}`, {});
          if (response.status === 200) {
            clearElement("remissionNote");
            router.push("/orders");
          }
      } catch (error) {
          setError(error)
      } finally {
        closeLoading("sendRemissions");
      }
    }



  return { sendRemissions, sending};

}
