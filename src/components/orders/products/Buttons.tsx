'use client';

import { usePopper } from '@/components/popper/popperContext';
import { Order } from '@/interfaces/order';
import useConfigStore from '@/stores/configStore';
import useModalStore from '@/stores/modalStorage';
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';

export interface ButtonsI {
  order: Order;
}

export function Buttons(props: ButtonsI) {
  const { order } = props
  const { activeConfig } = useConfigStore();
  const { openModal} = useModalStore();
    const { setSelectedElement } = useTempSelectedElementStore();
  const isDiscount = activeConfig && activeConfig.includes("sales-discount");
  const isOtherSeller = activeConfig && activeConfig.includes("sales-other-seller");
  const isReferred = activeConfig && activeConfig.includes("sales-referred");
  const isDelivery = activeConfig && activeConfig.includes("sales-delivery-man");
  const isOtherSales = activeConfig && activeConfig.includes("sales-other-sales");
  const isSpecial = activeConfig && activeConfig.includes("sales-special");
  const isComment = activeConfig && activeConfig.includes("sales-comment");
  const isRemission = activeConfig && activeConfig.includes("sales-remission");
  const isQuote = activeConfig && activeConfig.includes("sales-quote");
  const { setIsOpen } = usePopper();

  //const validateFields = ()=>{
  //  if (invoice?.client_id && (invoice?.invoice_assigned?.type == 2 || invoice?.invoice_assigned?.type == 3)) {
  //    return validateInvoiceFields(invoice?.client, invoice?.invoice_assigned?.type == 2 ? requiredFieldsFactura : requiredFieldsCCF) 
  //  }
  // }

  if(!order) return null;


  return (<div>

                <div className="w-8/10">
                { isDiscount && 
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); }}>  Agregar Descuento</div>}
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); openModal('searchContact'); setSelectedElement('contactSearch', "customerSearch");}}> Asignar Cliente</div>
                { isOtherSeller && 
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); }}>Asignar Vendedor</div>}
                { isReferred && 
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); openModal('searchContact'); setSelectedElement('contactSearch', "referralSearch");}}> Asignar Referido</div>}
                { isDelivery && 
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); openModal('searchContact'); setSelectedElement('contactSearch', "driverSearch");}}> Asignar Repartidor </div>}
                { isOtherSales && 
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); }}> Otras Ventas</div>}
                { isSpecial && 
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); }}> Venta Especial </div>}
                { isComment && 
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); }}> Agregar comentario </div>}
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false);  openModal('invoiceType') }}> Tipo de Documento </div>
                { isQuote &&
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); }}> Guardar como Cotización</div> }
                { isRemission && 
                <div className='button-options-sales' onClick={()=>{ setIsOpen(false); }}> Crear Nota de Remisión</div> }
                {/* <div className='button-options-sales' onClick={()=>{ setIsOpen(false); }}> Agregar Retención Renta</div> */}
                </div>
    </div>);
}
