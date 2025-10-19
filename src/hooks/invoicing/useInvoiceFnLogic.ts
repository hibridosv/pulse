'use client'
import { updateService } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import useToastMessageStore from '@/stores/toastMessageStore';
import { useRouter } from 'next/navigation';

export function useInvoiceFnLogic() {
  const router = useRouter();
  const { openLoading, closeLoading, loading: sending } = useStateStore()
  const { setError } = useToastMessageStore();
  const { clearSelectedElement } = useTempSelectedElementStore();
   
  
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



  return { sendRemissions, sending};

}
