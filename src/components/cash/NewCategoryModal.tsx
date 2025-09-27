
import { useForm } from "react-hook-form";
import Modal from "@/components/modal/Modal";
import { Button, Preset } from "@/components/button/button";
import cashExpensesStore from "@/stores/cash/cashExpensesStore";

export interface ProductsLinkedModalProps {
  onClose: () => void;
  isShow: boolean;
}

export function NewCategoryModal(props: ProductsLinkedModalProps) {
    const { onClose, isShow } = props;
    const { register, handleSubmit, resetField } = useForm();
    const { expensesCategories, createExpenseCategory, loading } = cashExpensesStore();

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Categorias de gastos" closeOnOverlayClick={false} hideCloseButton={true}>
      <Modal.Body>
        <div>
                <div className='top-full left-0 right-0 z-20 mt-2 bg-bg-content rounded-lg shadow-lg border border-bg-subtle/50'>
                  <ul className="divide-y divide-bg-subtle max-h-80 overflow-y-auto custom-scrollbar">
                    { expensesCategories && expensesCategories.map((item: any) => {
                        return (
                          <li 
                            key={item.id} 
                            className="flex justify-between items-center p-3 hover:bg-bg-subtle rounded-md transition-colors duration-150">
                            <span className="font-medium text-text-base">{item.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </li>
                        );
                    })}
                  </ul>
                </div> 

                <div className="p-4 ">
                    <form className="max-w-lg mt-4" onSubmit={handleSubmit(console.log)} >
                        <div className="w-full md:w-full px-3 mb-4">
                            <label htmlFor="name" className="input-label" >Categoria</label>
                            <input {...register("name", {})} className={`input w-full`} />
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" disabled={loading} preset={loading ? Preset.saving : Preset.save} />
                        </div>
                    </form>
                </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={loading} />
      </Modal.Footer>
    </Modal>
  );
}

