"use client";
import { Button, Preset } from "@/components/button/button";
import { LiComponent } from "@/components/button/LiComponent";
import Modal from "@/components/modal/Modal";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import ordersStore from "@/stores/orders/ordersStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";

export interface InvoicePaymentMethodModalI {
  onClose: () => void;
  isShow: boolean;
}

export function InvoicePaymentMethodModal(props: InvoicePaymentMethodModalI) {
  const { onClose, isShow } = props;
  const { order } = ordersStore();
  
  const { closeModal} = useModalStore();
  const { payMethods } = useConfigStore();
  const { setSelectedElement, getSelectedElement} = useTempSelectedElementStore();
  const payMethod = getSelectedElement('payMethod') ?? 1;
  
  const handleUpdate = (type: any) => {
    setSelectedElement('payMethod', type);
    closeModal('payMethod');
  }

  if (!isShow || !order) return null;
  
  return (
    <Modal show={isShow} onClose={onClose} size="xs" headerTitle="Metodo de pago" closeOnOverlayClick={false} hideCloseButton={true} >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80">
            <ul className="divide-y divide-bg-subtle">
              {
                      payMethods && payMethods.length > 0 && payMethods.map((type: any) => {
                      return (
                            <LiComponent
                              key={type.id}
                              content={type.name}
                              onClick={type.iden == payMethod ? ()=>{} :  ()=> handleUpdate(type.iden)}
                              style={`${type.iden == payMethod && 'font-bold bg-primary/10 text-primary hover:bg-primary/20'}`}
                            />
                          );
                  })
              }
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} /> 
      </Modal.Footer>
    </Modal>
  );

}
