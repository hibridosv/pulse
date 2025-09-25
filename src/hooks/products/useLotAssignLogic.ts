import { useEffect, useState } from 'react';
import { Product } from '@/interfaces/products';
import { getServices } from '@/services/services';
import useStateStore from '@/stores/stateStorage';



export function useLotAssignLogic(product: Product, isShow: boolean) {
    const [ lots, setLots ] = useState(null) as any;
    const { openLoading, closeLoading } = useStateStore();

    useEffect(() => {
        const fetchData = async (url: string) => {
            openLoading("lotAssign");
            try {
                const response = await getServices(url);
                setLots(response.data.data);
            } catch (error) {
                console.error('Error fetching data');
            } finally {
                closeLoading("lotAssign");
            }
        }

        if (isShow && product?.id) {
            fetchData(`registers?filterWhere[product_id]==${product?.id}&filterWhere[status]==1`);
        }
    }, [product?.id, isShow]);

    return { lots };
}
