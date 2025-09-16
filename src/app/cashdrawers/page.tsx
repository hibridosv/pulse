'use client';

import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { ViewTitle } from "@/components/ViewTitle";
import { useCashDrawersLogic } from "@/hooks/useCashDrawersLogic";
import useCashDrawerStore from "@/stores/cashdrawersStore";
import Image from "next/image";
import useConfigStore from "@/stores/configStore";
// import { CashdrawerOpenModal } from "@/components/cashdrawer/CashDrawerOpenModal";
import useModalStore from "@/stores/modalStorage";
import { CashdrawerOpenModal } from "@/components/cashdrawer/CashDrawerOpenModal";

export default function Page() {
  const { status } = useSession();
  useCashDrawersLogic()
  const { cashDrawers } = useCashDrawerStore();
  const { cashdrawer: cashDrawerActive } = useConfigStore();
  const { modals, openModal, closeModal } = useModalStore();

  console.log("Cash drawers", cashDrawers);

  // if (status === "loading") {
  //   return <LoadingPage />;
  // }
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-5 border-r md:border-primary">
        <ViewTitle text="Cajas disponibles" />

        <div  className="flex justify-center py-4 px-4">
        {
          cashDrawers?.data && cashDrawers?.data.map((cash: any) => (
            <div key={cash.id} className="md:mx-6 mx-2 shadow-2xl shadow-slate-900 rounded-t-full clickeable" 
            onClick={()=>openModal('cashDrawerOpen')}>
              <Image
                  src={ cash.status == 1 ? "/img/cashdrawer.png" : cashDrawerActive?.id == cash.id ? "/img/cashdrawer.png" : "/img/cashdrawer_block.png"}
                  alt="CashDrawer"  width={168} height={168} priority={false} />
                <div className="flex justify-center uppercase font-bold text-lg text-cyan-600">{ cash.name }</div>
                <div className="flex justify-center text-sm text-blue-600 mb-2">
                  { cash?.employee ? cash?.employee?.name : cash.status == 1 ? "Disponible" : "Aperturada" }
                </div>
            </div>
                ))
              }
      </div>

    </div>
    <div className="col-span-5">
        <div className="flex justify-between">
          <ViewTitle text="Sus ultimos cortes" />
        </div>

    </div> 
    <CashdrawerOpenModal isShow={modals['cashDrawerOpen']} onClose={() => closeModal('cashDrawerOpen')} drawer={cashDrawerActive}  />
</div>
  );
}