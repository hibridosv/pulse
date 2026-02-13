"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { ClientsSearch } from "@/components/search/ClientsSearch";
import { ShowClientSearched } from "@/components/search/ShowClientSearched";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { UpdateServiceInterface } from "@/services/Interfaces";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { setNameContact, setParam, setRowToChange } from "../functions";

export interface SearchContactModalI {
  onClose: () => void;
  isShow: boolean;
}

export function SearchContactModal(props: SearchContactModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersProductsStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const tempSelectedName = getSelectedElement('contactSearch');
  const { openModal, closeModal} = useModalStore();
  const { update } = useOrderFnLogic();

  if (!isShow || !order) return null;
  
  const clearContact = (item: any) => {
    if (!item || !tempSelectedName || !order) return;
    let values: UpdateServiceInterface = {
      row: setRowToChange(tempSelectedName),
      value: null
    }
    update(order.id, values);
    if (!error && !sending) {
      closeModal('searchContact');
    }
  }
  
  const updateContact = (item: any) => {
    if (!item || !tempSelectedName || !order) return;
    let values: UpdateServiceInterface = {
      row: setRowToChange(tempSelectedName),
      value: item.id
    }
    update(order.id, values);
    if (!error) {
      closeModal('searchContact');
    }
  }
  
  

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle={`Asignar ${setNameContact(tempSelectedName)}`} >
      <div className="p-2 space-y-3 overflow-visible">
        <ClientsSearch param={setParam(tempSelectedName)} placeholder={`Buscar ${setNameContact(tempSelectedName)}`} onSelect={updateContact} tempSelectedName={tempSelectedName} />
        <ShowClientSearched onClose={clearContact} tempSelectedName={tempSelectedName} />
        { error &&
        <Alert type="danger" text={`Existe un error, No se actualizo correctamente el ${setNameContact(tempSelectedName)}. Vuelva a intentarlo.`} isDismissible={false} className="mt-3" />
        }
      </div>
      <Modal.Footer>
        <Button onClick={() => { openModal('contactAdd') }} text={`Registrar ${setNameContact(tempSelectedName)}`} preset={Preset.add}/>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
