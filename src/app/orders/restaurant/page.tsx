'use client';

import { RestaurantMenu } from "@/components/orders/restaurant/RestaurantMenu";
import { ServiceTypeSelect } from "@/components/orders/restaurant/ServiceTypeSelect";
import { ToasterMessage } from "@/components/toaster-message";
import { useMenuLogic } from "@/hooks/order/restaurant/useMenuLogic";
import { useOrderRestaurantLogic } from "@/hooks/order/restaurant/useOrderRestaurantLogic";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";

export default function Page() {
  useMenuLogic();
  useOrderRestaurantLogic(true);
  const { order } = ordersProductsStore();
  const { modals, closeModal } = useModalStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
          <div className="md:col-span-6 md:border-r md:border-primary">
            <div className="relative z-0">
              <RestaurantMenu />
            </div>
          </div>
          <div className="md:col-span-4 flex justify-center ">
            <div className="w-full">
              <ServiceTypeSelect order={order} />
              <div className="mx-4">Total</div>
            </div>
          </div>
          <ToasterMessage />
    </div>
  );
}
