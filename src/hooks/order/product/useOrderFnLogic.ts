'use client'
import { UpdateServiceInterface } from '@/services/Interfaces';
import useModalStore from '@/stores/modalStorage';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';

export function useOrderFnLogic() {
  const { saveOrder, loadOrder, order, payOrder, error, loadOrders, updateOrder, saveAs, deleteOrder } = ordersProductsStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const paymentType = getSelectedElement('paymentType') ?? 1;
  const { closeModal, openModal} = useModalStore();

/** GUardar la orden en la que se trabaj */
  const save = async (id: string) => {
      await saveOrder(`orders/${id}/save`, {});
      if (!error) {
        await loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
      }
  }
   
  /** Seleccionar una orden con id */
  const select = async (id: string) => {
    await loadOrder(`orders/${id}/select`);
  }

  /** Cobrar o terminar orden */
  const pay = async (data: any) => {
        let values = {
          payment_type: paymentType,
          cash: data.cash,
          invoice_type_id: order?.invoice_type_id,
        };
      await payOrder(`orders/${order?.id}/pay`, values);
      if (!error) {
        openModal('paymentSuccess');
        await loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
        closeModal('payOrder');
      }
  }

  /** Eliminar la orden */
  const cancel = async (id: string) => {
      deleteOrder(`orders/${id}`);
      if (!error) {
        await loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
      }
  }

  /** Actualizar un campo de la orden */
  const update = async (id: string, values: UpdateServiceInterface) => {
      await updateOrder(`orders/${id}/update`, values);
  }

 /* Guardar como cotizacion */ 
  const quote = async (id: string) => {
    await saveAs(`tools/quotes/${id}`, {});
    if (!error) {
        await loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
      }
  }

 /* Guardar como nota de remision */ 
  const remissionNote = async (id: string, type: number) => {
    await saveAs(`remissions/${id}/${type}`, {});
    if (!error) {
        await loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`, false);
      }
  }


  return { save, select, pay, cancel, update, quote, remissionNote }

}