"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { useOrderLoadersLogic } from "@/hooks/order/product/useOrderLoadersLogic";
import { UpdateServiceInterface } from "@/services/Interfaces";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteSweep } from "react-icons/md";

export interface ChangeRowProductModalI {
  onClose: () => void;
  isShow: boolean;
}


const getName = (row: string) => {
  switch (row) {
    case "product": return "Nombre";
    case "comment": return "Comentario";
    case "commission": return "Comisión";
    default: return "";
  }
}


export function ChangeRowProductModal(props: ChangeRowProductModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersProductsStore();
  const { updateProduct} = useOrderFnLogic();
  useOrderLoadersLogic(isShow)
  const { getSelectedElement, clearSelectedElement } = useTempSelectedElementStore();
  const product = getSelectedElement('productSelected');
  const rowToUpdate = getSelectedElement('rowToUpdate');


  const { register, handleSubmit, resetField, setFocus, setValue } = useForm();

  useEffect(() => {
    if (product && isShow) {
      if (rowToUpdate) {
        setValue("value", product[rowToUpdate]);
        setFocus('value', { shouldSelect: true });
      }
    }
  }, [setFocus, isShow, product, setValue, rowToUpdate]);

  if (!isShow || !order) return null;

 const onSubmit = async(data: any) => {
     if (!rowToUpdate || !data.value || !product) return;
     let values: UpdateServiceInterface = {
       row: rowToUpdate,
       value: data.value
     }
    updateProduct(product.id, values);
     if (!error && !sending) {
       clearSelectedElement('rowToUpdate');
       clearSelectedElement('productSelected');
       onClose();
     }
 }

 const clean = ()=>{
         if (!rowToUpdate || !product) return;
     let values: UpdateServiceInterface = {
       row: rowToUpdate,
       value: null
     }
    updateProduct(product.id, values);
     if (!error && !sending) {
       clearSelectedElement('rowToUpdate');
       clearSelectedElement('productSelected');
       onClose();
     }
 }


  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle={`Cambiar ${getName(rowToUpdate)}`} >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80 p-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
              <div>
                <label htmlFor="value" className="input-label" >{ getName(rowToUpdate) } del producto</label>
                  {
                  rowToUpdate == "commission" ?
                  <input type="number" step="any" {...register("value", { required: true })} className="input" />
                  :
                  <textarea rows={rowToUpdate == "comment" ? 8 : 2} {...register("value", { required: true, max:250, min:5 })} className="input" />
                }
              </div>
              <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
            </form>
          </div>
          { error &&
          <Alert type="danger" text={`Existe un error, No se actualizo correctamente el registro. Vuelva a intentarlo.`} isDismissible={false} className="mt-3" />
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        {
        rowToUpdate == "comment" && 
          <MdDeleteSweep title="Eliminar Comentario" size={32} className="text-red-700 clickeable justify-start w-full" onClick={clean} />
        }
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
