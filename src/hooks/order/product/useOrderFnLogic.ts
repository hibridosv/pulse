'use client'
import ordersProductsStore from '@/stores/orders/ordersProductsStore';

export function useOrderFnLogic() {
  const { saveOrder } = ordersProductsStore();

  const save = async (data: any) => {
      await saveOrder(`orders/${data.id}/save`, {});
  }
   

  return { save }

}