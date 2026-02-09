"use client";
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
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="Seleccione el tipo de factura" >
      <Modal.Body>
        <div className="p-4 space-y-6">
          <ul className="p-4" >
            {
                invoiceTypes && invoiceTypes.length > 0 && invoiceTypes.map((type: any) => {
                    console.log(type);
                    return (
                          <LiComponent 
                            key={type.id} 
                            content={type.name} 
                            onClick={type.id == invoiceTypeSelected.id ? ()=>{} :  ()=> handleUpdate(type)}
                            style={`${type.id == invoiceTypeSelected.id && 'font-bold bg-red-100 text-white hover:bg-red-200'} cur`}
                          />
                        );
                })
            }
            </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
