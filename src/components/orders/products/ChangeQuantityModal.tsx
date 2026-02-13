"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface ChangeQuantityModalI {
  onClose: () => void;
  isShow: boolean;
}




export function ChangeQuantityModal(props: ChangeQuantityModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error, addOrder } = ordersProductsStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const product = getSelectedElement('productSelected');
  const typeOfPrice = getSelectedElement('typeOfPrice') ?? 1;

  const { register, handleSubmit, resetField, setFocus, setValue } = useForm();
  useEffect(() => {
    if (product && isShow) {
      setValue("quantity", product?.quantity)
      setFocus('quantity', {shouldSelect: true})      
    }
  }, [setFocus, isShow, product, setValue])

  if (!isShow || !order) return null;

 const onSubmit = async(data: any) => {
    if (product.quantity == data.quantity || data.quantity == null) onClose();
    
    let quantity = 0;
    let addOrSubtract = 0;
    if(product.quantity < data.quantity) {
       quantity = data.quantity - product.quantity;
       addOrSubtract = 1;
    } else {
       quantity = product.quantity - data.quantity;
       addOrSubtract = 2;
    }

    let values = {
      product_id: product.cod,
      order_id: order && order.id ? order.id : null,
      request_type: 2,
      delivery_type: 1,
      order_type: 1,
      price_type: typeOfPrice,
      addOrSubtract: addOrSubtract, // 1 sumar 2 restar
      quantity: quantity,
    };
    await addOrder(`orders`, values);
    if (!error) {
        resetField('quantity');
        onClose();
    }
 }

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle={`Cambiar Cantidad`} >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80 p-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-text-muted mb-1">Cantidad</label>
                <input type="number" step="any" {...register("quantity", { required: true, min: 0.1})} className="input" />
              </div>
              <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
            </form>
          </div>
          { error &&
          <Alert type="danger" text={`Existe un error, No se actualizo correctamente la cantidad. Vuelva a intentarlo.`} isDismissible={false} className="mt-3" />
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
