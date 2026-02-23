'use client';

import useTempStorage from '@/stores/useTempStorage';
import { HiCheck, HiUser } from 'react-icons/hi';

export function SplitClient() {
  const { getElement } = useTempStorage();
  const serviceType: number = getElement('serviceType');
  const clientActive = getElement('clientActive');

  if ((serviceType != 2 || !clientActive)) return <></>;

  return (
    <div className="w-full px-3 py-1.5 animate-fade-in mb-2">
      <div className="flex items-center gap-2.5 bg-bg-content rounded-lg shadow-sm border border-bg-subtle px-3 py-1.5 w-full">
        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105
          bg-accent/15 ring-2 ring-accent shadow-sm`}>
          <HiUser className={`w-5 h-5 transition-colors duration-300 text-accent`} />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success flex items-center justify-center shadow-md ring-2 ring-bg-content">
              <HiCheck className="w-3 h-3 text-white" />
            </div>
        </div>



        <div className="h-4 w-px bg-bg-subtle mx-1" />

        <div className="flex items-center gap-1 text-text-muted shrink-0 text-lg font-medium uppercase">
          <span>Cliente numero { clientActive } activo</span>
        </div>
      </div>
    </div>
  );
}
