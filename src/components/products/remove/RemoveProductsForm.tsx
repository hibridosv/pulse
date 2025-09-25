import { Button, Preset } from "@/components/button/button";
import productRemovedStore from "@/stores/productRemovedStore";
import useSelectedElementStore from "@/stores/selectedElementStorage";
import { useForm } from "react-hook-form";
import { MdBallot } from "react-icons/md";

type Inputs = {
  quantity: number;
};

export function RemoveProductsForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const { product, loading } = productRemovedStore();
    const { elementSelected, setElement } = useSelectedElementStore();

    if (!product || !elementSelected) return null;

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
            <form onSubmit={handleSubmit(console.log)} className="w-full">
                    <div className="flex flex-col mb-4">
              <label htmlFor="quantity" className="input-label">
                Cantidad
              </label>
              <div className="flex items-center gap-2">
                <input type="number" {...register("quantity", { required: "La cantidad es obligatorio.", valueAsNumber: true })} className="input" step="any" min={0} />
                <MdBallot size={30} className="text-text-muted clickeable" />
              </div>
              {errors.quantity && <p className="text-danger text-xs mt-1">{errors.quantity.message}</p>}
            </div>

            <div className="flex justify-end gap-4">
              <Button text="Cancelar" disabled={loading} preset={Preset.cancel} onClick={()=>setElement(null)} />
              <Button type="submit" disabled={loading} preset={loading ? Preset.saving : Preset.save} />
            </div>
          </form>
        </div>
  );
}
