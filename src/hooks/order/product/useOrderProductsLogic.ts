'use client'
import { getFirstElement } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { useEffect } from 'react';

/**
 * Carga la lógica para la gestión de productos en una orden.
 * Obtiene el tipo de busqueda en el formulario de busqueda de productos. con @typeOfSearch 0 = por código, 1 = por descripción.
 * @param initialLoad 
 */

export function useOrderProductsLogic(initialLoad: boolean = false) {
  const { activeConfig, invoiceTypes } = useConfigStore();
  const { getSelectedElement, setSelectedElement } = useTempSelectedElementStore();
  const typeOfSearch = getSelectedElement('typeOfSearch');
  const invoiceTypeSelected = getSelectedElement('invoiceTypeSelected');

  const { loadOrder, loadOrders } = ordersProductsStore();
  const { user } =  useConfigStore();
  const invoiceSelected = getFirstElement(invoiceTypes, 'status', 1);


  useEffect(() => {
        if (initialLoad && activeConfig) {
           console.log("Load Config and dependences"); 
           if (activeConfig.includes('sales-by-name') && typeOfSearch === undefined) {
            setSelectedElement('typeOfSearch', true);
           } else {
            setSelectedElement('typeOfSearch', false);
           }

           if (!invoiceTypeSelected) {
              setSelectedElement('invoiceTypeSelected', invoiceSelected);
           }
        }
  }, [initialLoad, activeConfig, invoiceSelected, invoiceTypeSelected, setSelectedElement, typeOfSearch])

  useEffect(() => {
    if (user && initialLoad) {
    console.log("Load order");
     loadOrder(`orders/find?filterWhere[status]==1&filterWhere[opened_by_id]==${user?.id}&included=products,invoiceproducts,delivery,client,invoiceAssigned,employee,referred`, false);
    }
   }, [initialLoad, user, loadOrder]);


  useEffect(() => {
    if (initialLoad) {
      console.log("Load orders");
     loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
    }
   }, [initialLoad, loadOrders]);

   
}