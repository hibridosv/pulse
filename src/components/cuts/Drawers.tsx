'use client';

import { CashDrawer } from "@/interfaces/cashdrawers";
import useCashDrawerStore from "@/stores/cashdrawer/cashdrawersStore";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import useTempStorage from "@/stores/useTempStorage";
import Image from "next/image";
import { SkeletonDrawers } from "../skeleton/SkeletonDrawers";



export function Drawers() {
  const { cashDrawers, loading: cashDrawerLoading } = useCashDrawerStore();
  const {  openModal } = useModalStore();
  const { setElement } = useTempStorage();
  const { cashdrawer: cashDrawerActive, user } = useConfigStore();

  const handleSelect = (select: CashDrawer) => {
    if ((cashDrawerActive && cashDrawerActive?.id == select.id) || (!cashDrawerActive && select.status == 1)) {
      setElement("selectDrawer", select);
      openModal('cashDrawerOpen');
    }
  }

  return (
        <div  className="flex justify-center py-4 px-4">
            { cashDrawerLoading ? <SkeletonDrawers /> :
            cashDrawers?.data && cashDrawers?.data.map((cash: any) => (
                <div key={cash.id} className="md:mx-6 mx-2 shadow-2xl shadow-slate-900 rounded-t-full clickeable" 
                onClick={()=>handleSelect(cash)}>
                <Image
                    src={ cash.status == 1 ? "/img/cashdrawer.png" : cashDrawerActive?.id == cash.id ? "/img/cashdrawer_active.png" : "/img/cashdrawer_block.png"}
                    alt="CashDrawer"  width={168} height={168} priority={false} />
                    <div className="flex justify-center uppercase font-bold text-lg text-cyan-600">{ cash.name }</div>
                    <div className="flex justify-center text-sm text-blue-600 mb-2">
                    { cash?.employee ? cash?.employee?.name : cash.status == 1 ? "Disponible" : "Aperturada" }
                    </div>
                </div>
             ))}
      </div>
  );
}