'use client';

import { CashDrawer } from "@/interfaces/cashdrawers";
import useCashDrawerStore from "@/stores/cashdrawer/cashdrawersStore";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import useTempStorage from "@/stores/useTempStorage";
import Image from "next/image";
import { BsUnlockFill } from "react-icons/bs";
import { LuLock, LuUser } from "react-icons/lu";
import { SkeletonDrawers } from "../skeleton/SkeletonDrawers";

export function Drawers() {
  const { cashDrawers, loading: cashDrawerLoading } = useCashDrawerStore();
  const { openModal } = useModalStore();
  const { setElement } = useTempStorage();
  const { cashdrawer: cashDrawerActive } = useConfigStore();

  const handleSelect = (select: CashDrawer) => {
    if ((cashDrawerActive && cashDrawerActive?.id == select.id) || (!cashDrawerActive && select.status == 1)) {
      setElement("selectDrawer", select);
      openModal('cashDrawerOpen');
    }
  };

  const isClickable = (cash: any) =>
    (cashDrawerActive && cashDrawerActive?.id == cash.id) || (!cashDrawerActive && cash.status == 1);

  if (cashDrawerLoading) return <SkeletonDrawers />;

  return (
    <div className="flex flex-wrap justify-center gap-5 py-6 px-4">
      {cashDrawers?.data?.map((cash: any) => {
        const clickable = isClickable(cash);
        const isActive = cashDrawerActive?.id == cash.id;
        const isAvailable = cash.status == 1;

        const borderClass = isActive
          ? 'border-primary'
          : isAvailable
            ? 'border-success/60'
            : 'border-bg-subtle';

        const badgeBg = isActive
          ? 'bg-primary/10 text-primary'
          : isAvailable
            ? 'bg-success/10 text-success'
            : 'bg-bg-subtle text-text-muted';

        const badgeLabel = isActive ? 'Aperturada' : isAvailable ? 'Disponible' : 'Ocupada';

        const employeeText = cash?.employee?.name ?? (isAvailable ? 'Sin asignar' : '—');

        return (
          <div
            key={cash.id}
            onClick={() => handleSelect(cash)}
            className={`w-36 bg-bg-content rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-200 flex flex-col
              ${borderClass}
              ${clickable ? 'clickeable hover:shadow-lg hover:-translate-y-1' : 'opacity-50 cursor-default'}
            `}
          >
            <div className={`flex justify-center pt-4 pb-2 ${isActive ? 'bg-primary/5' : isAvailable ? 'bg-success/5' : 'bg-bg-subtle/40'}`}>
              <Image
                src={isAvailable ? "/img/cashdrawer.png" : isActive ? "/img/cashdrawer_active.png" : "/img/cashdrawer_block.png"}
                alt="CashDrawer"
                width={80}
                height={80}
                priority={false}
              />
            </div>

            <div className="px-2.5 pb-3 pt-1.5 flex flex-col gap-1.5">
              <p className="font-bold text-xs uppercase tracking-wide text-text-base text-center truncate">
                {cash.name}
              </p>

              <span className={`self-center text-xs font-semibold px-2 py-0.5 rounded-full ${badgeBg}`}>
                {badgeLabel}
              </span>

              <div className="flex items-center gap-1 text-xs rounded-lg px-2 py-1 bg-bg-subtle/60">
                {isAvailable
                  ? <BsUnlockFill size={10} className="shrink-0 text-text-muted" />
                  : isActive
                    ? <LuUser size={10} className="shrink-0 text-primary" />
                    : <LuLock size={10} className="shrink-0 text-text-muted" />
                }
                <span className={`truncate ${isActive ? 'text-primary font-medium' : 'text-text-muted'}`}>
                  {employeeText}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
