'use client';

import { Alert } from '@/components/Alert/Alert';
import { Order } from '@/interfaces/order';
import { requiredFieldsCCF, validateInvoiceFields } from '@/lib/validator-functions';
import useConfigStore from '@/stores/configStore';
import { AiFillSave } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { IoMdOptions } from 'react-icons/io';

export interface OrderButtonsI {
  order: Order;
}

export function OrderButtons(props: OrderButtonsI) {
  const { order } = props
  const { system, activeConfig, cashdrawer } = useConfigStore();
  const invoice = order;
  const isDiscount = activeConfig && activeConfig.includes("sales-discount");
  const isOtherSeller = activeConfig && activeConfig.includes("sales-other-seller");
  const isReferred = activeConfig && activeConfig.includes("sales-referred");
  const isDelivery = activeConfig && activeConfig.includes("sales-delivery-man");
  const isOtherSales = activeConfig && activeConfig.includes("sales-other-sales");
  const isSpecial = activeConfig && activeConfig.includes("sales-special");
  const isComment = activeConfig && activeConfig.includes("sales-comment");
  const isRemission = activeConfig && activeConfig.includes("sales-remission");
  const isQuote = activeConfig && activeConfig.includes("sales-quote");

  //const validateFields = ()=>{
  //  if (invoice?.client_id && (invoice?.invoice_assigned?.type == 2 || invoice?.invoice_assigned?.type == 3)) {
  //    return validateInvoiceFields(invoice?.client, invoice?.invoice_assigned?.type == 2 ? requiredFieldsFactura : requiredFieldsCCF) 
  //  }
  // }

  if(!order) return null;

  const validateFields = ()=>{
    if (invoice?.client_id && invoice?.invoice_assigned?.type == 3) {
      return validateInvoiceFields(invoice?.client, requiredFieldsCCF) 
    }
  }

  let fieldsRequired = validateFields();
  let payDisabled = !cashdrawer || (!invoice?.client_id && invoice?.invoice_assigned?.type == 3) || fieldsRequired && fieldsRequired.length > 0;

  return (<div>
          { !cashdrawer && <Alert
          type="danger"
          title="Error"
          text="Debe seleccionar una caja para poder cobrar"
          isDismissible={false}
          className='my-1'
          /> }

        { (!invoice?.client_id && (invoice?.invoice_assigned?.type == 3 || invoice?.invoice_assigned?.type == 4)) && <Alert
          type="danger"
          title="Error"
          text={`Seleccione un cliente para el ${invoice?.invoice_assigned?.type == 3 ? "CCF" : "Sujeto Excluido"}`}
          isDismissible={false}
          className='my-1'
          /> }

        { fieldsRequired && fieldsRequired.length > 0 && 
          <div>Faltan los siguientes campos del cliente para facturar: <div className="text-red-500">{`${fieldsRequired.join(', ')}.`}</div></div> 
        }
           <div className='flex'>
                {/* <div className="w-8/10">
                { isDiscount && 
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.discount)}>  Agregar Descuento</div>}
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.client)}> Asignar Cliente</div>
                { isOtherSeller && 
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.seller)}>Asignar Vendedor</div>}
                { isReferred && 
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.referred)}> Asignar Referido</div>}
                { isDelivery && 
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.delivery)}> Asignar Repartidor </div>}
                { isOtherSales && 
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.otrasVentas)}> Otras Ventas</div>}
                { isSpecial && 
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.ventaSpecial)}> Venta Especial </div>}
                { isComment && 
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.comment)}> Agregar comentario </div>}
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.documentType)}> Tipo de Documento </div>
                { isQuote &&
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.quotes)}> Guardar como Cotización</div> }
                { isRemission && 
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.remission)}> Crear Nota de Remisión</div> }
                <div className='button-options-sales' onClick={()=>onClick(OptionsClickOrder.renta)}> Agregar Retención Renta</div>?
                </div> */}
              
            <div className='button-left-grey clickeable'><IoMdOptions className='mr-1' /> Opciones</div>
            <div className='button-cyan clickeable' onClick={()=>{}}> <AiFillSave className='mr-1' /> Guardar </div>
            <div className={`button-lime ${payDisabled ? 'cursor-not-allowed' : 'clickeable'}`} onClick={payDisabled ? ()=>{} : ()=>{}}> <FaRegMoneyBillAlt className='mr-1' /> Cobrar </div>
              <div className='button-red rounded-r-lg clickeable' onClick={()=>{}}><GiCancel className='mr-1' /> Cancelar </div>
           </div>
    </div>);
}
