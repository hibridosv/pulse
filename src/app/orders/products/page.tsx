'use client';

import { AddContactModal } from "@/components/contacs/AddContactModal";
import { OrderProductsSearchPrincipal } from "@/components/orders/common/OrderProductsSearchPrincipal";
import { AddCommentModal } from "@/components/orders/products/AddCommentModal";
import { ChangePriceProductModal } from "@/components/orders/products/ChangePriceProductModal";
import { ChangeQuantityModal } from "@/components/orders/products/ChangeQuantityModal";
import { ChangeRowProductModal } from "@/components/orders/products/ChangeRowProductModal";
import { DiscountsModal } from "@/components/orders/products/DiscountsModal";
import { InitialButtons } from "@/components/orders/products/InitialButtons";
import { InvoiceTypesModal } from "@/components/orders/products/InvoiceTypesModal";
import { OrderButtons } from "@/components/orders/products/OrderButtons";
import { OrderProductsTable } from "@/components/orders/products/OrderProductsTable";
import { OtherSalesModal } from "@/components/orders/products/OtherSalesModal";
import { PayedModal } from "@/components/orders/products/PayedModal";
import { PayModal } from "@/components/orders/products/PayModal";
import { SearchContactModal } from "@/components/orders/products/SearchContactModal";
import { SelectUserModal } from "@/components/orders/products/SelectUserModal";
import { SetRemissionNoteModal } from "@/components/orders/products/SetRemissionNoteModal";
import { ShowOrders } from "@/components/orders/products/ShowOrders";
import { ShowTotal } from "@/components/orders/products/ShowTotal";
import { SpecialSalesModal } from "@/components/orders/products/SpecialSalesModal";
import { ProductDetailsGetModal } from "@/components/products/ProductDetailsGetModal";
import { ToasterMessage } from "@/components/toaster-message";
import { useOrderProductsLogic } from "@/hooks/order/product/useOrderProductsLogic";
import useModalStore from "@/stores/modalStorage";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";

export default function Page() {
  useOrderProductsLogic(true);
  const { order } = ordersProductsStore();
  const { modals, closeModal } = useModalStore();
  console.log(modals);
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
          <div className="md:col-span-6 md:border-r md:border-primary">
            <div className="pt-2">
              <OrderProductsSearchPrincipal />
            </div>
            <div className="relative z-0">
              <OrderProductsTable order={order} />
              <InitialButtons />
            </div>
          </div>
          <div className="md:col-span-4 flex justify-center ">
            <ShowOrders />
            <ShowTotal order={order} />
            <div className="absolute bottom-2 ">
                <OrderButtons order={order} />
            </div>
          </div>
        <AddCommentModal isShow={modals.addComment} onClose={()=>{ closeModal('addComment')}} />
        <SpecialSalesModal isShow={modals.specialSales} onClose={()=>{ closeModal('specialSales')}} />
        <OtherSalesModal isShow={modals.otherSales} onClose={()=>{ closeModal('otherSales')}} />
        <DiscountsModal isShow={modals.discountModal} onClose={()=>{ closeModal('discountModal')}} />
        <ChangePriceProductModal isShow={modals.changePriceProduct} onClose={()=>{ closeModal('changePriceProduct')}} />
        <ChangeRowProductModal isShow={modals.changeRow} onClose={()=>{ closeModal('changeRow')}} />
        <ProductDetailsGetModal isShow={modals.productDetails} onClose={()=>{ closeModal('productDetails')}} row="cod" />
        <ChangeQuantityModal isShow={modals.changeQuantity} onClose={()=>{ closeModal('changeQuantity')}} />
        <SetRemissionNoteModal isShow={modals.setRemissionNote} onClose={()=>{ closeModal('setRemissionNote')}} />
        <SelectUserModal isShow={modals.setUser} onClose={()=>{ closeModal('setUser')}} />
        <SearchContactModal isShow={modals.searchContact} onClose={()=>{ closeModal('searchContact')}} />
        <AddContactModal isShow={modals.contactAdd} onClose={()=>closeModal('contactAdd')} record={null} />
        <InvoiceTypesModal isShow={modals.invoiceType} onClose={()=>{ closeModal('invoiceType')}} />
        <PayedModal isShow={modals.paymentSuccess} onClose={()=>{ closeModal('paymentSuccess')}} />
        <PayModal isShow={modals.payOrder} onClose={()=>{ closeModal('payOrder')}} />
        <ToasterMessage />
    </div>
  );
}