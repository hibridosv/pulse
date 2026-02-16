import useConfigStore from "@/stores/configStore";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { sumarTotales } from "../../utils";


export function PayButton() {
  const { order, sending} = ordersProductsStore();

  const { system, cashdrawer } =useConfigStore();

  if (!order) return <></>


  const total = sumarTotales(order?.invoiceproducts);

  const blockMaxQuantityWithOutNit = system?.country == 3 && total >= 2500 && !order?.client_id;
  const disabledButonPay = sending || !cashdrawer || blockMaxQuantityWithOutNit || (!order?.client_id && (order?.invoice_assigned?.type == 3 || order?.invoice_assigned?.type == 4));
  const payType = 1;

    return (
        <div>
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
    );

}
