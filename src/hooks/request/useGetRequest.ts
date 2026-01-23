import { get } from '@/services/httpService'; // Asegúrate de que la ruta sea correcta
import useToastMessageStore from '@/stores/toastMessageStore';
import { useCallback, useState } from 'react';



export function useGetRequest() {
  const [responseData, setResponseData] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const { setMessage, setError: setErrorMessage } = useToastMessageStore();

  const getRequest = useCallback(async (url: string, showMessage: boolean = true) => {
    setLoading(true);
    try {
      const response = await get(url);
      setResponseData(response.data);
      if (showMessage) setMessage(response);
    } catch (err: any) {
      setResponseData(null);
      if (showMessage) setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, [setErrorMessage, setMessage]);


  return { responseData, loading, getRequest };
}
