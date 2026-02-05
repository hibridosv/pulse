'use client'
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
  const { activeConfig } = useConfigStore();
  const { getSelectedElement, setSelectedElement } = useTempSelectedElementStore();
  const typeOfSearch = getSelectedElement('typeOfSearch');
  const { loadOrder, loadOrders } = ordersProductsStore();
  const { user } =  useConfigStore();

  useEffect(() => {
        if (initialLoad && activeConfig) {
           if (activeConfig.includes('sales-by-name') && typeOfSearch === undefined) {
            setSelectedElement('typeOfSearch', true);
           } else {
            setSelectedElement('typeOfSearch', false);
           }
        }
  }, [initialLoad, activeConfig])

  useEffect(() => {
    if (user && initialLoad) {
     loadOrder(`orders/find?filterWhere[status]==1&filterWhere[opened_by_id]==${user?.id}&included=products,invoiceproducts,delivery,client,invoiceAssigned,employee,referred`);
    }
   }, [initialLoad, user]);


  useEffect(() => {
    if (initialLoad) {
     loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`);
    }
   }, [initialLoad]);

   
}