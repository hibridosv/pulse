'use client';
import { SearchInput } from "@/components/Search";
import { ViewTitle } from "@/components/ViewTitle";
import { useQuotesLogic } from "@/hooks/tools/useQuotesLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import quotesStore from "@/stores/tools/quotesStore";

export default function Page() {
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
  const { modals, closeModal } = useModalStore();
  const { getSelectedElement } =useTempSelectedElementStore();
  useQuotesLogic(currentPage, searchTerm);
  const { quotes, loading } = quotesStore();


console.log({quotes});

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="LISTA DE COTIZACIONES" />

    </div>
    <div className="col-span-3">
        <ViewTitle text="DETALLES" />
        <div className="mt-2 p-2">
          <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar cotización" />
        </div>
    </div> 
</div>
  );
}
