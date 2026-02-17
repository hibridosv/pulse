
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import ordersStore from "@/stores/orders/ordersStore";
import { MdMoney, MdOutlinePointOfSale } from "react-icons/md";



export function InitialButtons() {
  const { order } = ordersStore();
  const { activeConfig } = useConfigStore();
  const { openModal} = useModalStore();

  const isOtherSales = activeConfig && activeConfig.includes("sales-other-sales");
  const isSpecial = activeConfig && activeConfig.includes("sales-special");

  if (order) return null;

  return (
    <div className="flex justify-center space-x-4 mt-4">
              { isOtherSales && 
              <MdOutlinePointOfSale className="clickeable text-lime-500 shadow-md" size={24} title="Otras Ventas" onClick={()=> openModal('otherSales')} /> 
              }
              { isSpecial && 
              <MdMoney className="clickeable text-teal-500 shadow-md" size={24} title="Ventas Especiales" onClick={()=> openModal('specialSales')} />
              }
    </div>
    );
}
