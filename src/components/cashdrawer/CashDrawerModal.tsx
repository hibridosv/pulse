
import { CashDrawer } from "@/interfaces/cashdrawers";
import useCashDrawerStore from "@/stores/cashdrawer/cashdrawersStore";
import { useForm } from "react-hook-form";
import { Button, Preset } from "../button/button";
import Modal from "../modal/Modal";

export interface CashdrawerModalProps {
  onClose: () => void;
  isShow: boolean;
  drawer: CashDrawer;
}

export function CashdrawerModal(props: CashdrawerModalProps) {
    const { onClose, isShow, drawer } = props;
    const { register, handleSubmit, resetField } = useForm();
    const { openCashDrawer, closeCashDrawer, loading } = useCashDrawerStore();
    const text = drawer && drawer.status == 2 ? "Cierre" : "Apertura";

    if (!isShow || !drawer) return null

    const onSubmit = (data: any)=>{
      if (drawer && drawer.status == 2) {
        closeCashDrawer(`cashdrawers/${drawer.id}/close`, data);
      } else {
        openCashDrawer(`cashdrawers/${drawer.id}/open`, data);
      }
      resetField("quantity");
    }

  return (
    <Modal show={isShow} onClose={onClose} size="md" headerTitle={`${text} de caja`} closeOnOverlayClick={false} hideCloseButton={true}>
      <Modal.Body>
        <div className="mx-4">
        <form className="max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)} >
        
            <div className="w-full md:w-full px-3 mb-4">
                <label htmlFor="quantity" className="input-label" >Ingrese la cantidad de {text} </label>
                <input type="number" step="any" autoComplete="off" {...register("quantity", { min: 0, required: true })} className="input w-full"/>
            </div>

            <div className="flex justify-center">
            <Button type="submit" disabled={loading} preset={loading ? Preset.saving : Preset.save} />
            </div>
      </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={loading} />
      </Modal.Footer>
    </Modal>
  );
}

