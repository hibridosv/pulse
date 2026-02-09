'use client';

import { OrderProductsSearchPrincipal } from "@/components/orders/common/OrderProductsSearchPrincipal";
import { OrderButtons } from "@/components/orders/products/OrderButtons";
import { OrderProductsTable } from "@/components/orders/products/OrderProductsTable";
import { PayModal } from "@/components/orders/products/PayModal";
import { ShowOrders } from "@/components/orders/products/ShowOrders";
import { ShowTotal } from "@/components/orders/products/ShowTotal";
import { ToasterMessage } from "@/components/toaster-message";
import { useOrderProductsLogic } from "@/hooks/order/product/useOrderProductsLogic";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";

export default function Page() {
  useOrderProductsLogic(true);
  const { order } = ordersProductsStore();

 
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
          <div className="col-span-6 border-r md:border-sky-600">
            <div className="pt-4">
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
                <OrderButtons order={order} />
            </div>
          </div>
        <PayModal isShow={true} onClose={()=>{}} />
        <ToasterMessage />
    </div>
  );
}
