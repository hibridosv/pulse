
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useProductCategoriesLogic } from "@/hooks/products/useProductCategoriesLogic";
import useCategoriesStore from "@/stores/products/categoriesStore";
import useStateStore from "@/stores/stateStorage";
import useTempStorage from "@/stores/useTempStorage";
import { useForm } from "react-hook-form";

export interface ProductsCategoriesModalProps {
  onClose: () => void;
  isShow: boolean;
}

export function ProductsCategoriesModal(props: ProductsCategoriesModalProps) {
    const { onClose, isShow } = props;
    const { register, handleSubmit, resetField, setFocus } = useForm();
    const { loading } = useStateStore();
    const isSending = loading["categoryForm"] ? true : false;
    const { onSubmit } = useProductCategoriesLogic(isShow, setFocus, resetField);
    const { categories } = useCategoriesStore();
    const { setSelectedElement, getSelectedElement } = useTempStorage();


    if (!isShow) return null;

    const selectedType = getSelectedElement("option") ?? 1; // Default to 1

    return (
        <Modal show={isShow} onClose={onClose} size="md" headerTitle="Agregar Categoría">
                <Modal.Body>
                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-md border p-3" >
                    {/* Segmented Control for Type Selection */}
                    <div className="flex items-center p-1 space-x-1 bg-bg-subtle rounded-lg">
                        <button
                            type="button"
                            onClick={() => setSelectedElement("option",1)}
                            className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedType === 1 ? 'bg-primary text-text-inverted shadow-sm' : 'text-text-base hover:bg-bg-content'}`}
                        >
                            Categoría
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedElement("option",2)}
                            className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedType === 2 ? 'bg-primary text-text-inverted shadow-sm' : 'text-text-base hover:bg-bg-content'}`}
                        >
                            Subcategoría
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {selectedType === 2 && (
                            <div>
                                <label htmlFor="dependable" className="block text-sm font-medium text-text-base mb-2">
                                    Categoría Principal
                                </label>
                                <select
                                    id="dependable"
                                    {...register("dependable", { required: true })}
                                    className="input-select" >
                                    {categories?.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-base mb-2">
                                {selectedType === 1 ? "Nombre de la Categoría" : "Nombre de la Subcategoría"}
                            </label>
                            <input
                                id="name"
                                {...register("name", { required: true })}
                                className="input"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                    <Button type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
                    </div>

                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={onClose} preset={Preset.cancel} disabled={isSending} />
                </Modal.Footer>
        </Modal>
    );
}

