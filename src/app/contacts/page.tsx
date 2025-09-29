'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { useContactsLogic } from "@/hooks/contacts/useContactsLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { SearchInput } from "@/components/Search";
import { ContactsTable } from "@/components/contacs/ContactsTable";
import { Pagination } from "@/components/Pagination";
import useContactStore from "@/stores/ContactStore";
import { ShowTotal } from "@/components/ShowTotal";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewContactModal } from "@/components/contacs/ViewContactModal";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import useModalStore from "@/stores/modalStorage";
import { AddContactModal } from "@/components/contacs/AddContactModal";


export default function Page() {
  const { data: session, status } = useSession();
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const { searchTerm, handleSearchTerm } = useSearchTerm(["name", "id_number", "code", "phone"], 500);
  useContactsLogic(currentPage, searchTerm);
  const { contacts } = useContactStore();
  const { getSelectedElement } =  useTempSelectedElementStore();
  const { modals, closeModal} = useModalStore();





  if (status === "loading") {
    return <LoadingPage />;
  }

console.log(contacts);


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Lista de Contactos" />
        <div className="p-4">
          <ContactsTable />
          <Pagination records={contacts} handlePageNumber={handlePageNumber } />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Buscar Contacto" />
        <div className="p-4">
          <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar Contacto" />
        </div>
        <div className="p-4">
          <ShowTotal quantity={contacts?.total} text="Cantidad de Contactos" number={true} />
        </div>
    </div> 
    <ViewContactModal isShow={modals.contactDetails} onClose={()=>closeModal('contactDetails')} record={getSelectedElement('contactDetails')} />
    <AddContactModal isShow={true} onClose={()=>{}} record={null} />
    <ToasterMessage />
</div>
  );
}
