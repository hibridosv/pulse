import { Button, Preset } from "@/components/button/button";
import useModalStore from "@/stores/modalStorage";
import productRemovedStore from "@/stores/products/productRemovedStore";
import useToastMessageStore from "@/stores/toastMessageStore";
import useTempStorage from "@/stores/useTempStorage";
import { useForm } from "react-hook-form";
import { MdBallot } from "react-icons/md";

type Inputs = {
  quantity: number;
};

export function RemoveProductsForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const { product, loading, createProduct } = productRemovedStore();
    const { getElement, clearElement} = useTempStorage();
    const { openModal } = useModalStore();
    const { setElement } = useTempStorage();
    const lotSelected = getElement("lotSelected");
    const elementSelected = getElement('product');

    if (!product || !elementSelected) return null;

    const onSubmit = async (data: Inputs) => {
        if (!data.quantity || !product?.reason) {
          useToastMessageStore.getState().setError({ message : "Debe ingresar la cantidad"});
          return 
        }
        const newData = {
          ...data,
          product_id : elementSelected?.id,
          failure_id : product?.id,
          type : product?.type,
          reason : product?.reason,
          lot_id : lotSelected?.id,
        }
        createProduct(newData);
        reset();
        clearElement();
    }

  return (
        <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 md:p-6">
            <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold text-text-base">Producto seleccionado</h3>
                  <p className="text-xl font-semibold text-text-base">{ elementSelected?.description }</p>
                  <div className="flex justify-between text-text-muted text-sm mt-2">
                    <span>Código: { elementSelected?.cod } </span>
                    <span>Existencia: { elementSelected?.quantity }</span>
                  </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="flex flex-col mb-4">
              <label htmlFor="quantity" className="input-label">
                Cantidad
              </label>
              <div className="flex items-center gap-2">
                <input type="number" {...register("quantity", { required: "La cantidad es obligatorio.", valueAsNumber: true, max: elementSelected?.quantity })} className="input" step="any" min={0} />
                <MdBallot size={30} color={lotSelected ? "red" : "gray"} className="text-text-muted clickeable" onClick={()=>{ openModal('ChangeLot'); setElement('product', elementSelected) }} />
              </div>
              {errors.quantity && <p className="text-danger text-xs mt-1">{errors.quantity.message}</p>}
            </div>

            <div className="flex justify-end gap-4">
              <Button text="Cancelar" disabled={loading} preset={Preset.cancel} onClick={()=>clearElement()} />
              <Button type="submit" disabled={loading} preset={loading ? Preset.saving : Preset.save} />
            </div>
          </form>
        </div>
  );
}
