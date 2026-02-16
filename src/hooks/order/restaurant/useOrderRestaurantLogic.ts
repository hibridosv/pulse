'use client'
import { groupInvoiceProductsByCodSpecial } from '@/components/orders/utils';
import useReverb from '@/hooks/useReverb';
import { getFirstElement } from '@/lib/utils';
import useConfigStore from '@/stores/configStore';
import useModalStore from '@/stores/modalStorage';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { useEffect, useRef } from 'react';

/**
 * Carga la lógica para la gestión de productos en una orden.
 * Obtiene el tipo de busqueda en el formulario de busqueda de productos. con @typeOfSearch 0 = por código, 1 = por descripción.
 * @param initialLoad 
 */

export function useOrderRestaurantLogic(initialLoad: boolean = false) {
  const { activeConfig, invoiceTypes, user, tenant } = useConfigStore();
  const { getSelectedElement, setSelectedElement } = useTempSelectedElementStore();
  const invoiceTypeSelected = getSelectedElement('invoiceTypeSelected');
  const serviceType: number = getSelectedElement('serviceType');

  const { loadOrder, loadOrders, setOrders, order } = ordersProductsStore();
  const invoiceSelected = getFirstElement(invoiceTypes, 'status', 1); // selecciona el tipo de factura predeterminada
  const { openModal } = useModalStore();
  const isRealTime = activeConfig && activeConfig.includes('realtime-orders');
  const orderLoaded = useRef(false);
  
  const { data: pusherData} = useReverb(`${tenant?.id}-channel-orders`, 'PusherOrderEvent', isRealTime);


  
  // para sistema de productos
  useEffect(() => {
        if (initialLoad && activeConfig) {
            if (!serviceType) {
               setSelectedElement('serviceType', 1);
            }
            
           if (!invoiceTypeSelected) {
              setSelectedElement('invoiceTypeSelected', invoiceSelected);
           }
           setSelectedElement('typeOfPrice', 1); // tipo de precio
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoad, activeConfig, invoiceSelected, invoiceTypeSelected, setSelectedElement, serviceType])


  useEffect(() => {
    if (!initialLoad || !user || orderLoaded.current) return;

    const loadInitialData = async () => {
      orderLoaded.current = true;
      await loadOrder(`orders/find?filterWhere[status]==1&filterWhere[opened_by_id]==${user?.id}&included=products,invoiceproducts,delivery,client,invoiceAssigned,employee,invoiceproducts.attributes.workstation,attributes,table,invoiceproducts.options.option`, false);
      const currentOrder = ordersProductsStore.getState().order;
      if (!currentOrder) {
        loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
      }
    };

    loadInitialData();
  }, [initialLoad, user, loadOrder, loadOrders]);


/** Cargar Ordenes al realizar un evento de Pusher solo para los usuarios que no envia en evento */
  useEffect(() => {
    if (user && user.id == pusherData?.userId) return
    if (!pusherData) return;
    if (pusherData.data) {
       setOrders(pusherData.data); 
    }
   }, [loadOrders, pusherData, user, setOrders]);


   // verificar si exite algun producto con venta especial sin terminar el preoceso
   useEffect(() => {
      if (initialLoad && order) {
         if (order && order?.invoiceproducts && groupInvoiceProductsByCodSpecial(order).length > 0) {
            openModal('specialSales')
         }


         if (order.order_type != serviceType) {
               setSelectedElement('serviceType', order.order_type);
         }
      }
  }, [initialLoad, order, openModal, serviceType, setSelectedElement])


   
}