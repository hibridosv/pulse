'use client';

import ordersStore from '@/stores/orders/ordersStore';
import useStateStore from '@/stores/tempSelectedElementStore';
import { DeliveryCard } from './DeliveryCard';

export function DeliveryOrders() {
  const { orders, loading, order } = ordersStore();
  const { getSelectedElement } = useStateStore();
  const serviceType: number = getSelectedElement('serviceType');

  if (serviceType != 3 || order || loading) return <></>;
  
  return (
    <div className="w-full px-3 py-2 animate-fade-in">
      <div className="flex flex-wrap justify-center gap-3">
        {orders && orders.map((record: any) => (
          <DeliveryCard key={record?.id} record={record} />
        ))}
      </div>
    </div>
  );
}
