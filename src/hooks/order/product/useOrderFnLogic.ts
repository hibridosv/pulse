'use client'
import useModalStore from '@/stores/modalStorage';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';

export function useOrderFnLogic() {
  const { saveOrder, loadOrder, order, payOrder, error, loadOrders} = ordersProductsStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const paymentType = getSelectedElement('paymentType') ?? 1;
  const { closeModal, openModal} = useModalStore();


  const save = async (id: string) => {
      await saveOrder(`orders/${id}/save`, {});
  }
   
  const select = async (id: string) => {
    await loadOrder(`order/${id}/select`);
  }

  const pay = async (data: any) => {
        let values = {
          payment_type: paymentType,
          cash: data.cash,
          invoice_type_id: order?.invoice_type_id,
        };
      await payOrder(`orders/${order?.id}/pay`, values);
      if (!error) {
        await loadOrders(`orders?included=employee,client,invoiceproducts&filterWhere[status]==2`);
        closeModal('payOrder');
        openModal('paymentSuccess');
      }
  }

  const cancel = async (id: string) => {
      console.log(id);
  }


  return { save, select, pay, cancel }

}