'use client';

import { Alert } from '@/components/Alert/Alert';
import { DeleteModal } from '@/components/DeleteModal';
import { Popper } from '@/components/popper/Popper';
import { useOrderFnLogic } from '@/hooks/order/product/useOrderFnLogic';
import { Order } from '@/interfaces/order';
import { requiredFieldsCCF, validateInvoiceFields } from '@/lib/validator-functions';
import useConfigStore from '@/stores/configStore';
import useModalStore from '@/stores/modalStorage';
import ordersProductsStore from '@/stores/orders/ordersProductsStore';
import { LoaderIcon } from 'react-hot-toast';
import { AiFillSave } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { IoMdOptions } from 'react-icons/io';
import { Buttons } from './Buttons';

export interface OrderButtonsI {
  order: Order;
}

export function OrderButtons(props: OrderButtonsI) {
  const { order } = props
  const { cashdrawer } = useConfigStore();
  const { save, pay, cancel } = useOrderFnLogic();
  const { saving } = ordersProductsStore();
  const { modals, closeModal, openModal} = useModalStore();

  const invoice = order;

  if(!order) return null;

  const validateFields = ()=>{
    if (invoice?.client_id && invoice?.invoice_assigned?.type == 3) {
      return validateInvoiceFields(invoice?.client, requiredFieldsCCF) 
    }
  }

  let fieldsRequired = validateFields();
  let payDisabled = !cashdrawer || (!invoice?.client_id && invoice?.invoice_assigned?.type == 3) || fieldsRequired && fieldsRequired.length > 0;

  return (<div>
        { !cashdrawer && 
        <Alert type="danger" title="Error" text="Debe seleccionar una caja para poder cobrar" isDismissible={false} className='my-1' /> }

        { (!invoice?.client_id && (invoice?.invoice_assigned?.type == 3 || invoice?.invoice_assigned?.type == 4)) && 
        <Alert type="danger" title="Error" text={`Seleccione un cliente para el ${invoice?.invoice_assigned?.type == 3 ? "CCF" : "Sujeto Excluido"}`} isDismissible={false} className='my-1' /> }

        { fieldsRequired && fieldsRequired.length > 0 && 
          <div>Faltan los siguientes campos del cliente para facturar: <div className="text-red-500">{`${fieldsRequired.join(', ')}.`}</div></div> 
        }
        <div className='grid grid-cols-4 gap-1.5 sm:flex sm:gap-0'>
          <Popper label={ <div className='button-grey rounded-lg sm:rounded-l-lg sm:rounded-r-none text-sm clickeable w-full'><IoMdOptions className='sm:mr-1' /> <span className='hidden sm:inline'>Opciones</span></div>} >
            <Buttons order={order} />
          </Popper>
        <div className='button-cyan rounded-lg sm:rounded-none text-sm clickeable' onClick={saving ? ()=>{} : ()=>save(order.id)}>{ saving ? <LoaderIcon className='sm:mr-1' /> : <AiFillSave className='sm:mr-1' />} <span className='hidden sm:inline'>Guardar</span> </div>
        <div className={`button-lime rounded-lg sm:rounded-none text-sm ${payDisabled ? 'cursor-not-allowed' : 'clickeable'}`} onClick={payDisabled ? ()=>{} : ()=>{ openModal('payOrder') }}> <FaRegMoneyBillAlt className='sm:mr-1' /> <span className='hidden sm:inline'>Cobrar</span> </div>
        <div className='button-red rounded-lg sm:rounded-r-lg sm:rounded-l-none text-sm clickeable' onClick={()=>{openModal('deleteOrder')}}><GiCancel className='sm:mr-1' /> <span className='hidden sm:inline'>Cancelar</span> </div>
      </div>
      <DeleteModal
              isShow={modals.deleteOrder}
              text={`¿Estas seguro de eliminar esta orden?`}
              onDelete={() =>{ cancel(order?.id); closeModal('deleteOrder'); }}
              onClose={() => closeModal('deleteOrder')} />
    </div>);
}
