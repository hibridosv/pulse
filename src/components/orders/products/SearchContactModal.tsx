"use client";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { ClientsSearch } from "@/components/search/ClientsSearch";
import { ShowClientSearched } from "@/components/search/ShowClientSearched";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";

export interface SearchContactModalI {
  onClose: () => void;
  isShow: boolean;
}

const setNameContact = (tempSelectedName: string) => {
  switch (tempSelectedName) {
    case "customerSearch": return "cliente";
    case "supplierSearch": return "proveedor";
    case "driverSearch": return "repartidor";
    case "referralSearch": return "referido"
  }
}

const setParam = (tempSelectedName: string) => {
  switch (tempSelectedName) {
    case "customerSearch": return "customers";
    case "supplierSearch": return "suppliers";
    case "driverSearch": return "drivers";
    case "referralSearch": return "referrals"
    default: return "customers";
  }
}


export function SearchContactModal(props: SearchContactModalI) {
  const { onClose, isShow } = props;
  const { order, sending } = ordersProductsStore();
  const { getSelectedElement, setSelectedElement } = useTempSelectedElementStore();
  const tempSelectedName = getSelectedElement('contactSearch');
  const { modals, closeModal, openModal} = useModalStore();

  if (!isShow || !order) return null;

  const clearContact = () => {
    console.log('clear');
  }

  const updateContact = () => {
    console.log('tempSelectedName', tempSelectedName);
  }


  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle={`Asignar ${setNameContact(tempSelectedName)}`} >
      <Modal.Body>
        <div className="h-96">
          <ClientsSearch param={setParam(tempSelectedName)} placeholder={`Buscar ${setNameContact(tempSelectedName)}`} onSelect={updateContact} tempSelectedName={tempSelectedName} />
          <ShowClientSearched onClose={clearContact} tempSelectedName={tempSelectedName} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { openModal('contactAdd') }} text={`Registrar ${setNameContact(tempSelectedName)}`} preset={Preset.add}/>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
