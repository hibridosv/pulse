
import { useForm } from "react-hook-form";
import { Product } from "@/interfaces/products";
import Modal from "@/components/modal/Modal";
import { Button, Preset } from "@/components/button/button";
import { productTypeIcon } from "../utils";
import { SearchInput } from "@/components/Search";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { usePagination } from "@/hooks/usePagination";
import useStateStore from "@/stores/stateStorage";
import { useProductLinkedLogic } from "@/hooks/products/useProductsLinkedLogic";
import useSelectedElementStore from "@/stores/selectedElementStorage";
import useToastMessageStore from "@/stores/toastMessageStore";
import { useProductCategoriesLogic } from "@/hooks/products/useProductCategoriesLogic";

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
    useProductCategoriesLogic(isShow, setFocus);
    if (!isShow) return null;
    

 const onSubmit = async (data: any) => { console.log(data) };
 const PrincipalCategories = [
    { id: 1, name: "Bebidas" },
    { id: 2, name: "Comidas" },
    { id: 3, name: "Limpieza" },
    { id: 4, name: "Higiene" },
    { id: 5, name: "Otros" },
 ];

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


      { elementSelected == 1 && 
      <div className="w-full md:w-full px-3 mb-4">
          <label htmlFor="categoria" className="input-label">
            Categoria
          </label>
            <select
              defaultValue={PrincipalCategories[0]?.id}
              id="categoria"
              {...register("categoria")}
              className="input"
            >
              {PrincipalCategories.map((value: any) => {
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

