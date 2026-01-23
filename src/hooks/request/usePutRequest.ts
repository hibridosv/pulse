import { put } from '@/services/httpService'; // Asegúrate de que la ruta sea correcta
import useToastMessageStore from '@/stores/toastMessageStore';
import { useCallback, useState } from 'react';



export function usePutRequest() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setMessage, setError: setErrorMessage } = useToastMessageStore();



  const putRequest = useCallback(async (url: string, data: any, showMessage: boolean = true) => {
    setLoading(true);
    try {
      const response = await put(url, data);
      setResponseData(response.data);
      if (showMessage) setMessage(response);
    } catch (err: any) {
      setResponseData(null);
      if (showMessage) setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, [setErrorMessage, setMessage]);

  return { responseData, loading, putRequest };
}
