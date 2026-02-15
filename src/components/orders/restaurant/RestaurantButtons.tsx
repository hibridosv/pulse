import { Alert } from "@/components/Alert/Alert";
import { DeleteModal } from "@/components/DeleteModal";
import { Popper } from "@/components/popper/Popper";
import { useOrderFnLogic } from "@/hooks/order/product/useOrderFnLogic";
import { requiredFieldsCCF, validateInvoiceFields } from "@/lib/validator-functions";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import { AiFillSave } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import { Buttons } from "../products/Buttons";
import { countSendPrintZero, sumarCantidad } from "../utils";


export function RestaurantButtons() {
  const { order, sending} = ordersProductsStore();

  const { save, pay, cancel } = useOrderFnLogic();
  const { saving } = ordersProductsStore();
  const { modals, closeModal, openModal} = useModalStore();
  const invoice = order;
  const { system, cashdrawer } =useConfigStore();

  if (!order) return <></>

  const validateFields = ()=>{
    if (invoice?.client_id && invoice?.invoice_assigned?.type == 3) {
      return validateInvoiceFields(invoice?.client, requiredFieldsCCF) 
    }
  }
  const total = sumarCantidad(order?.invoiceproducts);

  let fieldsRequired = validateFields();
  let payDisabled = !cashdrawer || (!invoice?.client_id && invoice?.invoice_assigned?.type == 3) || fieldsRequired && fieldsRequired.length > 0;
  const blockMaxQuantityWithOutNit = system?.country == 3 && total >= 2500 && !order?.client_id;
  const disabledButonPay = sending || !cashdrawer || blockMaxQuantityWithOutNit || (!order?.client_id && (order?.invoice_assigned?.type == 3 || order?.invoice_assigned?.type == 4));
const payType = 1; // tipo de pago, efectivo u otros


    return (
        <div className="p-2 mt-4 w-full">
            
        { !cashdrawer && 
        <Alert type="danger" title="Error" text="Debe seleccionar una caja para poder cobrar" isDismissible={false} className='my-1' /> }

        { (!invoice?.client_id && (invoice?.invoice_assigned?.type == 3 || invoice?.invoice_assigned?.type == 4)) && 
        <Alert type="danger" title="Error" text={`Seleccione un cliente para el ${invoice?.invoice_assigned?.type == 3 ? "CCF" : "Sujeto Excluido"}`} isDismissible={false} className='my-1' /> }

        { fieldsRequired && fieldsRequired.length > 0 && 
          <div>Faltan los siguientes campos del cliente para facturar: <div className="text-red-500">{`${fieldsRequired.join(', ')}.`}</div></div> 
        }
        <div className='grid grid-cols-2 gap-1.5 sm:flex sm:gap-0 w-full'>
          <Popper label={ <div className='button-grey w-4/10 clickeable'><IoMdOptions className='mr-1' /> Opciones</div>} >
            <Buttons order={order} />
          </Popper>
        
        <div className='button-lime clickeable w-2/10 relative' title='Guardar' onClick={sending ? ()=>{} : () => console.log('Guardar')} >
                <AiFillSave size={24} className='mr-1' />
                { countSendPrintZero(order) != 0 &&
                    <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                }
            </div>

        
        { payType == 1 ?
            <button disabled={disabledButonPay} type='submit'  className={`${disabledButonPay ? 'button-cyan w-full' : 'button-cyan clickeable w-full'}`}><FaRegMoneyBillAlt className='mr-1' /> Cobrar</button>
            : 
            <div className='button-cyan clickeable w-full' title='Cobrar' onClick={(disabledButonPay) ? ()=>{} : ()=>console.log('Cobrar')}><FaRegMoneyBillAlt className='mr-1' /> Cobrar</div>
            }
      </div>
      <DeleteModal
              isShow={modals.deleteOrder}
              text={`¿Estas seguro de eliminar esta orden?`}
              onDelete={() =>{ cancel(order?.id); closeModal('deleteOrder'); }}
              onClose={() => closeModal('deleteOrder')} />
        </div>
    );

}
