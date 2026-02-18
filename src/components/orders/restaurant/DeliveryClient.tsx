'use client';

import ordersStore from '@/stores/orders/ordersStore';
import useTempStorage from '@/stores/useTempStorage';
import Image from 'next/image';
import { GoEye } from 'react-icons/go';
import { HiMapPin, HiPhone } from 'react-icons/hi2';

export function DeliveryClient() {
  const { getSelectedElement } = useTempStorage();
  const serviceType: number = getSelectedElement('serviceType');
  const clientOrder = getSelectedElement('clientOrder');
  const { order } = ordersStore();

  if ((serviceType != 3 || !clientOrder)) return <></>;

  return (
    <div className="w-full px-3 py-1.5 animate-fade-in mb-2">
      <div className="flex items-center gap-2.5 bg-bg-content rounded-lg shadow-sm border border-bg-subtle px-3 py-1.5 w-full">
        <div className="relative shrink-0">
          <Image src="/img/delivery.jpg" alt="Delivery" width={36} height={36} className="rounded-full ring-2 ring-accent/30" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success flex items-center justify-center ring-2 ring-bg-content">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

        <span className="font-semibold text-xs text-text-base" title={clientOrder?.name}>{clientOrder?.name}</span>
        <GoEye className="w-4 h-4 text-accent clickeable shrink-0 hover:scale-110 transition-transform" title="Ver información" />

        <div className="h-4 w-px bg-bg-subtle mx-1" />

        <div className="flex items-center gap-1 text-xs text-text-muted min-w-0" title={clientOrder?.address}>
          <HiMapPin className="w-3.5 h-3.5 text-accent/70 shrink-0" />
          <span className="">{clientOrder?.address}</span>
        </div>

        <div className="h-4 w-px bg-bg-subtle mx-1" />

        <div className="flex items-center gap-1 text-xs text-text-muted shrink-0">
          <HiPhone className="w-3.5 h-3.5 text-accent/70" />
          <span>{clientOrder?.phone}</span>
        </div>
      </div>
    </div>
  );
}
