'use client';

import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { LoadingPage } from "@/components/LoadingPage";
import { useSession } from "next-auth/react";
import { useProductExpiresLogic } from "@/hooks/products/useProductsExpiresLogic";
import { ExpiredStatistics } from "@/components/products/expired/ExpiredStatistics";
import useStateStore from "@/stores/stateStorage";
import { ShowProductsExpiredTable } from "@/components/products/expired/ShowProductsExpiredTable";
import { ProductDetailsModal } from "@/components/products/ProductDetailsModal";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";

export default function Page() {
  const { data: session, status } = useSession();
  const { productsExpired, expired } = useProductExpiresLogic();
  const { loading } = useStateStore();
  const isLoading = loading["Expirations"] ? true : false;
  const { modals, closeModal } = useModalStore();
  const { getSelectedElement } = useTempSelectedElementStore();


  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Proximos Vencimientos" />
        <ShowProductsExpiredTable records={productsExpired} isLoading={isLoading} />
    </div>
    <div className="col-span-3">
        <ViewTitle text="Detalles" />
        <ExpiredStatistics statics={expired} isLoading={isLoading} />
    </div> 
    <ProductDetailsModal isShow={modals.productDetails} onClose={() => closeModal('productDetails')} record={getSelectedElement("productDetails")} /> 
    <ToasterMessage />
</div>
  );
}
