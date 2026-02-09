'use client'
import ordersProductsStore from '@/stores/orders/ordersProductsStore';

export function useOrderFnLogic() {
  const { saveOrder, loadOrder } = ordersProductsStore();

  const save = async (id: string) => {
      await saveOrder(`orders/${id}/save`, {});
  }
   
  const select = async (id: string) => {
    await loadOrder(`order/${id}/select`);
  }

  const pay = async (id: string) => {
      console.log(id);
  }

  const cancel = async (id: string) => {
      console.log(id);
  }


  return { save, select, pay, cancel }

}