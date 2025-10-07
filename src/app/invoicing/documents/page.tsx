'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { InvoicingListTable } from "@/components/invoicing/InvoicingListTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useInvoiceTypesLogic } from "@/hooks/invoicing/useInvoiceTypesLogic";
import { useInvoicingLogic } from "@/hooks/invoicing/useInvoicingLogic";


export default function Page() {
  const { history, handleGet, loading, links } = useInvoicingLogic('documents', 'excel/invoices/documents/');
  const { fieldsFiltered, loading: loadingFields} =  useInvoiceTypesLogic();
  const isLoading = loading.history ?? false; 
  const isLoadingField = loadingFields.invoiceTypes ?? false; 


    const handleFormSubmit = async (values: DateRangeValues) => { 
        await handleGet(values, 'documents', 'excel/invoices/documents/');
    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="REPORTE DOCUMENTOS EMITIDOS" />
        <div className="p-4">
          <InvoicingListTable records={history} isLoading={false} />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
           <DateRange onSubmit={handleFormSubmit} loading={isLoading || isLoadingField} additionalFields={fieldsFiltered}  />
          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAS" />
          </div>
    </div> 
</div>
  );
}
