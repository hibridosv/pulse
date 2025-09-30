'use client'

import { Button, Preset } from "@/components/button/button";
import { AddDetailsModal } from "@/components/products/add/AddDetailsModal";
import { AddInitialForm } from "@/components/products/add/AddInitialForm";
import { AddProductForm } from "@/components/products/add/AddProductForm";
import { RegistersProductsTable } from "@/components/products/add/RegistersProductsTable";
import { RegistersTable } from "@/components/products/add/RegistersTable";
import { ViewTitle } from "@/components/ViewTitle";
import useModalStore from "@/stores/modalStorage";
import productAddStore from "@/stores/productAddStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";



export default function Page() {
    const { saving, product, savePrincipal, deleting, loading } = productAddStore();
    const { modals, closeModal } = useModalStore();
    const { getSelectedElement } = useTempSelectedElementStore();


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-4 border-r md:border-primary">
          <ViewTitle text="Agregar Producto al inventario" />
          <div className="p-4">
            <AddInitialForm />
            <AddProductForm />
          </div>
      </div>
      <div className="col-span-6">
          <ViewTitle text={product ? "Productos ingresados" : "Ultimos Ingresos"} />
          <div className="p-4">
            <RegistersProductsTable />
            <RegistersTable />
          </div>
          <div className="flex justify-end mt-4 gap-4 p-4">
            { product && (
              <Button preset={saving ? Preset.saving : Preset.save} text="Guardar Todo" onClick={()=> savePrincipal(`registers/principal/${product.id}`)} disabled={deleting || saving || loading } />
            )}
            </div>
      </div> 
      <AddDetailsModal isShow={modals.viewDetails} onClose={()=>closeModal("viewDetails")} product={getSelectedElement("viewDetails")} />
    </div>
  );
}