'use client';

import ordersStore from '@/stores/orders/ordersStore';
import restauranMenuStore from '@/stores/orders/restauranMenuStore';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import { HiCheck, HiUser } from 'react-icons/hi2';

export function RestaurantClients() {
  const { loading, restaurantMenu: images } = restauranMenuStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const serviceType: number = getSelectedElement('serviceType');
  const clientActive: number = getSelectedElement('clientActive');
  const selectedTable = getSelectedElement('selectedTable');
  const { order } = ordersStore();

  if ((serviceType != 2 || !selectedTable)) return <></>;

  let clients = [1, 2, 3, 4, 5];

  const listItems = clients.map((record: any, index: number) => {
    const isActive = clientActive == record;
    return (
      <div
        key={record}
        className="group clickeable animate-scale-in flex flex-col items-center gap-1.5"
        onClick={() => console.log(record)}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Avatar */}
        <div className={`
          relative w-12 h-12 rounded-full flex items-center justify-center
          transition-all duration-300 group-hover:scale-105 group-hover:shadow-md
          ${isActive
            ? 'bg-primary shadow-md shadow-primary/25'
            : 'bg-bg-subtle/70 group-hover:bg-primary/15'
          }
        `}>
          {isActive ? (
            <HiCheck className="w-5 h-5 text-text-inverted" />
          ) : (
            <HiUser className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors duration-300" />
          )}
          {isActive && (
            <div className="absolute inset-0 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-bg-base" />
          )}
        </div>

        {/* Nombre */}
        <span className={`
          text-[11px] font-semibold transition-colors duration-300
          ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-base'}
        `}>
          Cliente {record}
        </span>
      </div>
    );
  });

  const clientMock = () => (
    <div className="flex gap-5 justify-center">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-full bg-bg-subtle animate-pulse" />
          <div className="h-2.5 w-12 rounded bg-bg-subtle animate-pulse" />
        </div>
      ))}
    </div>
  );

  const clientAlone = () => (
    <div className="animate-fade-in flex flex-col items-center gap-1.5">
      <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-primary shadow-md shadow-primary/25">
        <HiCheck className="w-5 h-5 text-text-inverted" />
        <div className="absolute inset-0 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-bg-base" />
      </div>
      <span className="text-[11px] font-semibold text-primary">Cliente 1</span>
    </div>
  );

  return (
    <div className="w-full px-3 py-3 animate-fade-in">
      <div className="flex flex-wrap justify-center gap-5">
        {loading ? clientMock() : listItems ? listItems : clientAlone()}
      </div>
    </div>
  );
}
