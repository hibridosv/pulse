'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { HistoryPaymentsTable } from "@/components/history/HistoryPaymentsTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useHistorySalesLogic } from "@/hooks/history/useHistorySalesLogic";


export default function Page() {
  const { history, handleGet, loading, links } = useHistorySalesLogic('histories/payments', 'excel/payments/');
  const isLoading = loading.history ?? false; 

    const handleFormSubmit = async (values: DateRangeValues) => { 
        await handleGet(values, 'histories/payments', 'excel/payments/');
    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Abonos recibidos" />
        <div className="p-4">
          <HistoryPaymentsTable records={history} isLoading={isLoading} />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
            <DateRange onSubmit={handleFormSubmit} loading={isLoading} />
          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAS" />
          </div>
    </div> 
</div>
  );
}
