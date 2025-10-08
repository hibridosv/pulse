'use client';
import { AdditionalField, DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { DocumentsElectronicTable } from "@/components/invoicing/DocumentsElectronicTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useInvoiceTypesLogic } from "@/hooks/invoicing/useInvoiceTypesLogic";
import { useInvoicingLogic } from "@/hooks/invoicing/useInvoicingLogic";
import { useMemo } from "react";


export default function Page() {
  const { history, handleGet, loading, links } = useInvoicingLogic('documents', 'excel/electronic/');
  const { fieldsFiltered, loading: loadingFields} =  useInvoiceTypesLogic('invoice/type?filterWhere[type]=!9&filterWhere[is_electronic]==1&FilterWhereIn[status]==1,0');
  const isLoading = loading.history ?? false; 
  const isLoadingField = loadingFields.invoiceTypes ?? false; 

      const Additionalfields: AdditionalField[] = useMemo(() => {
          if (!fieldsFiltered) {
              return [];
          }

          return [ ... fieldsFiltered,
            {
              name: 'status',
              label: 'Seleccione el estado del documento',
              type: 'select',
              options : [
                { value: '0', label: 'Todos' },
                { value: '1', label: 'Enviados' },
                { value: '2', label: 'Firmados' },
                { value: '3', label: 'Rechazados' },
                { value: '4', label: 'Procesados' },
                { value: '5', label: 'Anulados' },
               ]
          }];
      }, [fieldsFiltered]);

    const handleFormSubmit = async (values: DateRangeValues) => { 
      if (values.invoiceId == 2) values.invoiceId = '01';
      if (values.invoiceId == 3) values.invoiceId = '03';
      if (values.invoiceId == 4) values.invoiceId = '14';
      if (values.invoiceId == 5) values.invoiceId = '05';
      if (values.invoiceId == 8) values.invoiceId = '04';
        await handleGet(values, 'electronic/documents', 'excel/electronic/');
    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="REPORTE DOCUMENTOS ELECTRONICOS" />
        <div className="p-4">
          <DocumentsElectronicTable records={history} isLoading={isLoading} />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
           <DateRange onSubmit={handleFormSubmit} loading={isLoading || isLoadingField} additionalFields={Additionalfields}  />
          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAS" />
          </div>
    </div> 
</div>
  );
}
