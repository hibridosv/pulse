'use client';

import ordersStore from '@/stores/orders/ordersStore';
import useTempStorage from '@/stores/useTempStorage';
import { HiCheck, HiUser } from 'react-icons/hi2';

export function RestaurantClients() {
  const { getElement } = useTempStorage();
  const serviceType: number = getElement('serviceType');
  const clientActive: number = getElement('clientActive');
  const selectedTable = getElement('selectedTable');
  const { order } = ordersStore();

  if ((serviceType != 2 || !selectedTable)) return <></>;


const listItems = order?.attributes && JSON.parse(order?.attributes.clients)?.map((record: any, index: number) => {
    const isActive = clientActive == record;
    return (
      <div key={record} className="group clickeable animate-scale-in flex flex-col items-center gap-1.5" onClick={() => console.log(record)} style={{ animationDelay: `${index * 50}ms` }} >
        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105
          ${isActive ? 'bg-accent/15 ring-2 ring-accent shadow-sm' : 'bg-bg-subtle/70 group-hover:bg-primary/15' }`}>
          <HiUser className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-text-muted group-hover:text-primary'}`} />
          {isActive && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center shadow-md ring-2 ring-bg-content">
              <HiCheck className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <span className={`text-[11px] font-semibold transition-colors duration-300
          ${isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-base'}`}>
          Cliente {record}
        </span>
      </div>
    );
  });


  const clientAlone = () => (
    <div className="animate-fade-in flex flex-col items-center gap-1.5">
      <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-accent/15 ring-2 ring-accent shadow-sm">
        <HiUser className="w-5 h-5 text-accent" />
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center shadow-md ring-2 ring-bg-content">
          <HiCheck className="w-3 h-3 text-white" />
        </div>
      </div>
      <span className="text-[11px] font-semibold text-accent">Cliente 1</span>
    </div>
  );

  return (
    <div className="w-full px-3 py-3 animate-fade-in">
      <div className="flex flex-wrap justify-center gap-5">
        { listItems ? listItems : clientAlone()}
      </div>
    </div>
  );
}
