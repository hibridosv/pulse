'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { HistoryByUserTable } from "@/components/history/HistoryByUserTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useHistorySalesLogic } from "@/hooks/history/useHistorySalesLogic";
import { useLoadUsersByFormLogic } from "@/hooks/useLoadUsersByFormLogic";



export default function Page() {
  const { history, handleGet, loading, links } = useHistorySalesLogic('histories/by-user', 'excel/by-user/');
  const { fieldUsers } = useLoadUsersByFormLogic(true);
  const isLoading = loading.history ?? false; 

    const handleFormSubmit = async (values: DateRangeValues) => { 
        await handleGet(values, 'histories/by-user', 'excel/by-user/');
    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Listado de ordenes por usuario" />
        <div className="p-4">
          <HistoryByUserTable records={history} isLoading={isLoading} />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
            <DateRange onSubmit={handleFormSubmit} loading={isLoading} additionalFields={fieldUsers} />
          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAS" />
          </div>
    </div> 
</div>
  );
}
