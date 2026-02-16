'use client';

import { InvoiceTypesModal } from "@/components/orders/common/InvoiceTypesModal";
import { CategoryMenuModal } from "@/components/orders/restaurant/CategoryMenuModal";
import { InvoicePaymentMethodModal } from "@/components/orders/restaurant/InvoicePaymentMethodModal";
import { OptionsSelect } from "@/components/orders/restaurant/OptionsSelect";
import { PayedRestaurantModal } from "@/components/orders/restaurant/PayedRestaurantModal";
import { RestaurantButtons } from "@/components/orders/restaurant/RestaurantButtons";
import { RestaurantMenu } from "@/components/orders/restaurant/RestaurantMenu";
import { RestaurantProductsAdded } from "@/components/orders/restaurant/RestaurantProductsAdded";
import { RestaurantShowTotal } from "@/components/orders/restaurant/RestaurantShowTotal";
import { ServiceTypeSelect } from "@/components/orders/restaurant/ServiceTypeSelect";
import { ToasterMessage } from "@/components/toaster-message";
import { useMenuLogic } from "@/hooks/order/restaurant/useMenuLogic";
import { useOrderRestaurantLogic } from "@/hooks/order/restaurant/useOrderRestaurantLogic";
import useModalStore from "@/stores/modalStorage";
import ordersRestaurantsStore from "@/stores/orders/ordersRestaurantsStore";

export default function Page() {
  useMenuLogic();
  useOrderRestaurantLogic(true);
  const { order } = ordersRestaurantsStore();
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

              <RestaurantProductsAdded />
              <RestaurantShowTotal />
              <RestaurantButtons />
              <OptionsSelect />
          </div>
        </div>
          <PayedRestaurantModal isShow={modals.paymentSuccess} onClose={()=>{ closeModal('paymentSuccess')}} />
          <InvoicePaymentMethodModal isShow={modals.payMethod} onClose={()=>{ closeModal('payMethod')}} />
          <InvoiceTypesModal isShow={modals.invoiceType} onClose={()=>{ closeModal('invoiceType')}} />
          <CategoryMenuModal isShow={modals.categoryMenu} onClose={()=>{ closeModal('categoryMenu')}} />
          <ToasterMessage />
    </div>
  );
}
