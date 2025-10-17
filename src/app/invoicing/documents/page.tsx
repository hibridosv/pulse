'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { InvoiceDetailsModal } from "@/components/invoicing/InvoiceDetailsModal";
import { InvoicingListTable } from "@/components/invoicing/InvoicingListTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useInvoiceTypesLogic } from "@/hooks/invoicing/useInvoiceTypesLogic";
import { useInvoicingLogic } from "@/hooks/invoicing/useInvoicingLogic";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export default function Page() {
  const { history, handleGet, loading, links } = useInvoicingLogic('documents', 'excel/invoices/documents/');
  const { fieldsFiltered, loading: loadingFields} =  useInvoiceTypesLogic('invoice/type?filterWhere[type]=!9&FilterWhereIn[status]==1,0');
  const isLoading = loading.history ?? false; 
  const isLoadingField = loadingFields.invoiceTypes ?? false; 
  const { getSelectedElement} = useTempSelectedElementStore();
  const { modals, closeModal } = useModalStore();
  const documentSelected = getSelectedElement('documentSelected') ?? {};

    const handleFormSubmit = async (values: DateRangeValues) => { 
        await handleGet(values, 'documents', 'excel/invoices/documents/');
    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="REPORTE DOCUMENTOS EMITIDOS" />
        <div className="p-4">
          <InvoicingListTable records={history} isLoading={isLoading} />
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
    <InvoiceDetailsModal isShow={modals.documentDetail} onClose={() => closeModal('documentDetail')} documentId={documentSelected?.id} />
</div>
  );
}
