'use client'

import { Button, Preset } from "@/components/button/button";
import { ChangeLotModal } from "@/components/products/remove/ChangeLotModal";
import { LastRegistersTable } from "@/components/products/remove/LastRegistersTable";
import { LotDetailsModal } from "@/components/products/remove/LotDetailsModal";
import { ProductsRegistersTable } from "@/components/products/remove/ProductsRegistersTable";
import { RemoveInitialForm } from "@/components/products/remove/RemoveInitialForm";
import { RemoveProductsForm } from "@/components/products/remove/RemoveProductsForm";
import { RemoveProductsSearch } from "@/components/products/remove/RemoveProductsSearch";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useProductRemoveLogic } from "@/hooks/products/useProductRemoveLogic";
import useModalStore from "@/stores/modalStorage";
import productRemovedStore from "@/stores/products/productRemovedStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export default function Page() {
  useProductRemoveLogic();
    const { loading, product, deleting, deletePrincipal, savePrincipal } = productRemovedStore();
    const { modals, closeModal } = useModalStore();
    const { getSelectedElement } = useTempSelectedElementStore();
    const isActive = product?.failures && product.failures.filter((fai: any) => fai.status == 1).length > 0;



  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-4 border-r md:border-primary">
          <ViewTitle text="Descontar Producto" />
          <RemoveInitialForm  />
          <RemoveProductsForm />
          <RemoveProductsSearch />
      </div>
      <div className="col-span-6">
          <ViewTitle text="Ultimos Registros" />
          <div className="p-4">
            <LastRegistersTable />
            <ProductsRegistersTable />
          </div>

          <div className='w-full mt-4 '>
            { product && <span className="float-right mx-4">
                { isActive ? 
                  <Button text="Guardar todo" disabled={loading || deleting} preset={deleting ? Preset.saving : Preset.save} onClick={()=>{ savePrincipal(`removes/${product?.id}`) }} /> : 
                  <Button text="Cancelar" disabled={loading || deleting} preset={deleting ? Preset.saving : Preset.close} onClick={()=>{ deletePrincipal(`removes/${product?.id}`) }} />
                }
                </span> }
            </div>

      </div> 
      <ChangeLotModal isShow={modals.ChangeLot} onClose={()=>closeModal("ChangeLot")} product={getSelectedElement("product")}/>
      <LotDetailsModal isShow={modals.viewDetails} onClose={()=>closeModal("viewDetails")} product={getSelectedElement("viewDetails")}/>
      <ToasterMessage />
    </div>
  );
}