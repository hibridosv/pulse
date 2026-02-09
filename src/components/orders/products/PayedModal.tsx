"use client";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { nameOfPaymentType } from "./PayModal";

export interface PayedModal {
  onClose: () => void;
  isShow: boolean;
}

export function PayedModal(props: PayedModal) {
  const { onClose, isShow } = props;
  const { system } = useConfigStore();
  const { getSelectedElement } = useTempSelectedElementStore();
  const orderPayed = getSelectedElement('paymentSuccess') ?? null;
  const paymentType = getSelectedElement('paymentType') ?? 1;
  const { sending } = ordersProductsStore();

  if (!isShow || !orderPayed) return null;

    console.log(orderPayed);



  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="" closeOnOverlayClick={false} removeTitle={true}>
      <Modal.Body>
        <div className="p-4 space-y-6">
        <div onClick={()=>console.log('click')} className='cursor-pointer'>
        <div className="w-full my-4">
          { orderPayed?.invoice_assigned?.type != 8 &&
          <div  className='flex justify-between  border-y-4'>
            <div><span className="flex justify-center">Descuentos</span> <span className="flex justify-center">{numberToMoney(orderPayed?.discount, system)}</span></div>
            <div><span className="flex justify-center">Impuestos</span> <span className="flex justify-center">{numberToMoney(orderPayed?.taxes, system)}</span></div>
            <div><span className="flex justify-center">Sub Total</span> <span className="flex justify-center">{numberToMoney(orderPayed?.subtotal, system)}</span></div>
          </div>
          }

          <div className="flex justify-center mt-4">TOTAL</div>
          <div className="flex justify-center text-7xl mb-4 font-bold">{numberToMoney(orderPayed?.total - orderPayed?.retention, system)}</div>
          { paymentType === 1 && orderPayed?.invoice_assigned?.type != 8 ? <>
          <div className="flex justify-center">CAMBIO</div>
          <div className="flex justify-center text-7xl mb-4 text-red-600 font-bold">{numberToMoney(orderPayed?.change, system)}
          </div></> : 
          <div className='flex justify-center text-lg font-semibold uppercase text-blue-600'>
            { paymentType === 5 ? 
            <span>Credito Otorgado correctamente</span> : orderPayed?.invoice_assigned?.type == 8 ? <span>Nota de envío realizada</span> :
            <span>Pago realizado con {nameOfPaymentType(paymentType)}</span> }
          </div>}
        
        </div>
      </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} isFull disabled={sending} /> 
      </Modal.Footer>
    </Modal>
  );

}
