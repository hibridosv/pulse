"use client";
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import useConfigStore from "@/stores/configStore";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
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
  const { payMethods } = useConfigStore();
  const { order, sending } = ordersProductsStore();
  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm();
  const { setSelectedElement, getSelectedElement} = useTempSelectedElementStore();
  const paymentType = getSelectedElement('paymentType') ?? 1;
  const { pay } = useOrderFnLogic();


  if (!isShow || !order) return null;

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="" closeOnOverlayClick={false} removeTitle={true}>
      <Modal.Body>
        <div className="p-4 space-y-6">
          <OrderTotal />
            <div>
              <form onSubmit={handleSubmit(pay)} className="w-full">
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
                      <Button type="submit" text={`${order?.invoice_assigned?.type == 8 ? "Crear nota de Envío" : "Cobrar"}`} disabled={sending} preset={sending ? Preset.saving : Preset.save} isFull />
                    </div>
                </div>
                ) :
                (
                  <div className="flex justify-center">
                    { paymentType === 5 && !order?.client_id ?
                     <Alert text="Debe agregar un cliente para continuar con el credito" type="danger" isDismissible={false} /> : 
                     paymentType === 5 && order?.client_id && order?.client?.is_credit_block == 1 ?
                      <Alert text="Cliente bloqueado para otrorgar credito" type="danger" isDismissible={false} /> :
                      <Button type="submit" preset={sending ? Preset.saving : Preset.primary} 
                      text={ paymentType === 5  ? `Asignar Credito` : `Pagar con ${nameOfPaymentType(paymentType)}`} disabled={sending} />
                    }
                  </div>
                )}
              </form>
            </div>
        </div>
      </Modal.Body>
          { !sending && order?.invoice_assigned?.type != 8 &&
          <div className='flex justify-between px-4 py-2 text-sm font-semibold border rounded-lg transition-colors duration-150'>
            {
              payMethods && payMethods.length > 0 && payMethods.map((method: any) => {
                if (method.status == 0) return null;
                return (<span key={method.id} className={`mx-1 text-sm clickeable ${paymentType === method.iden ? 'font-bold text-cyan-800 ' : 'text-text-base'}`} 
                  onClick={()=>setSelectedElement('paymentType', method.iden)}>{method.name}</span>);
              })
            }
          </div> }
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} isFull disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
