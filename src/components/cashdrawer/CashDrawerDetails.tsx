
import { Button, Preset } from "../button/button";
import Modal from "../modal/Modal";
import useConfigStore from "@/stores/configStore";
import { numberToMoney } from "@/lib/utils";
import { useCutLogic } from "@/hooks/useCutLogic";
import useCutStore from "@/stores/cutStore";

export interface CashdrawerDetailsProps {
  onClose: () => void;
  isShow: boolean;
}

export function CashdrawerDetails(props: CashdrawerDetailsProps) {
    const { onClose, isShow } = props;
    const { system } = useConfigStore();
    useCutLogic(`cuts/last?included=employee,cashdrawer`);
    const { cut } = useCutStore();
    console.log("Cut: ", cut);


  return (
    <Modal show={isShow} onClose={onClose} size="xl4" headerTitle="Detalles del corte" closeOnOverlayClick={false} hideCloseButton={true}>
      <Modal.Body>
        <div className="grid grid-cols-1 md:grid-cols-6 pb-10">
                <div className="col-span-3 border-2 border-slate-600 shadow-lg shadow-sky-500 rounded-md m-2">
                  <div className="m-2 text-center">Efectivo Apertura</div>
                  <div className="m-2 text-center font-bold text-3xl">{ numberToMoney(cut?.inicial_cash ? cut?.inicial_cash : 0, system) }</div>
                </div>
                <div className="col-span-3 border-2 border-slate-600 shadow-lg shadow-sky-500 rounded-md m-2">
                  <div className="m-2 text-center">Efectivo Cierre</div>
                  <div className="m-2 text-center font-bold text-3xl">{ numberToMoney(cut?.final_cash ? cut?.final_cash : 0, system) }</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-9 pb-10">
                <div className="col-span-3 border-2 border-slate-600 shadow-lg shadow-orange-500 rounded-md m-2">
                  <div className="m-2 text-center">Salidas</div>
                  <div className="m-2 text-center font-bold text-3xl">{ numberToMoney(cut?.cash_expenses ? cut?.cash_expenses : 0, system) }</div>
                </div>
                <div className="col-span-3 border-2 border-slate-600 shadow-lg shadow-lime-500 rounded-md m-2">
                  <div className="m-2 text-center">Entradas</div>
                  <div className="m-2 text-center font-bold text-3xl">{ numberToMoney(cut?.cash_incomes ? cut?.cash_incomes : 0, system) }</div>
                </div>
                <div className="col-span-3 border-2 border-slate-600 shadow-lg shadow-fuchsia-500 rounded-md m-2">
                  <div className="m-2 text-center">Diferencia</div>
                  <div className="m-2 text-center font-bold text-3xl">{ numberToMoney(cut?.cash_diference ? cut?.cash_diference : 0, system) }</div>
                </div>
            </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.accept} disabled={false} />
      </Modal.Footer>
    </Modal>
  );
}

