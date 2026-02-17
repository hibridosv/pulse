'use client';

import { AddContactModal } from "@/components/contacs/AddContactModal";
import { AddCommentModal } from "@/components/orders/common/AddCommentModal";
import { DiscountsModal } from "@/components/orders/common/DiscountsModal";
import { InvoiceTypesModal } from "@/components/orders/common/InvoiceTypesModal";
import { OtherSalesModal } from "@/components/orders/products/OtherSalesModal";
import { SearchContactModal } from "@/components/orders/products/SearchContactModal";
import { SelectUserModal } from "@/components/orders/products/SelectUserModal";
import { SpecialSalesModal } from "@/components/orders/products/SpecialSalesModal";
import { CategoryMenuModal } from "@/components/orders/restaurant/CategoryMenuModal";
import { ChangeQuantityRestaurantModal } from "@/components/orders/restaurant/ChangeQuantityRestaurantModal";
import { DeliveryTypeModal } from "@/components/orders/restaurant/DeliveryTypeModal";
import { InvoicePaymentMethodModal } from "@/components/orders/restaurant/InvoicePaymentMethodModal";
import { OptionsSelect } from "@/components/orders/restaurant/OptionsSelect";
import { PayedRestaurantModal } from "@/components/orders/restaurant/PayedRestaurantModal";
import { ProductOptionsModal } from "@/components/orders/restaurant/ProductOptionsModal";
import { RestaurantButtons } from "@/components/orders/restaurant/RestaurantButtons";
import { RestaurantMenu } from "@/components/orders/restaurant/RestaurantMenu";
import { RestaurantProductsAdded } from "@/components/orders/restaurant/RestaurantProductsAdded";
import { RestaurantShowTotal } from "@/components/orders/restaurant/RestaurantShowTotal";
import { ServiceTypeSelect } from "@/components/orders/restaurant/ServiceTypeSelect";
import { ToasterMessage } from "@/components/toaster-message";
import { useMenuLogic } from "@/hooks/order/restaurant/useMenuLogic";
import { useOrderRestaurantLogic } from "@/hooks/order/restaurant/useOrderRestaurantLogic";
import { formatDateAsNumber } from "@/lib/date-formats";
import useModalStore from "@/stores/modalStorage";
import ordersStore from "@/stores/orders/ordersStore";
import CryptoJS from 'crypto-js';

export default function Page() {
  useMenuLogic();
  useOrderRestaurantLogic(true);
  const { order } = ordersStore();
  const { modals, closeModal } = useModalStore();

  const dateStr = formatDateAsNumber(new Date());
  const hash = CryptoJS.MD5(dateStr).toString().substring(0, 4).toUpperCase();
  console.log(hash);


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
          <AddCommentModal isShow={modals.addComment} onClose={()=>{ closeModal('addComment')}} />
          <ChangeQuantityRestaurantModal isShow={modals.changeQuantity} onClose={()=>{ closeModal('changeQuantity')}} />
          <SpecialSalesModal isShow={modals.specialSales} onClose={()=>{ closeModal('specialSales')}} />
          <OtherSalesModal isShow={modals.otherSales} onClose={()=>{ closeModal('otherSales')}} />
          <SelectUserModal isShow={modals.setUser} onClose={()=>{ closeModal('setUser')}} />
          <SearchContactModal isShow={modals.searchContact} onClose={()=>{ closeModal('searchContact')}} />
          <AddContactModal isShow={modals.contactAdd} onClose={()=>closeModal('contactAdd')} record={null} />
          <DiscountsModal isShow={modals.discountModal} onClose={()=>{ closeModal('discountModal')}} />
        
          <ProductOptionsModal isShow={modals.productOptions} onClose={()=>{ closeModal('productOptions')}} />
          <PayedRestaurantModal isShow={modals.paymentSuccess} onClose={()=>{ closeModal('paymentSuccess')}} />
          <InvoicePaymentMethodModal isShow={modals.payMethod} onClose={()=>{ closeModal('payMethod')}} />
          <DeliveryTypeModal isShow={modals.deliveryType} onClose={()=>{ closeModal('deliveryType')}} />
          <InvoiceTypesModal isShow={modals.invoiceType} onClose={()=>{ closeModal('invoiceType')}} />
          <CategoryMenuModal isShow={modals.categoryMenu} onClose={()=>{ closeModal('categoryMenu')}} />
          <ToasterMessage />
    </div>
  );
}
