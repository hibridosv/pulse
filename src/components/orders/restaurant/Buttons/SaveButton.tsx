import { useOrderRestaurantFnLogic } from "@/hooks/order/restaurant/useOrderRestaurantFnLogic";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import ordersRestaurantsStore from "@/stores/orders/ordersRestaurantsStore";
import { AiFillSave } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { countSendPrintZero } from "../../utils";


export function SaveButton() {
  const { order, saving, collecting} = ordersRestaurantsStore();
  const { sending: isSending } = ordersProductsStore();
  const { save } = useOrderRestaurantFnLogic();
  const isPrintable = countSendPrintZero(order) != 0;
  const isBlock = isSending || collecting || saving;
  
  if (!order) return <></>

    return (
        <div className={`button-lime relative ${isBlock ? 'opacity-50 cursor-not-allowed' : 'clickeable'}`} title="Guardar" onClick={ isBlock ? ()=>{} : () => save(order.id, false)} >
          { saving ? <FaSpinner size={22} className="animate-spin" /> : <AiFillSave size={22} /> }
          { isPrintable &&
            <span className="absolute -top-0 -right-0 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
            </span>
          }
        </div>
    );

}
