import { useOrderRestaurantFnLogic } from "@/hooks/order/restaurant/useOrderRestaurantFnLogic";
import ordersStore from "@/stores/orders/ordersStore";
import { BsPrinterFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";


export function PrintOrderButton() {
  const { order, saving, collecting} = ordersStore();
  const { save } = useOrderRestaurantFnLogic();
  const isBlock = collecting || saving;
  
  if (!order) return <></>

    return (
        <div className={`button-lime relative ${isBlock ? 'opacity-50 cursor-not-allowed' : 'clickeable'}`} title="Imprimir Precuenta" 
        onClick={ isBlock ? ()=>{} : () => save(order.id, true)} >
          { saving ? <FaSpinner size={22} className="animate-spin" /> : <BsPrinterFill size={22} /> }
        </div>
    );

}
