import { useOrderRestaurantFnLogic } from "@/hooks/order/restaurant/useOrderRestaurantFnLogic";
import useConfigStore from "@/stores/configStore";
import ordersStore from "@/stores/orders/ordersStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { sumarTotales } from "../../utils";


export function PayButton() {
  const { order, sending, collecting } = ordersStore();
  const { pay } = useOrderRestaurantFnLogic();
  const { system, cashdrawer } =useConfigStore();
  const { getSelectedElement} = useTempSelectedElementStore();
  const payMethod = getSelectedElement('payMethod') ?? 1;

  
  
  const total = sumarTotales(order?.invoiceproducts);
  
  const blockMaxQuantityWithOutNit = system?.country == 3 && total >= 2500 && !order?.client_id;
  const disabledButonPay = collecting || sending || !cashdrawer || blockMaxQuantityWithOutNit || (!order?.client_id && (order?.invoice_assigned?.type == 3 || order?.invoice_assigned?.type == 4));
  
  if (!order) return <></>

    return (
        <div>
          { payMethod == 1 ?
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
              onClick={(disabledButonPay) ? ()=>{} : ()=>pay({ cash: 0 })}
            >
              <FaRegMoneyBillAlt className="mr-1.5" size={20} /> Cobrar
            </div>
          }
        </div>
    );

}
