'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { ViewTitle } from "@/components/ViewTitle";
import { useHistorySalesLogic } from "@/hooks/history/useHistorySalesLogic";


export default function Page() {
  const { history, handleGet, loading, links } = useHistorySalesLogic('histories/sales', 'excel/sales/');
  const isLoading = loading.history ?? false; 

    const handleFormSubmit = async (values: DateRangeValues) => { 
        await handleGet(values, 'histories/sales', 'excel/sales/');
    }
  
    console.log(links)

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Historial de ventas" />

    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
            <DateRange onSubmit={handleFormSubmit} loading={isLoading} />
          </div>
    </div> 
</div>
  );
}
