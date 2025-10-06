'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { ReportDamageTable } from "@/components/reports/ReportDamageTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useReportsLogic } from "@/hooks/reports/useReportsLogic";


export default function Page() {
  const { history, handleGet, loading, links } = useReportsLogic('reports/failures', 'excel/reports/failures/');
  const isLoading = loading.history ?? false; 

    const handleFormSubmit = async (values: DateRangeValues) => { 
        await handleGet(values, 'reports/failures', 'excel/reports/failures/');
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="detalle de Productos Averiados" />
        <div className="p-4">
          <ReportDamageTable records={history} isLoading={isLoading} />
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
