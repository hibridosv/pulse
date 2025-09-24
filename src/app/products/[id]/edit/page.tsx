'use client'

import { Button, Preset } from "@/components/button/button";
import { LoadingPage } from "@/components/LoadingPage";
import { MultiPriceEdit } from "@/components/products/multi-price/MultiPriceEdit";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useProductEditLogic } from "@/hooks/products/useProductEditLogic";
import { useProductNewLogic } from "@/hooks/products/useProductNewLogic";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import useProductStore from "@/stores/productStore";
import useSelectedElementStore from "@/stores/selectedElementStorage";
import useStateStore from "@/stores/stateStorage";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";



export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: session, status } = useSession();
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
  const { activeConfig } = useConfigStore();
  const { subCategories, brands, quantityUnits, providers, locations } = useProductNewLogic();
  const { loading: loadingProduct, product } = useProductStore();
  const { loading } = useStateStore();
  const isSending = loading["productForm"] ? true : false;
  const { modals, closeModal, openModal } = useModalStore();
  const { onSubmit } = useProductEditLogic(id, setValue);

  if (status === "loading" || loadingProduct) {
    return <LoadingPage />;
  }

  if (!product) {
    return <div className="p-4">Producto no encontrado.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-5 border-r md:border-primary">
          <ViewTitle text="Editar Producto" />

          <div className="w-full px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
  
              <div className="flex flex-wrap -mx-3 mb-6">

              <input type="hidden" {...register("product_type")} />

              <div className="w-full px-3 mb-2">
                <label htmlFor="cod" className="input-label">Codigo</label>
                <input type="text" readOnly id="cod" {...register("cod", { required: true })} className="input-disabled" />
              </div>

              <div className="w-full px-3 mb-2">
                <label htmlFor="description" className="input-label">Descripción</label>
                <input type="text" id="description" {...register("description", { required: true })} className="input" />
              </div>
              { product.product_type == 1 && (<>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label htmlFor="quantity" className="input-label">Cantidad</label>
                <input type="number" readOnly id="quantity" {...register("quantity", { required: true })} className="input-disabled" />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-2">
                <label htmlFor="minimum_stock" className="input-label">Minimo de Stock</label>
                <input type="number" id="minimum_stock" {...register("minimum_stock", { required: true, min: 0 })} className="input" />
              </div> </>)}


              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="saved" className={"input-label"}>Gavado</label>
                <select id="saved" {...register("saved")} className="input"
                >
                  <option value={1}> Gravado </option>
                  <option  value={0}> Exento </option>
                </select>
              </div>
              { product.product_type == 1 && (<>
              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="category_id" className="input-label clickeable" onClick={() => openModal('productCategories')}>Categoria (Click para agregar)</label>
                <select id="category_id" {...register("category_id")} className="input">
                  {subCategories && subCategories.map((value: any) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="quantity_unit_id" className="input-label">Unidad de Medida</label>
                <select  id="quantity_unit_id" {...register("quantity_unit_id")} className="input">
                  {quantityUnits && quantityUnits.map((value: any) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="provider_id" className="input-label" >Proveedor (Click para agregar)</label>
                <select id="provider_id" {...register("provider_id")} className="input">
                  {providers && providers.map((value: any) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>

            { activeConfig && activeConfig.includes('product-locations') && (
              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="location_id" className="input-label">Ubicación (Click para agregar)</label>
                <select id="location_id" {...register("location_id")} className="input">
                  {locations && locations.map((value: any) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div> )}

            { activeConfig && activeConfig.includes('product-brand') && (
              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="brand_id" className="input-label">Marca</label>
                <select  id="brand_id" {...register("brand_id")} className="input">
                  {brands && brands.map((value: any) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div> )}

              { activeConfig && activeConfig.includes('product-measures') && (
              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="measure" className="input-label">Medida</label>
                <input type="text" id="measure" {...register("measure")} className="input" />
              </div> )}

              { activeConfig && activeConfig.includes('product-default-discount') && (
              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="default_discount" className="input-label">Descuento por Defecto %</label>
                <input type="number" step="any" id="default_discount" {...register("default_discount")} className="input" />
              </div> )}

              { activeConfig && activeConfig.includes('product-default-commission') && (
              <div className="w-full md:w-1/3 px-3 mb-2">
                <label htmlFor="default_commission" className="input-label">Comisión por Defecto %</label>
                <input type="number" step="any" id="default_commission" {...register("default_commission")} className="input" />
              </div> )}

            { activeConfig && activeConfig.includes('product-expires') && (
              <div className="w-full md:w-1/3 px-3 mb-2">
                  <label htmlFor="expiration" className="input-label">Fecha de vencimiento</label>
                  <input type="date" id="expiration" {...register("expiration")} className="input" />
              </div> )}

              { activeConfig && activeConfig.includes('product-prescription') && (
              <div className="w-full md:w-1/3 px-3 mb-2">
              <label htmlFor="prescription" className="input-label" >Solicitar Receta </label>
              <input type="checkbox" placeholder="prescription" {...register("prescription")} />
              </div> )} </>)}

              <div className="w-full md:w-full px-3 mb-2">
              <label htmlFor="information" className="input-label" >Información </label>
              <textarea {...register("information")} rows={2} className="input w-full" />
              </div>


              </div>
  
              <div className="flex justify-center">
              <Button type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
              </div>
            </form>
        </div>

      </div>
      <div className="col-span-5">
        <ViewTitle text="Detalles" />
        <div className="w-full px-4">
          <MultiPriceEdit text="Editar Precios" productId={id} isShow={true} />   
        </div>     
      </div> 
        <ToasterMessage />
    </div>
  );
}