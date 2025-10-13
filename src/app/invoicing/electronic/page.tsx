'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { DocumentsElectronicTable } from "@/components/invoicing/DocumentsElectronicTable";
import { InvoiceDetailsModal } from "@/components/invoicing/InvoiceDetailsModal";
import { SendEmailDocumentModal } from "@/components/invoicing/SendEmailDocumentModal";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useInvoiceTypesElectronicLogic } from "@/hooks/invoicing/useInvoiceTypesElectronicLogic";
import { useInvoicingElectronicLogic } from "@/hooks/invoicing/useInvoicingElectronicLogic";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export default function Page() {
  const { history, handleGet, loading, links } = useInvoicingElectronicLogic('electronic/documents', 'excel/electronic/');
  const { Additionalfields, loading: loadingFields} =  useInvoiceTypesElectronicLogic('invoice/type?filterWhere[type]=!9&filterWhere[is_electronic]==1&FilterWhereIn[status]==1,0');
  const isLoading = loading.history ?? false; 
  const isLoadingField = loadingFields.invoiceTypes ?? false; 
  const { getSelectedElement} = useTempSelectedElementStore();
  const { modals, closeModal } = useModalStore();
  const documentSelected = getSelectedElement('documentSelected') ?? {};


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
            <LinksList links={links} text="DESCARGAR" />
          </div>
    </div> 
    <SendEmailDocumentModal isShow={modals.documentEmail} onClose={() => closeModal('documentEmail')} document={documentSelected} />
    <InvoiceDetailsModal isShow={modals.documentDetail} onClose={() => closeModal('documentDetail')} documentId={documentSelected.id} />
    <ToasterMessage />
</div>
  );
}
