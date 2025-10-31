'use client';
import { AccountsPayableTable } from "@/components/accounts/AccountsPayableTable";
import { Option, RadioButton } from "@/components/button/RadioButton";
import { ClientsSearch } from "@/components/search/ClientsSearch";
import { ShowClientSearched } from "@/components/search/ShowClientSearched";
import { ShowTotal } from "@/components/ShowTotal";
import { ViewTitle } from "@/components/ViewTitle";
import { useAccountPayableLogic } from "@/hooks/accounts/useAccountPayableLogic";
import { usePagination } from "@/hooks/usePagination";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export default function Page() {
  let optionsRadioButton: Option[] = [
    { id: 2, name: "Todos" },
    { id: 0, name: "Pagadas" },
    { id: 1, name: "Pendientes" },
  ];

  const { getSelectedElement } = useTempSelectedElementStore();
  const selectedOption = getSelectedElement("optionSelected");
    const {currentPage, handlePageNumber} = usePagination("&page=1");

  const { loading, responseData } = useAccountPayableLogic(currentPage);

 console.log("responseData:", responseData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Cuentas por pagar" />
        <AccountsPayableTable records={responseData?.data} isLoading={loading} />
    </div>
    <div className="col-span-3">
        <ViewTitle text="Resumen" />
            <div className="p-4">
              <ClientsSearch param="customers" placeholder="Buscar Proveedor" />
              <ShowClientSearched />
            </div>
            <RadioButton options={optionsRadioButton} />
            <div className="p-4">
              <ShowTotal quantity={10} text="Creditos Pendientes" number={true} />
            </div>
            <div className="p-4">
              <ShowTotal quantity={10} text="Total Pendiente" number={false} />
            </div>
    </div> 
</div>
  );
}
