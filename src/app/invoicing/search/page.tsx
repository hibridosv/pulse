'use client';
import { InvoiceDetailsModal } from "@/components/invoicing/InvoiceDetailsModal";
import { InvoicingSearchTable } from "@/components/invoicing/InvoicingSearchTable";
import { Pagination } from "@/components/Pagination";
import { SearchInput } from "@/components/Search";
import { ShowTotal } from "@/components/ShowTotal";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useSearchDocumentLogic } from "@/hooks/invoicing/useSearchDocumentLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export default function Page() {
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    const { searchTerm, handleSearchTerm } = useSearchTerm(["invoice"], 500);
    const { responseData, loading } = useSearchDocumentLogic(currentPage, searchTerm);
    const data = responseData?.data;
    const quantity =  data?.total ?? 0;
    const { getSelectedElement} = useTempSelectedElementStore();
    const { modals, closeModal } = useModalStore();
    const documentSelected = getSelectedElement('documentSelected') ?? {};


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
    <div className="md:col-span-7 md:border-r md:border-primary">
        <ViewTitle text="ULTIMOS DOCUMENTOS" />
        <div className="p-4">
          <InvoicingSearchTable records={data?.data} isLoading={loading} />
        </div>
        <Pagination records={data} handlePageNumber={handlePageNumber } />
    </div>
    <div className="md:col-span-3">
        <ViewTitle text="BUSCAR DOCUMENTO" />
        <div className="p-4">
          <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar documento" />
        </div>
        <div className="p-4">
          <ShowTotal quantity={quantity} text="Cantidad de documentos" number={true} />
        </div>
    </div> 
        <InvoiceDetailsModal isShow={modals.documentDetail} onClose={() => closeModal('documentDetail')} documentId={documentSelected?.id} onElectronic={true} />
        <ToasterMessage />
</div>
  );
}
