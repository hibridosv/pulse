"use client";
import { Button, Preset } from "@/components/button/button";
import { Option, RadioButton } from "@/components/button/RadioButton";
import Modal from "@/components/modal/Modal";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface OtherSalesModalI {
  onClose: () => void;
  isShow: boolean;
}




export function OtherSalesModal(props: OtherSalesModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error, updateOrder } = ordersProductsStore();
  const { getSelectedElement, clearSelectedElement } = useTempSelectedElementStore();
  const option = getSelectedElement('optionSelected');
  const optionType = getSelectedElement('optionSelectedType');

  const { register, handleSubmit, resetField, setFocus, setValue } = useForm();
  let optionsRadioButton: Option[] = [
      { id: 1, name: "Gravado" },
      { id: 2, name: "Exento" },
      { id: 3, name: "No Sujeto" },
  ];

  let optionsRadioButtonType: Option[] = [
      { id: 1, name: "Producto" },
      { id: 2, name: "Servicio" },
    ];

  useEffect(() => {
    if (isShow) {
      setValue("quantity", 1)
      setFocus('quantity', {shouldSelect: true}) 
    }
  }, [setFocus, isShow, setValue])

  if (!isShow || !order) return null;

 const onSubmit = async(data: any) => {
      if (!data.quantity || !data.description|| !data.total) return;
     
          let values = {
              description: data.description,
              quantity: data.quantity,
              total: data.total,
              order_id: order.id,
              exempt: option?.id,
              product_type: optionType?.id
          };
      await updateOrder(`orders/${order.id}/others`, values);
      if (!error && !sending) {
        clearSelectedElement('optionSelected');
        clearSelectedElement('optionSelectedType');
        onClose();
      }
 }



  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Otras Ventas" >
      <Modal.Body>
        <div className="p-4">
          <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)} >
            <div className="flex gap-3">
              <div className="w-1/2">
                <label htmlFor="quantity" className="block text-sm font-medium text-text-muted mb-1">Cantidad</label>
                <input type="number" step="any" {...register("quantity", { required: true })} className="input" />
              </div>
              <div className="w-1/2">
                <label htmlFor="total" className="block text-sm font-medium text-text-muted mb-1">Precio</label>
                <input type="number" step="any" {...register("total", { required: true })} className="input" />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="description" className="block text-sm font-medium text-text-muted mb-1">Descripción</label>
              <input type="text" {...register("description", { required: true })} className="input" />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-text-muted mb-1">Tipo de Gravación</label>
              <RadioButton options={optionsRadioButton} />
            </div>
            <div className="w-full border-t border-bg-subtle pt-2">
              <label className="block text-sm font-medium text-text-muted mb-1">Tipo de Venta</label>
              <RadioButton options={optionsRadioButtonType} optionName="optionSelectedType" />
            </div>
            <div className="flex justify-center pt-1">
              <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} />
      </Modal.Footer>
    </Modal>
  );

}
