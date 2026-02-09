"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import useConfigStore from "@/stores/configStore";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OrderTotal } from "./OrderTotal";

export interface PayModalI {
  onClose: () => void;
  isShow: boolean;
}

export const nameOfPaymentType = (type: number) => {
  switch (type) {
    case 1: return "Efectivo"
    case 2: return "Tarjeta"
    case 3: return "Transferencia"
    case 4: return "Cheque"
    case 5: return "Credito"
  }
}

export function PayModal(props: PayModalI) {
  const { onClose, isShow } = props;
  const { payMethods, activeConfig } = useConfigStore();
  const { order } = ordersProductsStore();
  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm();
  const [ paymentType, setPaymentType ] =  useState(1);

    if (!isShow) return null;
    const isPayInvoice = false;
    const isSending = false;

    const onSubmit = (data: any) => {
      console.log("onSubmit: ", data );
    }

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="" closeOnOverlayClick={false} removeTitle={true}>
      <Modal.Body>
        <div className="p-4 space-y-6">
          <OrderTotal />
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {paymentType === 1 ? (
              <div>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" >Search</label>
                  <div className="relative">
                    <input
                      type={`${order?.invoice_assigned?.type == 8 ? "hidden" : "number"}`}
                      step="any"
                      id="cash"
                      className="input"
                      placeholder="Ingrese la cantidad de efectivo"
                      {...register("cash")}
                    />
                  </div>
                    <div className="flex justify-center mt-2">
                      <Button type="submit" text={`${order?.invoice_assigned?.type == 8 ? "Crear nota de Envío" : "Cobrar"}`} disabled={isSending} preset={isSending ? Preset.saving : Preset.save} isFull />
                    </div>
                </div>
                ) :
                (
                  <div className="flex justify-center">
                    { paymentType === 5 && !order?.client_id ?
                     <Alert text="Debe agregar un cliente para continuar con el credito" type="danger" isDismissible={false} /> : 
                     paymentType === 5 && order?.client_id && order?.client?.is_credit_block == 1 ?
                      <Alert text="Cliente bloqueado para otrorgar credito" type="danger" isDismissible={false} /> :
                      <Button type="submit" preset={isSending ? Preset.saving : Preset.primary} 
                      text={ paymentType === 5  ? `Asignar Credito` : `Pagar con ${nameOfPaymentType(paymentType)}`} disabled={isSending} />
                    }
                  </div>
                )}
              </form>
            </div>
        </div>
      </Modal.Body>
          { !isPayInvoice && !isSending && order?.invoice_assigned?.type != 8 &&
          <div className='flex justify-between border-2 border-sky-500 mt-4 mx-1'>
            {
              payMethods && payMethods.length > 0 && payMethods.map((method: any) => {
                if (method.status == 0) return null;
                return (<span key={method.id} className='mx-1 text-sm font-bold clickeable' onClick={()=>setPaymentType(method.iden)}>{method.name}</span>);
              })
            }
          </div> }
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} isFull disabled={isSending} /> 
      </Modal.Footer>
    </Modal>
  );

}

