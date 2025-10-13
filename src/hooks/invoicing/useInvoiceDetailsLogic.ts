import { getServices } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import { useEffect, useState } from 'react';



export function useInvoiceDetailsLogic(productId: string, isShow: boolean) {
    const [ order, setOrder ] = useState(null) as any;
    const { openLoading, closeLoading, loading } = useStateStore();

    useEffect(() => {
        const fetchData = async (url: string) => {
            let urlSanitize = url.toLowerCase();
            openLoading("getOrder");
            try {
                const response = await getServices(urlSanitize);
                setOrder(response.data.data);
            } catch (error) {
                console.error('Error fetching data');
                setOrder(null);
            } finally {
                closeLoading("getOrder");
            }
        }

        if (isShow && productId) {
            fetchData(`orders/find?filter[id]==${productId}&included=products,invoiceproducts,employee,client,referred,delivery,casheir,invoiceAssigned`);
        }
    }, [productId, isShow, openLoading, closeLoading]);

    return { order, loading };
}
