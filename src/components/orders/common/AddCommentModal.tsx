"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { UpdateServiceInterface } from "@/services/Interfaces";
import ordersStore from "@/stores/orders/ordersStore";
import useTempStorage from "@/stores/useTempStorage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteSweep } from "react-icons/md";

export interface AddCommentModalI {
  onClose: () => void;
  isShow: boolean;
}



export function AddCommentModal(props: AddCommentModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersStore();
  const { update} = useOrderFnLogic();
  const { getElement, clearElement } = useTempStorage();



  const { register, handleSubmit, resetField, setFocus, setValue } = useForm();

  useEffect(() => {
    if (order && isShow) {
        setValue("value", order?.comment);
        setFocus('value', { shouldSelect: true });
      }
  }, [setFocus, isShow, order, setValue,]);

  if (!isShow || !order) return null;

 const onSubmit = async(data: any) => {
     if (!data.value || !order) return;
     let values: UpdateServiceInterface = {
       row: "comment",
       value: data.value
     }
    update(order.id, values);
     if (!error) {
       clearElement('rowToUpdate');
       clearElement('productSelected');
       onClose();
     }
 }

 const clean = ()=>{
    if (!order) return;
     let values: UpdateServiceInterface = {
       row: "comment",
       value: null
     }
    update(order.id, values);
     if (!error) {
       clearElement('rowToUpdate');
       clearElement('productSelected');
       onClose();
     }
 }


  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Agregar Comentario" >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80 p-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
              <div>
                <label htmlFor="value" className="input-label" >Comentario</label>
                  <textarea rows={8} {...register("value", { required: true, max:250, min:5 })} className="input" />
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
        <MdDeleteSweep title="Eliminar Comentario" size={32} className="text-red-700 clickeable justify-start w-full" onClick={clean} />
        <Button onClick={onClose} preset={Preset.close} disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
