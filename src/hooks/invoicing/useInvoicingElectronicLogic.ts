import { DateRangeValues } from '@/components/button/DateRange';
import { urlConstructor } from '@/lib/urlConstructor';
import { getServices, updateService } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';
import { useDownloadLink } from '../useDownloadLink';


export function useInvoicingElectronicLogic(url: string, linkUrl: string, loadAtStart: boolean = true) {
    const [ history, setHistory ] = useState(null);
    const [ lastUrl, setLastUrl ] = useState("");
    const { openLoading, closeLoading } = useStateStore();
    const { links, addLink} = useDownloadLink();
    const { setSelectedElement, clearSelectedElement } = useTempSelectedElementStore();




    const handleGet = useCallback(async (data: DateRangeValues, url: string, linkUrl: string, params: any | null = null) => {
        openLoading("history");
        try {
            const urlScoped = urlConstructor(data, url);
            const response = await getServices(urlScoped);
            setHistory(response.data.data);
            addLink(data, linkUrl, params, 1, "Descargar Documento Excel");
            setLastUrl(urlScoped);
        } catch (error) {
            console.error(error);
            setHistory(null);
        } finally {
            closeLoading("history");
        }
    }, [addLink, closeLoading, openLoading]);

    useEffect(() => {
        if (loadAtStart) {
            (async () => { 
            const actualDate = DateTime.now();
            const formatedDate = actualDate.toFormat('yyyy-MM-dd');
            await handleGet({option: "1", initialDate: `${formatedDate} 00:00:00`}, url, linkUrl)
            })();
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, linkUrl, loadAtStart]);
    

    const resendDocument = async (invoice: string) => {
      try {
         setSelectedElement("resendDocument", invoice);
         openLoading("resendDocument");
        const response = await updateService(`electronic/documents/${invoice}`, {});
        if (response.data.status === 200) {
           let data =  await getServices(lastUrl);
           console.log("Respuesta: ", data);
           setHistory(data.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        closeLoading("resendDocument");
        clearSelectedElement("resendDocument");
      }
    };


  return { history, handleGet, links, resendDocument }

}
