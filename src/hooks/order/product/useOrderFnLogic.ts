'use client'
import { UpdateServiceInterface } from '@/services/Interfaces';
import useModalStore from '@/stores/modalStorage';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';

export function useOrderFnLogic() {
  const { saveOrder, loadOrder, order, payOrder, error, loadOrders, updateOrder} = ordersProductsStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const paymentType = getSelectedElement('paymentType') ?? 1;
  const { closeModal, openModal} = useModalStore();


  const save = async (id: string) => {
      await saveOrder(`orders/${id}/save`, {});
  }
   
  const select = async (id: string) => {
    await loadOrder(`orders/${id}/select`);
  }

  const pay = async (data: any) => {
        let values = {
          payment_type: paymentType,
          cash: data.cash,
          invoice_type_id: order?.invoice_type_id,
        };
      await payOrder(`orders/${order?.id}/pay`, values);
      if (!error) {
        openModal('paymentSuccess');
        await loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`);
        closeModal('payOrder');
      }
  }

  const cancel = async (id: string) => {
      console.log(id);
  }

  
  const update = async (id: string, values: UpdateServiceInterface) => {
      await updateOrder(`orders/${id}/update`, values);
  }


  return { save, select, pay, cancel, update }

}