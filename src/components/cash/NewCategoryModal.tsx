import { useForm } from "react-hook-form";
import Modal from "@/components/modal/Modal";
import { Button, Preset } from "@/components/button/button";
import cashExpensesStore from "@/stores/cash/cashExpensesStore";
import { useCashExpensesLogic } from "@/hooks/cash/useCashExpensesLogic";

export interface NewCategoryModalProps {
  onClose: () => void;
  isShow: boolean;
}

export interface INewCategory {
  name: string;
}


export function NewCategoryModal({ onClose, isShow }: NewCategoryModalProps) {
  const { register, handleSubmit, reset, setValue } = useForm<INewCategory>();
  const { expensesCategories, loading } = cashExpensesStore();
  const { createCategory } = useCashExpensesLogic(reset, setValue); 

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Categorías de Gastos">
      <Modal.Body>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-medium text-text-base mb-4 px-1">Crear Nueva Categoría</h3>
            <div className="bg-bg-base rounded-lg border border-bg-subtle/80 p-4">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(createCategory)}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1">
                    Nombre de la categoría
                  </label>
                  <input id="name" type="text" {...register("name", { required: "El nombre es obligatorio" })}
                    className="input"
                    placeholder="Ej: Oficina, Transporte..."
                    autoComplete="off"
                  />
                </div>
                <Button type="submit" disabled={loading} preset={loading ? Preset.saving : Preset.save}  />
              </form>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-base mb-4 px-1">Categorías Existentes</h3>
            <div className='bg-bg-base rounded-lg border border-bg-subtle/80'>
              <ul className="divide-y divide-bg-subtle max-h-60 overflow-y-auto custom-scrollbar">
                {expensesCategories && expensesCategories.length > 0 ? (
                  expensesCategories.map((item: any) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center p-3 transition-colors duration-150"
                    >
                      <span className="font-medium text-text-base">{item.name}</span>
                      <div className="w-2 h-2 bg-bg-subtle rounded-full" />
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-center text-text-muted">No hay categorías.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={loading} />
      </Modal.Footer>
    </Modal>
  );
}