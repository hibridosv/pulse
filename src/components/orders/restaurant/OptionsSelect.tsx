import { getPaymentTypeName } from "@/lib/utils";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export function deliveryTypeRestaurant(type: number) {
    switch (type) {
      case 1: return "Comer Aqui";
      case 2: return "Para Llevar";
      case 3: return "Delivery";
    }
}

export function OptionsSelect() {
  const { order } = ordersProductsStore();
  const { getSelectedElement} = useTempSelectedElementStore();
  const paymentType = getSelectedElement('paymentType') ?? 1;
  const { modals, closeModal, openModal} = useModalStore();


  if (!order?.invoiceproducts) return <></>
  if (order?.invoiceproducts.length == 0) return <></>


      return (
            <div>
              <div className="flex justify-around w-full h-7 shadow-md">
                <div className="w-full font-medium clickeable bg-gray-200 items-center text-center border-r-2" onClick={()=>{}}>
                  { deliveryTypeRestaurant(order?.delivery_type) }
                </div>
                <div className="w-full font-medium clickeable bg-sky-200 items-center text-center" onClick={()=>{ openModal('invoiceType') }}>
                  { order?.invoice_assigned?.name }
                </div>
                <div className="w-full font-medium clickeable bg-gray-200 items-center text-center border-l-2" onClick={()=> {}}>
                  {getPaymentTypeName(paymentType)}
                </div>
            </div>
            </div>
  );

}
