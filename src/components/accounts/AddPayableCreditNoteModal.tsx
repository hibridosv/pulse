import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useAccountPayableLogic } from "@/hooks/accounts/useAccountPayableLogic";
import { formatDateAsDMY } from "@/lib/date-formats";
import { numberToMoney } from "@/lib/utils";
import useAccountPayableStore from "@/stores/accounts/accountPayableStore";
import useConfigStore from "@/stores/configStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useForm } from "react-hook-form";
import { DeleteButton } from "../button/DeleteButton";

export interface AddPayableCreditNoteModalI {
  onClose: () => void;
  isShow: boolean;
}

export function AddPayableCreditNoteModal({ onClose, isShow }: AddPayableCreditNoteModalI) {
        const { getSelectedElement } = useTempSelectedElementStore();

        const { register, handleSubmit, reset, setValue, watch } = useForm();
        const payableRecord = getSelectedElement('paymentPayableAdd');
        const { saveCreditNote, delCreditNote } = useAccountPayableLogic();
        const { sending, deleting } = useAccountPayableStore();
        const { system } = useConfigStore();



  const onSubmit = async (data: any) => {
      await saveCreditNote(data);
      reset();
  }


  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="agregar nota de credito">
      <Modal.Body>
        <div className="p-6">
              {
                    payableRecord?.note ? 
                    <div className="bg-bg-content/50 p-4 rounded-lg border border-bg-subtle shadow-sm">
                        <h3 className="text-lg font-semibold text-text-base mb-4 border-b border-bg-subtle pb-2">
                            Información de la Nota de Crédito
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <div className="text-sm font-medium text-text-muted">Número de Nota</div>
                                <div className="text-base font-semibold text-text-base">{payableRecord?.note?.number}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-text-muted">Factura Afectada</div>
                                <div className="text-base font-semibold text-text-base">{payableRecord?.note?.invoice}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-text-muted">Fecha de Emisión</div>
                                <div className="text-base font-semibold text-text-base">{formatDateAsDMY(payableRecord?.note?.emited_at)}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-text-muted">Fecha de Ingreso</div>
                                <div className="text-base font-semibold text-text-base">{formatDateAsDMY(payableRecord?.note?.created_at)}</div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="text-sm font-medium text-text-muted">Monto</div>
                                <div className="text-lg font-bold text-primary">{numberToMoney(payableRecord?.note?.quantity, system)}</div>
                            </div>
                        </div>
                    </div>
                    :
                    <form onSubmit={handleSubmit(onSubmit)} className="pb-4 border-2 shadow-lg rounded-md pt-3">
                        <div className="flex flex-wrap mx-3 mb-2 ">

                            <div className="w-full md:w-full px-3 mb-2">
                                <label htmlFor="number" className="input-label"> Numero de Nota de credito *</label>
                                <input type="number" id="number" {...register("number", {required: true})} className="input" step="any" min={0} />
                            </div>

                            <div className="w-full md:w-full px-3 mb-2">
                                <label htmlFor="invoice" className="input-label"> Factura afectada *</label>
                                <input type="number" id="invoice" {...register("invoice", {required: true})} className="input" step="any" min={0} />
                            </div>

                            <div className="w-full md:w-full px-3 mb-2">
                                <label htmlFor="emited_at" className="input-label"> Fecha emisión *</label>
                                <input type="date" id="emited_at" {...register("emited_at", {required: true})} className="input" />
                            </div>

                            <div className="w-full md:w-full px-3 mb-2">
                                <label htmlFor="quantity" className="input-label"> Cantidad *</label>
                                <input type="number" id="quantity" {...register("quantity", {required: true})} className="input" step="any" min={0} />
                            </div>
                        
                        </div>
                        <div className="flex justify-center">
                        <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
                        </div>
                    </form>
                  }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-4">
        { payableRecord?.note &&
        <DeleteButton id={payableRecord?.note.id} url="cash/expenses" onDeleteConfirm={delCreditNote} disabled={deleting} preset={Preset.cancel} text="Seguro que desea eliminar la nota de credito?" />
        // <Button onClick={()=>setShowDeleteModal(true)} preset={Preset.cancel} disabled={sending} text="Eliminar Nota" />
        }
        <Button onClick={onClose} preset={Preset.close} disabled={deleting} />
        </div>
      </Modal.Footer>
    </Modal>
  );
}