"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import { LiComponent } from "@/components/button/LiComponent";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { useOrderRestaurantFnLogic } from "@/hooks/order/restaurant/useOrderRestaurantFnLogic";
import { isRestaurant } from "@/lib/utils";
import { UpdateServiceInterface } from "@/services/Interfaces";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import ordersStore from "@/stores/orders/ordersStore";
import useTempStorage from "@/stores/useTempStorage";

export interface InvoiceTypesModalI {
  onClose: () => void;
  isShow: boolean;
}

export function InvoiceTypesModal(props: InvoiceTypesModalI) {
  const { onClose, isShow } = props;
  const { tenant } = useConfigStore();
  const { order, sending, error } = ordersStore();
  const { setElement, getElement} = useTempStorage();
  const invoiceTypeSelected = getElement('invoiceTypeSelected');
  const { invoiceTypes } = useConfigStore();
  const { update: updateProduct } = useOrderFnLogic();
  const { update: updateRestaurant } = useOrderRestaurantFnLogic();
  const { closeModal} = useModalStore();


  if (!isShow || !order) return null;

  const handleUpdate = (type: any) => {
    let values: UpdateServiceInterface = {
      row: "invoice_type_id",
      value: type.id
    }
    if (isRestaurant(tenant.system)) {
      updateRestaurant(order.id, values);
    } else {
      updateProduct(order.id, values);
    }
    if (!error) {
        setElement('invoiceTypeSelected', type);
        closeModal('invoiceType');
      }
  }

  return (
    <Modal show={isShow} onClose={onClose} size="xs" headerTitle="Tipo de factura" closeOnOverlayClick={false} hideCloseButton={true} >
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
