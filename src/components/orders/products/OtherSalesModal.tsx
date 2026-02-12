"use client";
import { Button, Preset } from "@/components/button/button";
import { Option, RadioButton } from "@/components/button/RadioButton";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { useOrderLoadersLogic } from "@/hooks/order/product/useOrderLoadersLogic";
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
  const { order, sending, error } = ordersProductsStore();
  const { updatePrice } = useOrderFnLogic();
  useOrderLoadersLogic(isShow)
  const { getSelectedElement, clearSelectedElement } = useTempSelectedElementStore();
  const product = getSelectedElement('productSelected');

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
  }, [setFocus, isShow, product, setValue])

  if (!isShow || !order) return null;

 const onSubmit = async(data: any) => {
     if (!data.quantity || !product || !order) return;
    let values = {
      order_id: order.id,
      quantity: data.quantity,
    };
    updatePrice(product.id, values);
     if (!error && !sending) {
       clearSelectedElement('productSelected');
       onClose();
     }
 }



  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Otras Ventas" >
      <Modal.Body>
        <div className="mx-4">
            <form className="max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)} >
                <div className="w-full md:w-full px-3 mb-4">
                    <label htmlFor="quantity" className="input-label" >Cantidad</label>
                    <input type="number" step="any" {...register("quantity", { required: true })} className="input" />
                </div>
                <div className="w-full md:w-full px-3 mb-4">
                    <label htmlFor="description" className="input-label" >Descripción</label>
                    <input type="text" {...register("description", { required: true })} className="input" />
                </div>
                <div className="w-full md:w-full px-3 mb-4">
                    <label htmlFor="total" className="input-label" >Precio</label>
                    <input type="number" step="any" {...register("total", { required: true })} className="input" />
                </div>
                <div className="w-full md:w-full px-3 mb-4 flex justify-center">
                 <RadioButton options={optionsRadioButton} />
                </div>
                <div className="w-full md:w-full px-3 mb-4 flex justify-center border-t border-sky-600 pt-2">
                  <RadioButton options={optionsRadioButtonType} optionName="optionSelectedType" />
                </div>
                <div className="flex justify-center">
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
