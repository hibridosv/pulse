'use client';

import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { ViewTitle } from "@/components/ViewTitle";
import { useCashDrawersLogic } from "@/hooks/cuts/useCashDrawersLogic";
import useCashDrawerStore from "@/stores/cashdrawersStore";
import Image from "next/image";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import { CashdrawerModal } from "@/components/cashdrawer/CashDrawerModal";
import { ToasterMessage } from "@/components/toaster-message";
import { useState } from "react";
import { CashdrawerDetails } from "@/components/cashdrawer/CashDrawerDetails";
import { useCutsLogic } from "@/hooks/cuts/useCutsLogic";
import useCutStore from "@/stores/cutStore";
import { ShowCutsTable } from "@/components/cuts/ShowCutsTable";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/Pagination";
import { CashDrawer } from "@/interfaces/cashdrawers";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { FaUser, FaUsers } from "react-icons/fa";
import { Loader } from "@/components/Loader";

export default function Page() {
  const { status } = useSession();
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  useCashDrawersLogic()
  const { cashDrawers, loading: cashDrawerLoading } = useCashDrawerStore();
  const { cuts, loading } = useCutStore();
  const { cashdrawer: cashDrawerActive, user } = useConfigStore();
  const { modals, openModal, closeModal } = useModalStore();
  const [selectDrawer, setSelectDrawer] = useState<CashDrawer>();
  const [showAll, setShowAll] = useState(true);
  useCutsLogic(`cuts?included=employee,cashdrawer${!showAll && `&filterWhere[employee_id]==${user?.id}`}&sort=-updated_at&perPage=10${currentPage}`, currentPage, showAll);

  if (status === "loading") {
    return <LoadingPage />;
  }

  const handleSelect = (select: CashDrawer) => {
    if ((cashDrawerActive && cashDrawerActive?.id == select.id) || (!cashDrawerActive && select.status == 1)) {
      setSelectDrawer(select);
      openModal('cashDrawerOpen');
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-5 border-r md:border-primary">
        <ViewTitle text="Cajas disponibles" />

        <div  className="flex justify-center py-4 px-4">
        { cashDrawerLoading ? <Loader /> :
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
                ))
              }
      </div>

    </div>
    <div className="col-span-5">
        <div className="flex justify-between">
          <ViewTitle text="Sus ultimos cortes" />
          <div onClick={()=>setShowAll(!showAll)} className="text-right">
            { showAll ? <FaUsers size={32} className="m-4 text-2xl text-sky-900 clickeable" /> : <FaUser size={32} className="m-4 text-2xl text-red-900 clickeable" /> }
          </div>
        </div>
        { loading ? <SkeletonTable columns={4} rows={10} /> : <ShowCutsTable records={cuts?.data} /> }
        <Pagination records={cuts} handlePageNumber={handlePageNumber } />
    </div> 
    {selectDrawer && (
      <CashdrawerModal isShow={modals['cashDrawerOpen']} onClose={() => closeModal('cashDrawerOpen')} drawer={selectDrawer}  />
    )}
    <CashdrawerDetails isShow={modals['cashDrawerDetails']} onClose={() => closeModal('cashDrawerDetails')}  />
    <ToasterMessage />
</div>
  );
}