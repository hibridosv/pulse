'use client'
import { UpdateServiceInterface } from '@/services/Interfaces';
import { postForPrint } from '@/services/OtherServices';
import useConfigStore from '@/stores/configStore';
import useModalStore from '@/stores/modalStorage';
import ordersRestaurantsStore from '@/stores/orders/ordersRestaurantsStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import useToastMessageStore from '@/stores/toastMessageStore';

export function useOrderRestaurantFnLogic() {
  const { saveOrder, lastResponse, order, payOrder, error, loadOrders, updateOrder, saveAs, deleteOrder, addOrder, deleteProduct } = ordersRestaurantsStore();
  const { activeConfig, system } = useConfigStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const {modals} = useModalStore();
  const payMethod = getSelectedElement('payMethod') ?? 1;
  const typeOfPrice = getSelectedElement('typeOfPrice') ?? 1;
  const clientActive = getSelectedElement('clientActive') ?? 1;
  const clientNumber = getSelectedElement('clientNumber') ?? null;
  const selectedTable = getSelectedElement('selectedTable') ?? null;
  const deliverySelected = getSelectedElement('deliverySelected');
  const specialSales = modals.specialSales ?? false;
  const { setError } = useToastMessageStore();
  const deliveryType: number = getSelectedElement('deliveryType'); // aqui, llevar, delivery
  const serviceType: number = getSelectedElement('serviceType'); // aqui, mesas, delivery
  const { setMessage} = useToastMessageStore();



const addNew = async (producId: any, quantity = 1) => {
    if (!producId){
        setError({ message: "No hay una cantidad para facturar "});
        return
    }
    let values = {
      product_id: producId,
      request_type: 1, // 1: id, 2: cod
      delivery_type: deliveryType, // 1: Aqui, 2: Llevar, 3: delivery
      delivery_client: deliverySelected ? deliverySelected?.id : null, // id del cliente delivery
      order_type: serviceType, // 1. rapida, 2. Mesas, 3. Delivery
      price_type: typeOfPrice, // tipo de precio del producto
      clients_quantity: 1, // Numero de clientes
      client_active: clientActive, // Cliente activo para asignar producto
      quantity,
      restaurant_table_id: selectedTable,
      special: specialSales,
    };
    await addOrder(`orders/restaurant`, values);
          
}

/** GUardar la orden y mada comandas a imprimir si asi se necesita */
  const save = async (id: string, withOrder: boolean = false) => {
      await saveOrder(`orders/restaurant/${id}/save`, { with_order: withOrder });
      if (!error && withOrder) {
        setMessage({message: "Imprimiendo pre cuenta"})
        if (activeConfig && activeConfig.includes("print-local")) {
          await postForPrint(system?.local_url_print ?? 'http://127.0.0.1/impresiones/', 'POST', lastResponse);
        }
      }
  }

  /** Actualizar un campo de la orden */
  const update = async (id: string, values: UpdateServiceInterface) => {
      await updateOrder(`orders/${id}/update`, values);
  }

  /** las opciones de un producto */
  const option = async (id: string, values: any) => {
      await updateOrder(`orders/restaurant/${id}/option`, values);
  }



/// pagar orden
const pay = async (data: any) => {
    let values = {
      cash: data.cash || 0,
      payment_type: payMethod, // efectivo, tarjeta, transferencia, cheque, credito
      invoice_type_id: order?.invoice_type_id,
      client_active: clientActive, // Cliente activo para asignar producto
      client_number: clientNumber
    };
    await payOrder(`orders/restaurant/${order.id}/pay`, values);
}


  return { addNew, save, update, option, pay }

}