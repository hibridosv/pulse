'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { TransfersForm } from "@/components/cash/transfers/TransfersForm";
import { Pagination } from "@/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useCashTransfersLogic } from "@/hooks/cash/useCashTransfersLogic";
import { TransfersTable } from "@/components/cash/transfers/TransfersTable";
import { ToasterMessage } from "@/components/toaster-message";
import cashTransferStore from "@/stores/cash/cashTransferStore";


export default function Page() {
  const { data: session, status } = useSession();
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    useCashTransfersLogic(currentPage);
    const { transfers } = cashTransferStore();
    console.log(transfers);


  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-4 border-r md:border-primary">
        <ViewTitle text="Entradas y salidas de efectivo" />
        <div className="p-4">
          <TransfersForm />
        </div>
    </div>
    <div className="col-span-6">
        <ViewTitle text="Listado de transacciones" />
        <div className="p-4">
          <TransfersTable />
        </div>
        <Pagination records={transfers} handlePageNumber={handlePageNumber } />
    </div> 
    <ToasterMessage />
</div>
  );
}
