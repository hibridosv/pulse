import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { formatDateAsDMY } from "@/lib/date-formats";
import { documentType, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useForm } from "react-hook-form";
import { Alert } from "../Alert/Alert";
import { NothingHere } from "../NothingHere";

export interface AddPayableModal {
  onClose: () => void;
  isShow: boolean;
}

export function AddPayableAddModal({ onClose, isShow }: AddPayableModal) {
        const { getSelectedElement } = useTempSelectedElementStore();
        const { cashdrawer, system } = useConfigStore();

        const { register, handleSubmit, reset, setValue, watch } = useForm();
        const payableRecord = getSelectedElement('paymentPayableAdd');
        const isSending = false;

        console.log("payableRecord:", payableRecord);
        console.log("cashdrawer:", cashdrawer);

  const onSubmit = async (data: any) => {
    console.log("Submitting data:", data);
  }

  return (
    <Modal show={isShow} onClose={onClose} size="xl3" headerTitle="AGREGAR ABONO">
      <Modal.Body>
        <div className="grid grid-cols-1 md:grid-cols-10 mx-4">
            <div className="col-span-5">
                <div className="flex justify-between mb-6">
                    <div className="mx-4 border-2 border-slate-600 shadow-lg shadow-teal-500 rounded-md w-full">
                        <div className="w-full text-center">Abonos</div>
                        <div className="w-full text-center text-2xl">{ numberToMoney(payableRecord?.payments?.total ? payableRecord?.payments?.total :0, system) }</div>
                    </div>
                    <div className="mx-4 border-2 border-slate-600 shadow-lg shadow-red-500 rounded-md w-full">
                        <div className="w-full text-center">Saldo</div>
                        <div className="w-full text-center text-2xl">{numberToMoney(payableRecord?.payments?.balance ? payableRecord?.payments?.balance : 0, system)}</div>
                    </div>
                </div>
                <div>
                    {/* Aqui va el formulario */}
              { cashdrawer ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="pb-4 mx-3 border-2 shadow-lg rounded-md">
              <div className="flex flex-wrap mx-3 mb-2 ">

              <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="payment_type" className="input-label"> Tipo de pago </label>
                    <select
                          defaultValue={1}
                          id="payment_type"
                          {...register("payment_type", {disabled: payableRecord?.payments?.balance == 0 ? true : false})}
                          className="input"
                        >
                        <option value="1">Efectivo</option>
                        <option value="2">Tarjeta</option>
                        <option value="3">Transferencia</option>
                        <option value="4">Cheque</option>
                        <option value="6">BTC</option>
                        <option value="0">Otro</option>
                    </select>
                </div>


                { watch("payment_type") != 1 && payableRecord?.payments?.balance != 0 && <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="cash_accounts_id" className="input-label"> Cuenta de tranferencia </label>
                    <select
                          defaultValue={payableRecord?.accounts && payableRecord?.accounts.data && payableRecord?.accounts.data.length > 0 ? payableRecord?.accounts.data[0].id : 0}
                          id="cash_accounts_id"
                          {...register("cash_accounts_id", {disabled: payableRecord?.payments?.balance == 0 ? true : false})}
                          className="input"
                        >
                        {payableRecord?.accounts?.data?.map((value: any) => {
                          return (
                            <option key={value.id} value={value.id}> {value.account}{" | "}{value.bank}{" | $"}{value.balance}</option>
                          );
                        })}
                    </select>
                </div> }


                <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="quantity" className="input-label"> Cantidad *</label>
                    <input
                          type="number"
                          id="quantity"
                          {...register("quantity", {disabled: payableRecord?.payments?.balance == 0 ? true : false})}
                          className="input"
                          step="any"
                          min={0}
                        />
                </div>
               
              </div>

              <div className="flex justify-center">
              <Button type="submit" disabled={isSending || payableRecord?.payments?.balance == 0} preset={isSending ? Preset.saving : Preset.save} />
              </div>

            </form>) : 
                <>
                <Alert
                type="danger"
                title="Error"
                text="Debe seleccionar una caja para este proceso"
                />
                <NothingHere text="" width="110" height="110" />
                </>}
                </div>
            </div>
            <div className="col-span-5 ">

                    <div className="w-full flex justify-center  mb-6">
                        <div className="w-1/2 mx-4 border-2 border-slate-600 shadow-lg shadow-lime-500 rounded-md">
                            <div className="text-center">Total</div>
                            <div className="text-center text-2xl">{ numberToMoney(payableRecord?.quantity ? payableRecord?.quantity : 0, system) }</div>
                        </div>
                    </div>
               <div className="pb-4 mx-3 border-2 shadow-lg rounded-md"> 

                    <div className="ml-3 text-xl mt-2 font-semibold ">{ payableRecord?.name }</div>
                    <div className="ml-3 text-sm">{ payableRecord?.description }</div>
                    <div className="ml-3 text-lg mt-1">Expira: { payableRecord?.expiration ? formatDateAsDMY(payableRecord?.expiration) : "N/A" }</div>
                    <div className="ml-3 text-lg mt-1">{documentType(payableRecord?.invoice)}: { payableRecord?.invoice_number}</div>
                    <div className="ml-3 text-lg mt-1">Usuario: { payableRecord?.employee?.name}</div>
                    <div className="ml-3 text-lg mt-1">Proveedor: { payableRecord?.provider?.name}</div>
               </div>
            </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={false} />
      </Modal.Footer>
    </Modal>
  );
}