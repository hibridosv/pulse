'use client'
import useStateStore from '@/stores/stateStorage'
import { use, useEffect, useState } from 'react'
import { getServices } from '@/services/services'
import { Price } from '@/interfaces/price';
import useToastMessageStore from '@/stores/toastMessageStore';

export function useProductPricesEditLogic(ProductId: string, isShow: boolean) {
    const [ prices, setPrices ] = useState<Price[] | null>();
    const { openLoading, closeLoading } = useStateStore();

    const fetchDataPrices = async (url: string) => {
        openLoading("productPrices");
        try {
            const response = await getServices(url);
            setPrices(response.data.data);
        } catch (error) {
                console.error('Error fetching data:', error);
        } finally {
            closeLoading("productPrices");
        }
    };
  
    useEffect(() => {
        if (isShow && ProductId) {
            fetchDataPrices(`prices?sort=-created_at&filterWhere[product_id]==${ProductId}`);
        }
    }, [isShow, ProductId]);

    const deletePrice = async (id: string) => {
        try {
            const response = await deletePrice(`prices/${id}`);
            useToastMessageStore.getState().setMessage(response);
            await fetchDataPrices(`prices?sort=-created_at&filterWhere[product_id]==${ProductId}`);
        } catch (error) {
            useToastMessageStore.getState().setError(error);
        }
    }



    return { prices, deletePrice  }

}
