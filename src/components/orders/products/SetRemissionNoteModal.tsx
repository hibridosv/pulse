"use client";
import { Button, Preset } from "@/components/button/button";
import { LiComponent } from "@/components/button/LiComponent";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { useOrderLoadersLogic } from "@/hooks/order/product/useOrderLoadersLogic";
import useModalStore from "@/stores/modalStorage";
import ordersStore from "@/stores/orders/ordersStore";

export interface SetRemissionNoteModalI {
  onClose: () => void;
  isShow: boolean;
}

interface SalesSelectRemissionType {
    code: "01" | "02" | "03" | "04" | "05";
}


export function SetRemissionNoteModal(props: SetRemissionNoteModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error,  } = ordersStore();
  const { closeModal} = useModalStore();
  const { remissionNote } = useOrderFnLogic();
  useOrderLoadersLogic(isShow)

  if (!isShow || !order) return null;

  const handleSelect = (type: any) => {
    if (!type || !order) return;

    remissionNote(order.id, type);
    if (!error) {
      closeModal('setRemissionNote');
    }
  }
  


  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle={`Asignar Nota de Remisión`} >
      <Modal.Body>
        <div className="p-4 space-y-6">
          <ul className="p-4" >
            <LiComponent content="Deposito" onClick={() => handleSelect("01")} />
            <LiComponent content="Propiedad" onClick={() => handleSelect("02")} />
            <LiComponent content="Consignación" onClick={() => handleSelect("03")} />
            <LiComponent content="Traslado" onClick={() => handleSelect("04")} />
            <LiComponent content="Otros" onClick={() => handleSelect("05")} />
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
