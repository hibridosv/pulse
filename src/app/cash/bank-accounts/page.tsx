'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { AccountForm } from "@/components/cash/accounts/AccountForm";
import { AccountsTable } from "@/components/cash/accounts/AccountsTable";
import { ToasterMessage } from "@/components/toaster-message";
import { AccountsTransfersModal } from "@/components/cash/accounts/AccountsTransfersModal";
import useModalStore from "@/stores/modalStorage";
import { MdCurrencyExchange } from "react-icons/md";
import { useCashAccountLogic } from "@/hooks/cash/useCashAccountLogic";


export default function Page() {
  const { data: session, status } = useSession();
  useCashAccountLogic(); 
  const { modals, openModal, closeModal } = useModalStore();


  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-4 border-r md:border-primary">
        <ViewTitle text="Nueva Cuenta" />
        <div className="p-4">
          <AccountForm />
        </div>
    </div>
    <div className="col-span-6">
        <div className="flex justify-between items-center">
          <ViewTitle text="Listado de cuentas" />
          <MdCurrencyExchange size={28} className="clickeable mr-4 animate-pulse" color="red" onClick={()=> openModal("AccountsTransfers")} />
        </div>
        <div className="p-4">
          <AccountsTable />
        </div>
    </div> 
    <AccountsTransfersModal isShow={modals.AccountsTransfers} onClose={()=>{ closeModal("AccountsTransfers")}} />
    <ToasterMessage />
</div>
  );
}
