import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { useForm } from "react-hook-form";

export interface AdjustmentSetModalI {
  onClose: () => void;
  isShow: boolean;
  sending?: boolean;
  sendAdjustment: (record: any) => void;
}

export function AdjustmentSetModal(props: AdjustmentSetModalI) {
  const { onClose, isShow, sending, sendAdjustment } = props;
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const onSubmit = (data: any) => { 
    sendAdjustment(data);
    reset();
  }

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle="Actualizar Cantidad">
      <Modal.Body>
        <div className="mx-1">
          <form onSubmit={handleSubmit(onSubmit)}>
   
              <div className="w-full md:w-full px-3 mb-2">
                <label htmlFor="stablished" className="input-label">
                  Cantidad *
                </label>
                <input type="number" id="stablished" {...register("stablished", { required: true})} className="input" step="any" min={0}/>
              </div>
            <div className="flex justify-center mt-4 mb-2">
              <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-4">
        <Button onClick={onClose} preset={Preset.close} disabled={false} />
        </div>
      </Modal.Footer>
    </Modal>
  );
}