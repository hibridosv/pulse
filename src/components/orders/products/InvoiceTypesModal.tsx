"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import { LiComponent } from "@/components/button/LiComponent";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { UpdateServiceInterface } from "@/services/Interfaces";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";

export interface InvoiceTypesModalI {
  onClose: () => void;
  isShow: boolean;
}

export function InvoiceTypesModal(props: InvoiceTypesModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersProductsStore();
  const { setSelectedElement, getSelectedElement} = useTempSelectedElementStore();
  const invoiceTypeSelected = getSelectedElement('invoiceTypeSelected');
  const { invoiceTypes } = useConfigStore();
  const { update } = useOrderFnLogic();
  const { closeModal} = useModalStore();

  if (!isShow || !order) return null;

  const handleUpdate = (type: any) => {
    let values: UpdateServiceInterface = {
      row: "invoice_type_id",
      value: type.id
    }
    update(order.id, values);
    if (!error) {
        setSelectedElement('invoiceTypeSelected', type);
        closeModal('invoiceType');
      }
  }

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="Seleccione el tipo de factura" closeOnOverlayClick={false} hideCloseButton={true} >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80">
            <ul className="divide-y divide-bg-subtle">
              {
                  invoiceTypes && invoiceTypes.length > 0 && invoiceTypes.map((type: any) => {
                      return (
                            <LiComponent
                              key={type.id}
                              content={type.name}
                              onClick={type.id == invoiceTypeSelected.id ? ()=>{} :  ()=> handleUpdate(type)}
                              style={`${type.id == invoiceTypeSelected.id && 'font-bold bg-primary/10 text-primary hover:bg-primary/20'}`}
                            />
                          );
                  })
              }
            </ul>
          </div>
          { error &&
          <Alert type="danger" text={`Existe un error, No se actualizo correctamente. Vuelva a intentarlo.`} isDismissible={false} className="mt-3" />
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
