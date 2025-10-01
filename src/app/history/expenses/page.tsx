'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { HistoryExpensesTable } from "@/components/history/HistoryExpensesTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useHistorySalesLogic } from "@/hooks/history/useHistorySalesLogic";


export default function Page() {
  const { history, handleGet, loading, links } = useHistorySalesLogic('reports/bills', 'excel/reports/bills/');
  const isLoading = loading.history ?? false; 

    const handleFormSubmit = async (values: DateRangeValues) => { 
        await handleGet(values, 'reports/bills', 'excel/reports/bills/');
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Historial de gastos" />
        <div className="p-4">
          <HistoryExpensesTable records={history} isLoading={isLoading} />
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
