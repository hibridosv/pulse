import { Button, Preset } from "@/components/button/button";
import { Loader } from "@/components/Loader";
import { SkeletonForm } from "@/components/skeleton/SkeletonForm";
import productRemovedStore from "@/stores/productRemovedStore";
import { useForm } from "react-hook-form";

export interface RemoveInitialFormProps {
  text?: string;
}

export function RemoveInitialForm(props: RemoveInitialFormProps) {
    const { text } = props;
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
    const { product, loading, createPrincipal } = productRemovedStore();

    if (loading) return <SkeletonForm />;
    if (product && !loading) return null;


  return (
        <div className="w-full px-4">
            <form onSubmit={handleSubmit(createPrincipal)} className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-2">
                        <label htmlFor="type" className={"input-label"}>Tipo de Salida</label>
                        <select id="type" {...register("type")} className="input-select" >
                            <option value={1}> Averia </option>
                            <option  value={2}> Traslado </option>
                            <option  value={3}> Devolución </option>
                            <option  value={4}> Cambio </option>
                            <option  value={5}> Otros ... </option>
                        </select>
                    </div>

                    <div className="w-full md:w-full px-3 mb-2">
                        <label htmlFor="reason" className="input-label" >Comentario </label>
                        <textarea {...register("reason")} rows={2} className="input w-full" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button type="submit" disabled={loading} preset={loading ? Preset.saving : Preset.save} />
                </div>
            </form>
        </div>
  );
}
