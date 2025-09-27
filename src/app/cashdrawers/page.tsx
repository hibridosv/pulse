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
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { Drawers } from "@/components/cuts/Drawers";

export default function Page() {
  const { status } = useSession();
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  useCashDrawersLogic()
  const { cuts, loading } = useCutStore();
  const { cashdrawer: cashDrawerActive, user } = useConfigStore();
  const { modals, openModal, closeModal } = useModalStore();
  const [showAll, setShowAll] = useState(true);
  useCutsLogic(`cuts?included=employee,cashdrawer${!showAll && `&filterWhere[employee_id]==${user?.id}`}&sort=-updated_at&perPage=10${currentPage}`, currentPage, showAll);
  const { getSelectedElement } = useTempSelectedElementStore();
  const selectDrawer = getSelectedElement("selectDrawer");

  if (status === "loading") {
    return <LoadingPage />;
  }



  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-5 border-r md:border-primary">
        <ViewTitle text="Cajas disponibles" />
        <Drawers />
    </div>
    <div className="col-span-5">
        <div className="flex justify-between">
          <ViewTitle text="Sus ultimos cortes" />
          <div onClick={()=>setShowAll(!showAll)} className="text-right">
            { showAll ? <FaUsers size={32} className="m-4 text-2xl text-sky-900 clickeable" /> : <FaUser size={32} className="m-4 text-2xl text-red-900 clickeable" /> }
          </div>
        </div>
        { loading ? 
        <SkeletonTable columns={4} rows={10} /> : 
        <ShowCutsTable records={cuts?.data} /> }
        <Pagination records={cuts} handlePageNumber={handlePageNumber } />
    </div> 
    <CashdrawerModal isShow={modals.cashDrawerOpen} onClose={() => closeModal('cashDrawerOpen')} drawer={selectDrawer}  />
    <CashdrawerDetails isShow={modals.cashDrawerDetails} onClose={() => closeModal('cashDrawerDetails')}  />
    <ToasterMessage />
</div>
  );
}