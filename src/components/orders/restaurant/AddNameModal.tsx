"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useOrderRestaurantFnLogic } from "@/hooks/order/restaurant/useOrderRestaurantFnLogic";
import ordersStore from "@/stores/orders/ordersStore";
import useTempStorage from "@/stores/useTempStorage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteSweep } from "react-icons/md";

export interface AddNameModalI {
  onClose: () => void;
  isShow: boolean;
}



export function AddNameModal(props: AddNameModalI) {
  const { onClose, isShow } = props;
  const { order, sending, error } = ordersStore();
  const { addName } = useOrderRestaurantFnLogic();
  const { getElement, clearElement } = useTempStorage();



  const { register, handleSubmit, resetField, setFocus, setValue } = useForm();

  useEffect(() => {
    if (order && isShow) {
        setValue("value", order?.attributes?.table?.name ?? null);
        setFocus('value', { shouldSelect: true });
      }
  }, [setFocus, isShow, order, setValue,]);

  if (!isShow || !order) return null;

 const onSubmit = async(data: any) => {
     if (!data.value || !order) return;
     let values: any = {
       name_table: data.value
     }
    addName(order.id, values);
     if (!error) {
       onClose();
     }
 }

 const clean = ()=>{
    if (!order) return;
     let values: any = {
       name_table: null
     }
    addName(order.id, values);
     if (!error) {
       onClose();
     }
 }


  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Agregar Nombre de la mesa" >
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80 p-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
              <div>
                <label htmlFor="value" className="input-label" >Nombre de la mesa</label>
                  <input type="text" {...register("value", { required: true, max:50, min:5 })} className="input" />
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
