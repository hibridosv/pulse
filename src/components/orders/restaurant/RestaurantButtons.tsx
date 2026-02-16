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
  const blockMaxQuantityWithOutNit = system?.country == 3 && total >= 2500 && !order?.client_id;
  const disabledButonPay = sending || !cashdrawer || blockMaxQuantityWithOutNit || (!order?.client_id && (order?.invoice_assigned?.type == 3 || order?.invoice_assigned?.type == 4));
  const payType = 1;
  const isPrintable = countSendPrintZero(order) != 0;


    return (
        <div className="w-full space-y-3 px-3 pt-3 pb-4">

        { !cashdrawer &&
        <Alert type="danger" title="Error" text="Debe seleccionar una caja para poder cobrar" isDismissible={false} /> }

        { (!invoice?.client_id && (invoice?.invoice_assigned?.type == 3 || invoice?.invoice_assigned?.type == 4)) &&
        <Alert type="danger" title="Error" text={`Seleccione un cliente para el ${invoice?.invoice_assigned?.type == 3 ? "CCF" : "Sujeto Excluido"}`} isDismissible={false} /> }

        { fieldsRequired && fieldsRequired.length > 0 &&
          <div className="rounded-lg border border-danger/20 bg-danger/10 p-2.5 text-sm text-text-base">
            Faltan los siguientes campos del cliente para facturar:
            <span className="ml-1 font-semibold text-danger">{`${fieldsRequired.join(', ')}.`}</span>
          </div>
        }

        <div className="grid grid-cols-[2fr_1fr_2fr]">

          <Popper label={
            <div className="button-grey clickeable">
              <IoMdOptions className="mr-1.5" /> Opciones
            </div>
          }>
            {/* <Buttons order={order} /> */}
            <div></div>
          </Popper>

          {/* Guardar */}
          <div className="button-lime clickeable relative" title="Guardar" onClick={sending ? ()=>{} : () => console.log('Guardar')} >
            <AiFillSave size={22} />
            { isPrintable &&
              <span className="absolute -top-0 -right-0 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
              </span>
            }
          </div>

          {/* Cobrar */}
          { payType == 1 ?
            <button
              disabled={disabledButonPay}
              type="submit"
              className={`button-cyan w-full transition-opacity duration-200 ${disabledButonPay ? 'opacity-50 cursor-not-allowed' : 'clickeable'}`}
            >
              <FaRegMoneyBillAlt className="mr-1.5" size={20} /> Cobrar
            </button>
            :
            <div
              className={`button-cyan w-full transition-opacity duration-200 ${disabledButonPay ? 'opacity-50 cursor-not-allowed' : 'clickeable'}`}
              title="Cobrar"
              onClick={(disabledButonPay) ? ()=>{} : ()=>console.log('Cobrar')}
            >
              <FaRegMoneyBillAlt className="mr-1.5" size={20} /> Cobrar
            </div>
          }
        </div>

        <DeleteModal
          isShow={modals.deleteOrder}
          text={`¿Estas seguro de eliminar esta orden?`}
          onDelete={() =>{ cancel(order?.id); closeModal('deleteOrder'); }}
          onClose={() => closeModal('deleteOrder')}
        />
        </div>
    );

}
