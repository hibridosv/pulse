'use client'
import { groupInvoiceProductsByCodSpecial } from '@/components/orders/utils';
import useReverb from '@/hooks/useReverb';
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
  const { activeConfig, invoiceTypes, user, tenant } = useConfigStore();
  const { getSelectedElement, setSelectedElement } = useTempSelectedElementStore();
  const typeOfSearch = getSelectedElement('typeOfSearch'); // tipo de busqueda
  const invoiceTypeSelected = getSelectedElement('invoiceTypeSelected');
  const { loadOrder, loadOrders, setOrders, order } = ordersProductsStore();
  const invoiceSelected = getFirstElement(invoiceTypes, 'status', 1); // selecciona el tipo de factura predeterminada
  const { openModal } = useModalStore();
   const isRealTime = activeConfig && activeConfig.includes('realtime-orders');
  
  const { random: pusherRandom, data: pusherData} = useReverb(`${tenant?.id}-channel-orders`, 'PusherOrderEvent', isRealTime);


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
    if (user && initialLoad && !order) {
     loadOrder(`orders/find?filterWhere[status]==1&filterWhere[opened_by_id]==${user?.id}&included=products,invoiceproducts,delivery,client,invoiceAssigned,employee,referred`, false);
    }
   if (initialLoad && !order) {
     loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
   }
   }, [initialLoad, user, loadOrder, loadOrders, order]);


/** Cargar Ordenes al realizar un evento de Pusher solo para los usuarios que no envia en evento */
  useEffect(() => {
    if (user && user.id != pusherData?.userId) return
      console.log(pusherData);
      // setOrders(pusherData); 
   }, [loadOrders, pusherRandom, pusherData, user]);


   // verificar si exite algun producto con venta especial sin terminar el preoceso
   useEffect(() => {
      if (initialLoad && order) {
         if (order && order?.invoiceproducts && groupInvoiceProductsByCodSpecial(order).length > 0) {
            openModal('specialSales')
         }
      }
  }, [initialLoad, order, openModal])

   
}