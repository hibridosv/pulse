import { useState, useCallback } from 'react';
import { post } from '@/services/httpService'; // Asegúrate de que la ruta sea correcta
import useToastMessageStore from '@/stores/toastMessageStore';



export function usePostRequest() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setMessage, setError: setErrorMessage } = useToastMessageStore();

  const postRequest = useCallback(async (url: string, data: any) => {
    setLoading(true);
    try {
      const response = await post(url, data);
      setResponseData(response.data);
      setMessage(response);
    } catch (err: any) {
      setErrorMessage(err);
      setResponseData(null);
    } finally {
      setLoading(false);
    }
  }, [setErrorMessage, setMessage]);


  return { responseData, loading, postRequest };
}
