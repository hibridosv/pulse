'use client';
import { AccountsReceivableTable } from "@/components/accounts/AccountsReceivableTable";
import { AddReceivableAddModal } from "@/components/accounts/AddReceivableAddModal";
import { DateRange } from "@/components/button/DateRange";
import { Option, RadioButton } from "@/components/button/RadioButton";
import { InvoiceDetailsModal } from "@/components/invoicing/InvoiceDetailsModal";
import { Pagination } from "@/components/Pagination";
import { ClientsSearch } from "@/components/search/ClientsSearch";
import { ShowClientSearched } from "@/components/search/ShowClientSearched";
import { ShowTotal } from "@/components/ShowTotal";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useAccountReceivableLogic } from "@/hooks/accounts/useAccountReceivableLogic";
import { usePagination } from "@/hooks/usePagination";
import { countItemsWithStatus, getTotalOfItem } from "@/lib/utils";
import accountReceivableStore from "@/stores/accounts/accountReceivableStore";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";

/**
 * 
 * Notas importantes para continuar el desarrollo
 * debe cambiar se toda la estructura de como se obtinen las cuentas
 * crear el Hook y el Storage
 * de momento se esta usando toda la estructura de cuentas por pagar, no se han realizado cambios aun
 * 
 */

export default function Page() {
  let optionsRadioButton: Option[] = [
    { id: 2, name: "Todos" },
    { id: 0, name: "Pagadas" },
    { id: 1, name: "Pendientes" },
  ];

  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const { modals, closeModal, openModal} = useModalStore();

  useAccountReceivableLogic(currentPage, true);
  const { accounts, loading } = accountReceivableStore();

  const data = accounts?.data || [];
  const { getSelectedElement} = useTempSelectedElementStore();
  const documentSelected = getSelectedElement('documentSelected') ?? {};

  const handleFormSubmit = async (values: any) => {
    console.log("DateRange values:", values);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <div className="flex justify-between">
          <ViewTitle text="Cuentas por cobrar" />
          {/* <BiPlusCircle size={28} className="clickeable text-primary mt-3 mr-4" onClick={()=>{openModal('payableAdd'); }} /> */}
        </div>
        <div className="p-4">
          <AccountsReceivableTable records={data} isLoading={loading} />
          <Pagination records={accounts} handlePageNumber={handlePageNumber } />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Resumen" />
            <div className="p-4">
              <ShowTotal quantity={countItemsWithStatus(data, "status", 1)} text="Creditos Pendientes" number={true} />
            </div>
            <div className="p-4">
              <ShowTotal quantity={getTotalOfItem(data, "balance")} text="Total Pendiente" number={false} />
            </div>

            <div className="p-4">
              <ClientsSearch param="customers" placeholder="Buscar Cliente" />
              <ShowClientSearched />
            </div>
            <RadioButton options={optionsRadioButton} />
        <ViewTitle text="Rango de fechas" />
            <div className="mt-2 p-2">
              <DateRange onSubmit={handleFormSubmit} loading={loading} />
            </div>

    </div> 
    {/* <AddPayableModal onClose={() => closeModal('payableAdd')} isShow={modals.payableAdd} /> */}
    <AddReceivableAddModal onClose={() => closeModal('paymentReceivableAdd')} isShow={modals.paymentReceivableAdd} />
    <InvoiceDetailsModal isShow={modals.documentDetail} onClose={() => closeModal('documentDetail')} documentId={documentSelected?.id} />
    <ToasterMessage />
</div>
  );
}
