'use client';

import { OrderProductsSearchPrincipal } from "@/components/orders/common/OrderProductsSearchPrincipal";
import { InvoiceTypesModal } from "@/components/orders/products/InvoiceTypesModal";
import { OrderButtons } from "@/components/orders/products/OrderButtons";
import { OrderProductsTable } from "@/components/orders/products/OrderProductsTable";
import { PayedModal } from "@/components/orders/products/PayedModal";
import { PayModal } from "@/components/orders/products/PayModal";
import { ShowOrders } from "@/components/orders/products/ShowOrders";
import { ShowTotal } from "@/components/orders/products/ShowTotal";
import { ToasterMessage } from "@/components/toaster-message";
import { useOrderProductsLogic } from "@/hooks/order/product/useOrderProductsLogic";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";

export default function Page() {
  useOrderProductsLogic(true);
  const { order } = ordersProductsStore();
  const { modals, closeModal, openModal} = useModalStore();
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
          <div className="col-span-6 border-r md:border-sky-600">
            <div className="pt-2">
              <OrderProductsSearchPrincipal />
            </div>
            <div className="relative z-0">
              <OrderProductsTable order={order} />
            </div>
          </div>
          <div className="col-span-4 flex justify-center ">
            <ShowOrders />
            <ShowTotal order={order} />
            <div className="absolute bottom-2 ">
            <div onClick={() => openModal('invoiceType')}>click</div>
                <OrderButtons order={order} />
            </div>
          </div>
        <InvoiceTypesModal isShow={modals.invoiceType} onClose={()=>{ closeModal('invoiceType')}} />
        <PayedModal isShow={modals.paymentSuccess} onClose={()=>{ closeModal('paymentSuccess')}} />
        <PayModal isShow={modals.payOrder} onClose={()=>{ closeModal('payOrder')}} />
        <ToasterMessage />
    </div>
  );
}
