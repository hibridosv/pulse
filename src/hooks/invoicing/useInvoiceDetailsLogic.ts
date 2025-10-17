import { getServices } from '@/services/services';
import useStateStore from '@/stores/stateStorage';
import { useEffect, useState, useCallback } from 'react';

export function useInvoiceDetailsLogic(invoiceId: string, isShow: boolean) {
    const [order, setOrder] = useState(null) as any;
    const { openLoading, closeLoading, loading } = useStateStore();

    const fetchOrder = useCallback(async () => {
        if (isShow && invoiceId) {
            openLoading("getOrder");
            try {
                const iden = invoiceId.toLowerCase();
                const url = `orders/find?filter[id]==${iden}&included=products,invoiceproducts,employee,client,referred,delivery,casheir,invoiceAssigned`;
                const response = await getServices(url);
                setOrder(response.data.data);
            } catch (error) {
                console.error('Error fetching data', error);
                setOrder(null);
            } finally {
                closeLoading("getOrder");
            }
        }
    }, [invoiceId, isShow, openLoading, closeLoading]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return { order, loading, refetchOrder: fetchOrder };
}
