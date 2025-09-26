import { useProductAddLogic } from "@/hooks/products/useProductAddLogic";
import { documentType } from "@/lib/utils";
import productAddStore from "@/stores/productAddStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { Controller, useForm } from "react-hook-form";
import { AddProductsSearch } from "./AddProductsSearch";
import { Button, Preset } from "@/components/button/button";

export function AddProductForm() {
    useProductAddLogic();
    const { register, handleSubmit, control, watch, reset } = useForm();
    const { product, loading, createPrincipal } = productAddStore();
    const { getSelectedElement } = useTempSelectedElementStore();
    const isBill = getSelectedElement("isBill");
    const productSelected = getSelectedElement("product");



    if (loading) return null;
    if (!product) return null;

   const isSending = false;


    return (
        <div className="p-4 m-4">
            <div className="bg-bg-content rounded-2xl shadow-lg border border-bg-subtle p-6 w-full max-w-4xl mx-auto mb-4">
                <div className="flex justify-between border-b-2">
                  <div>Numero de documento</div>
                  <div>{ product.document_number }</div>
                </div>
                <div className="flex justify-between border-b-2">
                  <div>Tipo de Documento</div>
                  <div>{ documentType(product.document_type) }</div>
                </div>
                <div className="flex justify-between border-b-2">
                  <div>Proveedor</div>
                  <div>{ product?.provider?.name }</div>
                </div>
                <div className="flex justify-between border-b-2">
                  <div>{ product.comment }</div>
                </div>
                <div className="flex justify-between border-b-2">
                  <div>{ isBill ? "Productos con impuestos incluidos" : "Productos sin impuestos" }</div>
                </div>
              </div>

            <div className="m-2">
              <AddProductsSearch />
            </div>
            <div>
              { productSelected?.id && (<>
              <form onSubmit={handleSubmit(console.log)} className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className='w-full font-bold text-lg text-teal-900 border-b-2 mb-2'>{productSelected?.description}</div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="quantity" className="input-label"> Cantidad </label>
                    <input
                          type="number"
                          id="quantity"
                          {...register("quantity")}
                          className="input"
                          step="any"
                          min={0}
                        />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="unit_cost" className="input-label"> Precio Costo </label>
                    <input
                          type="number"
                          id="unit_cost"
                          {...register("unit_cost")}
                          className="input"
                          step="any"
                          min={0}
                        />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="lot" className="input-label"> Lote </label>
                    <input type="text" id="lot" {...register("lot")} className="input" />
                </div>

                {productSelected?.expires ?
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="expiration" className="input-label">
                      Fecha de vencimiento
                    </label>
                    <input
                      type="date"
                      id="expiration"
                      {...register("expiration")}
                      className="input"
                    />
                  </div> : null
                }
              </div>
              <div className="flex justify-center">
                  <Button type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
              </div>
            </form>
                </>)}
            </div>  


        </div>
    );
}
