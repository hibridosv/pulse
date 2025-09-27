'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { HistoryTable } from "@/components/cash/history/HistoryTable";
import { useCashHistoryLogic } from "@/hooks/cash/useCashHistoryLogic";
import cashTransferStore from "@/stores/cash/cashTransferStore";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/Pagination";
import { CashTotal } from "@/components/cash/history/CashTotal";
import { ToasterMessage } from "@/components/toaster-message";
import { AccountsTransfersModal } from "@/components/cash/accounts/AccountsTransfersModal";
import useModalStore from "@/stores/modalStorage";
import { Button, Preset } from "@/components/button/button";


export default function Page() {
  const { data: session, status } = useSession();
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    useCashHistoryLogic(currentPage);
    const { history } = cashTransferStore();
    const { modals, openModal, closeModal } = useModalStore();

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Historial de transacciones" />
        <div className="p-4">
          <HistoryTable />
        </div>
        <Pagination records={history} handlePageNumber={handlePageNumber } />
    </div>
    <div className="col-span-3">
        <ViewTitle text="Total en cuentas" />
        <div className="p-4">
          <CashTotal />
        </div>
        <div className="p-4 flex justify-center">
          <Button preset={Preset.primary} text="Transferir entre cuentas" onClick={()=> openModal("AccountsTransfers")}/>
        </div>
    </div>  
    <AccountsTransfersModal isShow={modals.AccountsTransfers} onClose={()=>{ closeModal("AccountsTransfers")}} />
    <ToasterMessage />
</div>
  );
}
