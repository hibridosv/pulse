'use client'
import { groupInvoiceProductsByCodSpecial } from '@/components/orders/utils';
import { getFirstElement } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import useModalStore from '@/stores/modalStorage';
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
  const typeOfSearch = getSelectedElement('typeOfSearch'); // tipo de busqueda
  const invoiceTypeSelected = getSelectedElement('invoiceTypeSelected');
  const { loadOrder, loadOrders } = ordersProductsStore();
  const { user } =  useConfigStore();
  const invoiceSelected = getFirstElement(invoiceTypes, 'status', 1); // selecciona el tipo de factura predeterminada
  const {  order } = ordersProductsStore();
  const { openModal } = useModalStore();

  

  useEffect(() => {
        if (initialLoad && activeConfig) {
            if (typeOfSearch === undefined) {
               if (activeConfig.includes('sales-by-name')) {
                  setSelectedElement('typeOfSearch', true);
               } else {
                  setSelectedElement('typeOfSearch', false);
               }
            }
            
           if (!invoiceTypeSelected) {
              setSelectedElement('invoiceTypeSelected', invoiceSelected);
           }
           setSelectedElement('typeOfPrice', 1); // tipo de precio
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoad, activeConfig, invoiceSelected, invoiceTypeSelected, setSelectedElement, typeOfSearch])

  useEffect(() => {
    if (user && initialLoad) {
     loadOrder(`orders/find?filterWhere[status]==1&filterWhere[opened_by_id]==${user?.id}&included=products,invoiceproducts,delivery,client,invoiceAssigned,employee,referred`, false);
    }
   }, [initialLoad, user, loadOrder]);


  useEffect(() => {
    if (initialLoad) {
     loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
    }
   }, [initialLoad, loadOrders]);


   // verificar si exite algun producto con venta especial sin terminar el preoceso
     useEffect(() => {
        if (initialLoad && order) {
            if (order && order?.invoiceproducts && groupInvoiceProductsByCodSpecial(order).length > 0) {
               openModal('specialSales')
            }
        }
  }, [initialLoad, order, openModal])

   
}