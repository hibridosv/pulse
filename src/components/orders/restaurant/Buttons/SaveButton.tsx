import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import { AiFillSave } from "react-icons/ai";
import { countSendPrintZero } from "../../utils";


export function SaveButton() {
  const { order, sending} = ordersProductsStore();
  const isPrintable = countSendPrintZero(order) != 0;

  if (!order) return <></>

    return (
        <div className="button-lime clickeable relative" title="Guardar" onClick={sending ? ()=>{} : () => console.log('Guardar')} >
          <AiFillSave size={22} />
          { isPrintable &&
            <span className="absolute -top-0 -right-0 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
            </span>
          }
        </div>
    );

}
