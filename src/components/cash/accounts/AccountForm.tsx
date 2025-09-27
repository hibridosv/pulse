import { Button, Preset } from "@/components/button/button";
import cashAccountStore from "@/stores/cash/cashAccountStore";
import { useForm } from "react-hook-form";


export function AccountForm() {
    const { register, handleSubmit, reset } = useForm();
    const {  sending, createAccount, error } = cashAccountStore();

    const onSubmit = async(data: any)=>{
        await createAccount(data);
        if (!error) {
            reset();
        }
    }


  return (
    <div className="bg-bg-content rounded-2xl shadow-lg border border-bg-subtle p-4 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">

              <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="account" className="input-label">Nombre o numero de cuenta *</label>
                    <input type="text" id="account" {...register("account")} className="input" />
                </div>

                <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="bank" className="input-label">Nombre del Banco *</label>
                    <input type="text" id="bank" {...register("bank")} className="input" />
                </div>

                <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="type" className="input-label"> Tipo de cuenta </label>
                    <select defaultValue={1} id="type" {...register("type")} className="input-select" >
                        <option value="1">Caja Chica</option>
                        <option value="2">Cuenta</option>
                        <option value="3">Chequera</option>
                        <option value="4">Tarjeta</option>
                    </select>
                </div>


                <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="balance" className="input-label"> Cantidad Inicial *</label>
                    <input type="number" id="balance" {...register("balance")} className="input" step="any" min={0} />
                </div>
               
              </div>

              <div className="flex justify-center">
              <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
              </div>

            </form>
    </div>
  );
}
