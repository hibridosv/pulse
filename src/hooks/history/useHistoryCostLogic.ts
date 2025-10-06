import { getServices } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import { useCallback, useEffect, useState } from 'react';
import { useDownloadLink } from '../useDownloadLink';


export function useHistoryCostLogic(url: string, linkUrl: string, params: any | null = null) {
    const [ history, setHistory ] = useState(null) as any;
    const { openLoading, closeLoading, loading } = useStateStore()
    const { links, addLink} = useDownloadLink()


    const handleGet = useCallback(async (url: string, linkUrl: string, params: any | null = null) => {
        openLoading("history");
        try {
            const response = await getServices(url);
            setHistory(response.data.data);
            addLink({}, linkUrl, params);
        } catch (error) {
            console.error(error);
        } finally {
            closeLoading("history");
        }
    }, [addLink, closeLoading, openLoading]);

  useEffect(() => {
            (async () => { 
                await handleGet(url, linkUrl, params)
            })();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, linkUrl, handleGet, params]);
    

  return { history, handleGet, loading, links }

}
