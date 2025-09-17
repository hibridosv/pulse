import { useState, useCallback, useEffect } from 'react';
import { get, post } from '@/services/httpService'; // Asegúrate de que la ruta sea correcta
import useToastMessageStore from '@/stores/toastMessageStore';



export function useGetRequest() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setMessage, setError: setErrorMessage } = useToastMessageStore();

  const getRequest = useCallback(async (url: string, data: any) => {
    setLoading(true);
    try {
      const response = await post(url, data);
      setResponseData(response.data);
      setMessage(response);
      return response.data;
    } catch (err: any) {
      setErrorMessage(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);


  return { responseData, loading, getRequest };
}
