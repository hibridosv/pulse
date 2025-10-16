'use client';
import { RemissionNoteModal } from "@/components/invoicing/RemissionNoteModal";
import { RemissionNoteTable } from "@/components/invoicing/RemissionNoteTable";
import { Pagination } from "@/components/Pagination";
import { SearchInput } from "@/components/Search";
import { ShowTotal } from "@/components/ShowTotal";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useRemissionNoteLogic } from "@/hooks/invoicing/useRemissionNoteLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export default function Page() {
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    const { searchTerm, handleSearchTerm } = useSearchTerm(["client_name", "quote_number"], 500);
    const { responseData, loading } = useRemissionNoteLogic(currentPage, searchTerm);
    const data = responseData?.data;
    const quantity =  data?.total ?? 0;
    const { getSelectedElement} = useTempSelectedElementStore();
    const { modals, closeModal } = useModalStore();
    const documentSelected = getSelectedElement('remissionNote') ?? {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="LISTA DE NOTAS DE REMISION" />
        <div className="p-4">
          <RemissionNoteTable records={data?.data} isLoading={loading} />
        </div>
        <Pagination records={data} handlePageNumber={handlePageNumber } />
    </div>
    <div className="col-span-3">
        <ViewTitle text="BUSCAR" />
        <div className="p-4">
          <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar nota de remisión" />
        </div>
        <div className="p-4">
          <ShowTotal quantity={quantity} text="Cantidad de documentos" number={true} />
        </div>
    </div> 
    <RemissionNoteModal isShow={modals.remissionNote} onClose={() => closeModal('remissionNote')} document={documentSelected} />
    <ToasterMessage />
</div>
  );
}
