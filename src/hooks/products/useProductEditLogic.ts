'use client'
import { getCountryProperty } from '@/lib/utils'
import { updateService } from '@/services/services'
import useConfigStore from '@/stores/configStore'
import useStateStore from '@/stores/stateStorage'
import useToastMessageStore from '@/stores/toastMessageStore'
import { useEffect } from 'react'
import useProductStore from '@/stores/productStore'

export function useProductEditLogic(id?: string, setValue?: any) {
const { loadProduct, product } = useProductStore();
  const { system } = useConfigStore();
  const { openLoading, closeLoading } = useStateStore();

  
  useEffect(() => {

    if (id) {
      loadProduct(`products/${id}?included=prices,category,subcategory,quantityUnit,provider,brand,location`);
    }
  }, [loadProduct, id]);


    useEffect(() => {
      setValue("cod", product?.cod)
      setValue("description", product?.description)
      setValue("quantity", product?.quantity)
      setValue("minimum_stock", product?.minimum_stock)
      setValue("category_id", product?.category_id)
      setValue("quantity_unit_id", product?.quantity_unit_id)
      setValue("provider_id", product?.provider_id)
      setValue("brand_id", product?.brand_id)
      setValue("location_id", product?.location_id)
      setValue("measure", product?.measure)
      setValue("default_discount", product?.default_discount)
      setValue("default_commission", product?.default_commission)
      setValue("prescription", product?.prescription)
      setValue("saved", product?.saved)

      // eslint-disable-next-line
    }, [product, setValue])


  const onSubmit = async (data: any) => {
    openLoading("productForm");
      data.product_type = product?.product_type;
      if (data.product_type != 1) {
        data.quantity = 1;
        data.minimum_stock = 1;
      }
      if (data.expiration) data.expires = 1;
    data.taxes = getCountryProperty(parseInt(system?.country)).taxes;
    try {
      const response = await updateService(`products/${id}`, data);
      useToastMessageStore.getState().setMessage(response);
    } catch (error) {
      useToastMessageStore.getState().setError(error);
      console.error(error);
    } finally {
      closeLoading("productForm");
    }
  }


  return { onSubmit }

}
