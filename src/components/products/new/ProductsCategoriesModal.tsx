
import { useForm } from "react-hook-form";
import Modal from "@/components/modal/Modal";
import { Button, Preset } from "@/components/button/button";
import useStateStore from "@/stores/stateStorage";
import useSelectedElementStore from "@/stores/selectedElementStorage";
import { useProductCategoriesLogic } from "@/hooks/products/useProductCategoriesLogic";
import useCategoriesStore from "@/stores/categoriesStore";

export interface ProductsCategoriesModalProps {
  onClose: () => void;
  isShow: boolean;
}

export function ProductsCategoriesModal(props: ProductsCategoriesModalProps) {
    const { onClose, isShow } = props;
    const { register, handleSubmit, resetField, setFocus } = useForm();
    const { loading } = useStateStore();
    const isSending = loading["productSending"] ? true : false;
    const { elementSelected, setElement } = useSelectedElementStore();
    const { onSubmit } = useProductCategoriesLogic(isShow, setFocus);
    const { categories } = useCategoriesStore();


    if (!isShow) return null;


  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="Agregar Categoría" closeOnOverlayClick={false} hideCloseButton={true}>
      <Modal.Body>

        <div className="flex justify-between p-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
            <div>
                <div className="font-medium text-text-muted text-center clickeable" onClick={()=>setElement(1)}>Categoria</div>
            </div>
            <div>
                <div className="font-medium text-text-muted text-center clickeable" onClick={()=>setElement(2)}>Sub Categoria</div>
            </div>
        </div>

        <form className="max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)} >


      { elementSelected == 2 && 
      <div className="w-full md:w-full px-3 mb-4">
          <label htmlFor="categoria" className="input-label">
            Categoria
          </label>
            <select
              defaultValue={categories[0]?.id}
              id="categoria"
              {...register("categoria")}
              className="input"
            >
              {categories.map((value: any) => {
                return (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                );
              })}
            </select>
        </div> }

            <div className="w-full md:w-full px-3 mb-4">
              <label htmlFor="name" className="input-label">{ elementSelected == 1 ? "Nombre de la categoría" : "Nombre de la sub Categoría" } </label>
              <input {...register("name", {})} className="input w-full" />
            </div>

              <div className="flex justify-center">
                <Button type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
              </div>
      </form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={isSending} />
      </Modal.Footer>
    </Modal>
  );
}

