import { getServices } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import { useEffect, useState } from 'react';



export function useInvoiceDetailsLogic(invoiceId: string, isShow: boolean) {
    const [ order, setOrder ] = useState(null) as any;
    const { openLoading, closeLoading, loading } = useStateStore();

    useEffect(() => {
        const fetchData = async (url: string) => {
            openLoading("getOrder");
            try {
                const response = await getServices(url);
                setOrder(response.data.data);
            } catch (error) {
                console.error('Error fetching data');
                setOrder(null);
            } finally {
                closeLoading("getOrder");
            }
        }
        
        if (isShow && invoiceId) {
            let iden = invoiceId.toLowerCase();
            fetchData(`orders/find?filter[id]==${iden}&included=products,invoiceproducts,employee,client,referred,delivery,casheir,invoiceAssigned`);
        }
    }, [invoiceId, isShow, openLoading, closeLoading]);

    return { order, loading };
}
