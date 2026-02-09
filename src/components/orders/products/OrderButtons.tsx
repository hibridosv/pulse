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
        <div className='flex'>
          <Popper label={ <div className='button-grey rounded-l-lg clickeable'><IoMdOptions className='mr-1' /> Opciones</div>} >
            <Buttons order={order} />
          </Popper>
        <div className='button-cyan clickeable' onClick={saving ? ()=>{} : ()=>save(order.id)}>{ saving ? <LoaderIcon className='mr-1' /> : <AiFillSave className='mr-1' />}  Guardar </div>
        <div className={`button-lime ${payDisabled ? 'cursor-not-allowed' : 'clickeable'}`} onClick={payDisabled ? ()=>{} : ()=>{}}> <FaRegMoneyBillAlt className='mr-1' /> Cobrar </div>
        <div className='button-red rounded-r-lg clickeable' onClick={()=>{openModal('deleteOrder')}}><GiCancel className='mr-1' /> Cancelar </div>
      </div>
      <DeleteModal
              isShow={modals.deleteOrder}
              text={`¿Estas seguro de eliminar esta orden?`}
              onDelete={() =>{ cancel(order?.id); closeModal('deleteOrder'); }}
              onClose={() => closeModal('deleteOrder')} />
    </div>);
}
