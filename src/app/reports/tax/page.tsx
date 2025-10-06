'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { fieldUsersActive } from "@/components/reports/utils";
import { ViewTitle } from "@/components/ViewTitle";
import { useDownloadLink } from "@/hooks/useDownloadLink";
import useStateStore from "@/stores/stateStorage";


export default function Page() {
   const { links, addLink} = useDownloadLink();
    const { openLoading, closeLoading, loading } = useStateStore()
    const isLoading = loading.history ?? false; 

    const handleFormSubmit = async (values: DateRangeValues) => { 
        openLoading('loading')
        addLink(values, 'excel/electronic/', values.anexo ? [{name: "anexo", value: values.anexo } , { name: "sucursal", value: values.sucursal }] : null);
        closeLoading('loading')
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Reporte de anexos de IVA y descargas" />
        <div className="p-4">
          
          

        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
            <DateRange onSubmit={handleFormSubmit} loading={isLoading} additionalFields={fieldUsersActive} />
          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAR DOCUMENTOS" />
          </div>
    </div> 
</div>
  );
}
