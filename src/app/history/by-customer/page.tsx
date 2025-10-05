'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { HistoryByCustomerTable } from "@/components/history/HistoryByCustomerTable";
import { ClientsSearch } from "@/components/search/ClientsSearch";
import { ShowClientSearched } from "@/components/search/ShowClientSearched";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useHistorySalesLogic } from "@/hooks/history/useHistorySalesLogic";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import useToastMessageStore from "@/stores/toastMessageStore";



export default function Page() {
  const { getSelectedElement } = useTempSelectedElementStore();
  const elementSelected = getSelectedElement('clientSelectedBySearch');
  const { history, handleGet, loading, links } = useHistorySalesLogic('histories/by-client', 'excel/by-client/', false);
  const isLoading = loading.history ?? false; 


    const handleFormSubmit = async (values: DateRangeValues) => { 
        if (!elementSelected) {
          useToastMessageStore.getState().setError({ message: "Seleccione un contacto"});
          return
        }
        values.clientId = elementSelected?.id
        await handleGet(values, 'histories/by-client', 'excel/by-client/', [{name: "clientId", value: elementSelected?.id}]);
    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Listado de ventas por cliente" />
        <div className="p-4">
          <HistoryByCustomerTable records={history} isLoading={isLoading} />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
            <ClientsSearch param="customers" />
            <ShowClientSearched />
          </div>
          <div className="mt-2 p-2">
            <DateRange onSubmit={handleFormSubmit} loading={isLoading} />
          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAS" />
          </div>
    </div> 
    <ToasterMessage />
</div>
  );
}
