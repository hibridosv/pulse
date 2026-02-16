import { getPaymentTypeName } from "@/lib/utils";
import useModalStore from "@/stores/modalStorage";
import ordersRestaurantsStore from "@/stores/orders/ordersRestaurantsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export function deliveryTypeRestaurant(type: number) {
    switch (type) {
      case 1: return "Comer Aqui";
      case 2: return "Para Llevar";
      case 3: return "Delivery";
    }
}

export function OptionsSelect() {
  const { order } = ordersRestaurantsStore();
  const { getSelectedElement} = useTempSelectedElementStore();
  const payMethod = getSelectedElement('payMethod') ?? 1;
  const { modals, closeModal, openModal} = useModalStore();
  const invoiceTypeSelected = getSelectedElement('invoiceTypeSelected');
  const deliveryType = getSelectedElement('deliveryType');


  if (!order?.invoiceproducts) return <></>
  if (order?.invoiceproducts.length == 0) return <></>


      return (
            <div>
              <div className="flex justify-around w-full h-7 shadow-md">
                <div className="w-full font-medium clickeable bg-gray-200 items-center text-center border-r-2" onClick={()=>{ openModal('deliveryType') }}>
                  { deliveryTypeRestaurant(deliveryType) }
                </div>
                <div className="w-full font-medium clickeable bg-sky-200 items-center text-center" onClick={()=>{ openModal('invoiceType') }}>
                  { invoiceTypeSelected.name }
                </div>
                <div className="w-full font-medium clickeable bg-gray-200 items-center text-center border-l-2" onClick={()=> { openModal('payMethod') }}>
                  {getPaymentTypeName(payMethod)}
                </div>
            </div>
            </div>
  );

}
