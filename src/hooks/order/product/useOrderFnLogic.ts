'use client'
import { UpdateServiceInterface } from '@/services/Interfaces';
import useModalStore from '@/stores/modalStorage';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import useToastMessageStore from '@/stores/toastMessageStore';

export function useOrderFnLogic() {
  const { saveOrder, loadOrder, order, payOrder, error, loadOrders, updateOrder, saveAs, deleteOrder, addOrder, deleteProduct } = ordersProductsStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const paymentType = getSelectedElement('paymentType') ?? 1;
  const typeOfPrice = getSelectedElement('typeOfPrice') ?? 1;
  const isSpecialSale = getSelectedElement('isSpecialSale') ?? false;
  const { setError } = useToastMessageStore();
  const { closeModal, openModal} = useModalStore();

/// agrega una orden o un producto
const addNew = async (data: any) => {
    if (!data.cod){
      setError({ message: "Error en el código"});
      return
    }
    let values = {
      product_id: data.cod,
      order_id: order ? order.id : null,
      request_type: 2, // 1: id, 2: cod
      delivery_type: 1, // delivery, recoger en tienda, ecommerce
      order_type: 1, // venta, consignacion, ecommerce
      price_type: typeOfPrice, // tipo de precio del producto
      addOrSubtract: data.addOrSubtract ? data.addOrSubtract : 1, // 1 sumar 2 restar
      special: isSpecialSale, // determina si es venta especial, debe activarse cuando se activa el modal
    };
    await addOrder(`orders`, values);
}

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
      await deleteOrder(`orders/${id}`);
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


    /** Eliminar producto de la orden */
  const del = async (id: string) => {
      await deleteProduct(`orders/product/${id}`);
  }


  return { addNew, save, select, pay, cancel, update, quote, remissionNote, del }

}