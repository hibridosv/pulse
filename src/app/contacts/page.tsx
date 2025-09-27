'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { Alert } from "@/components/Alert/Alert";
import { Indicator } from "@/components/Indicators";
import { useContactsLogic } from "@/hooks/contacts/useContactsLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { SearchInput } from "@/components/Search";
import useContactStore from "@/stores/ContactStore";


export default function Page() {
  const { data: session, status } = useSession();
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const { searchTerm, handleSearchTerm } = useSearchTerm(["name", "id_number", "code", "phone"], 500);
  useContactsLogic(currentPage, searchTerm);
  const { contacts, loading} = useContactStore();


  if (status === "loading") {
    return <LoadingPage />;
  }

  console.log(contacts);


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Lista de Contactos" />
    </div>
    <div className="col-span-3">
        <ViewTitle text="Detalles" />
        <div className="p-4">
          <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar Contacto" />
        </div>
    </div> 
</div>
  );
}
