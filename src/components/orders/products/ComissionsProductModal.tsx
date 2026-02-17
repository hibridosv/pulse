"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import ordersStore from "@/stores/orders/ordersStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface ComissionsProductModalI {
  onClose: () => void;
  isShow: boolean;
}




export function ComissionsProductModal(props: ComissionsProductModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersStore();
  const { updatePrice } = useOrderFnLogic();
  const { getSelectedElement, clearSelectedElement } = useTempSelectedElementStore();
  const product = getSelectedElement('productSelected');

  const { register, handleSubmit, resetField, setFocus, setValue } = useForm();

  useEffect(() => {
    if (product && isShow) {
      setValue("quantity", product?.unit_price)
      setFocus('quantity', {shouldSelect: true}) 
    }
  }, [setFocus, isShow, product, setValue])

  if (!isShow || !order) return null;

 const onSubmit = async(data: any) => {
     if (!data.quantity || !product || !order) return;
    let values = {
      order_id: order.id,
      quantity: data.quantity,
    };
    updatePrice(product.id, values);
     if (!error) {
       clearSelectedElement('productSelected');
       onClose();
     }
 }



  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Establecer Comisión" >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80 p-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
              <div>
                <label htmlFor="quantity" className="input-label" >Establecer Comisión</label>
                <input type="number" step="any" {...register("quantity", { required: true})} className="input" />
              </div>
              <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
            </form>
          </div>
          { error &&
          <Alert type="danger" text={`Existe un error, No se actualizo correctamente el precio. Vuelva a intentarlo.`} isDismissible={false} className="mt-3" />
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
