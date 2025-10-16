'use client';
import { RemissionNoteTable } from "@/components/invoicing/RemissionNoteTable";
import { Pagination } from "@/components/Pagination";
import { SearchInput } from "@/components/Search";
import { ShowTotal } from "@/components/ShowTotal";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useRemissionNoteLogic } from "@/hooks/invoicing/useRemissionNoteLogic";
import { useGetRequest } from "@/hooks/request/useGetRequest";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";


export default function Page() {
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    const { searchTerm, handleSearchTerm } = useSearchTerm(["client_name", "quote_number"], 500);
    useRemissionNoteLogic(currentPage, searchTerm);
    const { responseData, loading } = useGetRequest();
    const quantity =  responseData?.total ?? 0;

    console.log("responseData", responseData);


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="LISTA DE NOTAS DE REMISION" />
        <div className="p-4">
          <RemissionNoteTable records={responseData?.data} isLoading={loading} />
        </div>
        <Pagination records={responseData} handlePageNumber={handlePageNumber } />
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
    <ToasterMessage />
</div>
  );
}
