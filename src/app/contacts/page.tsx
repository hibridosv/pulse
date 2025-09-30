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
import { Button, Preset } from "@/components/button/button";
import { DeleteModal } from "@/components/DeleteModal";
import { BiPlusCircle } from "react-icons/bi";
import { useSearchParams } from 'next/navigation';
import { getParamString } from "@/components/contacs/utils";


export default function Page() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const { searchTerm, handleSearchTerm } = useSearchTerm(["name", "id_number", "code", "phone"], 500);
  const { onDelete } = useContactsLogic(currentPage, searchTerm, getParamString(pageParam));
  const { contacts } = useContactStore();
  const { getSelectedElement, clearSelectedElement } =  useTempSelectedElementStore();
  const { modals, closeModal, openModal} = useModalStore();
 

  if (status === "loading") {
    return <LoadingPage />;
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <div className="flex justify-between">
          <ViewTitle text="Lista de Contactos" />
          <BiPlusCircle size={28} className="clickeable text-primary mt-3 mr-4" onClick={()=>{openModal('contactAdd'); clearSelectedElement('contactAdd'); }} />
        </div>
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
        <div className="p-4 flex justify-center">
          <Button preset={Preset.add} text="Agregar Contacto" onClick={()=>{openModal('contactAdd'); clearSelectedElement('contactAdd'); }} />
        </div>
    </div> 
    <ViewContactModal isShow={modals.contactDetails} onClose={()=>closeModal('contactDetails')} record={getSelectedElement('contactDetails')} />
    <AddContactModal isShow={modals.contactAdd} onClose={()=>closeModal('contactAdd')} record={getSelectedElement('contactAdd')} />
    <DeleteModal
        isShow={modals.deleteContact}
        text={`¿Estas seguro de eliminar este contacto?`}
        onDelete={() =>{ onDelete(getSelectedElement('deleteContact').id);  }}
        onClose={() => closeModal('deleteContact')} />
    <ToasterMessage />
</div>
  );
}
