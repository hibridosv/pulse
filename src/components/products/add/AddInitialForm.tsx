import { Button, Preset } from "@/components/button/button";
import { Switch } from "@/components/button/Switch";
import { Loader } from "@/components/Loader";
import productRemovedStore from "@/stores/productRemovedStore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";


export function AddInitialForm() {
    const { register, handleSubmit, control, reset, watch, setValue, formState: { errors } } = useForm();
    const { product, loading, createPrincipal } = productRemovedStore();
    const [isTaxesActive, setIsTaxesActive] = useState(false);


    if (loading) return <Loader />;
    if (product && !loading) return null;

    const isBillsActive = true;
    const isAccountActive = true;
    const isSending = false;

    const accounts = {} as any;
    const providers = {} as any;
    const categories = {} as any;

    const onSubmit = (data: any) => {
        console.log("Submit ", data);
    }

  return (
        <div className="w-full px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">

                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="document_number" className="input-label">Numero de Documento</label>
                    <input type="text" id="document_number" {...register("document_number")} className="input" />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="document_type" className="input-label"> Tipo de Documento </label>
                    <select
                          id="document_type" {...register("document_type")} className="input" >
                        <option value="0">Ninguno</option>
                        <option value="1">Ticket</option>
                        <option value="2">Factura</option>
                        <option value="3">Credito Fiscal</option>
                    </select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="provider_id" className={`$"input-label" clickeable`}> Proveedor (Click para agregar)</label>
                    <select defaultValue={providers && providers.data && providers.data.length > 0 ? providers.data[0].id : 0}
                          id="provider_id" {...register("provider_id")} className="input" >
                          {providers?.data?.map((value: any) => <option key={value.id} value={value.id}> {value.name}</option>)}
                    </select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-2">
                  <label className={`$"input-label" mb-2`}> Sumar Impuestos </label>
                        <div>
                            <Controller 
                                name="taxes_active"
                                control={control}
                                render={({field})=> (
                                <Switch
                                    checked={field.value}
                                    label={field.value ? 'Activo' : 'Inactivo'}
                                    onChange={field.onChange}
                                    />
                                )}
                            />
                      </div>
                </div>

                <div className="w-full md:w-full px-3 mb-4">
                  <label htmlFor="comment" className="input-label"> Comentario{" "} </label>
                  <textarea
                    {...register("comment", {})}
                    rows={2}
                    className="input w-full"
                  />
                </div>

                
                <div className="uppercase text-xl font-semibold text-slate-800 m-2 bg-slate-400 w-full px-6 clickeable rounded-md border shadow-md shadow-slate-400">{ isBillsActive ? "Cancelar" : "Activar"} ingreso como gasto</div>
                
              {
                isBillsActive && <>
                    <div className=" font-semibold text-lg text-teal-800 text-center uppercase px-2">Información del ingreso de gasto</div>

                    <div className="w-full md:w-full px-3 mb-2">
                      <label htmlFor="bills_name" className="input-label">Nombre del Gasto *</label>
                      <input type="text" id="bills_name" {...register("bills_name")} className="input" step="any" min={0} />
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-2">
                      <label htmlFor="bills_payment_type" className="input-label"> Tipo de pago </label>
                      <select defaultValue={1} id="bills_payment_type" {...register("bills_payment_type")} className="input"  >
                        <option value="1">Efectivo</option>
                        <option value="2">Tarjeta</option>
                        <option value="3">Transferencia</option>
                        <option value="4">Cheque</option>
                        <option value="6">BTC</option>
                        <option value="0">Otro</option>
                      </select>
                    </div>
                      
                    <div className="w-full md:w-1/2 px-3 mb-2">
                      <label htmlFor="bills_categories_id" className={`$"input-label"`}> Categoria de gasto </label>
                      <select
                        defaultValue={categories && categories.data && categories.data.length > 0 ? categories.data[0].id : 0}
                        id="bills_categories_id" {...register("bills_categories_id")} className="input" >
                        {categories?.data?.map((value: any) => <option key={value.id} value={value.id}> {value.name}</option> )}
                      </select>
                    </div>


                    <div className="w-full md:w-1/2 px-3 mb-2">
                        <label htmlFor="bills_payment_type" className="input-label"> Tipo de pago </label>
                        <select
                          defaultValue={1}
                          id="bills_payment_type"
                          {...register("bills_payment_type")}
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


                    {watch("bills_payment_type") != 1 ? <div className="w-full md:w-1/2 px-3 mb-2">
                        <label htmlFor="bills_cash_accounts_id" className="input-label"> Cuenta de tranferencia </label>
                        <select
                          defaultValue={accounts && accounts.data && accounts.data.length > 0 ? accounts.data[0].id : 0}
                          id="bills_cash_accounts_id"
                          {...register("bills_cash_accounts_id")}
                          className="input"
                        >
                          {accounts?.data?.map((value: any) => {
                            return (
                              <option key={value.id} value={value.id}> {value.account}{" | "}{value.bank}{" | $"}{value.balance}</option>
                            );
                          })}
                        </select>
                      </div> :
                      <div className="w-full md:w-1/2 px-3 mb-2">
                        <label className="input-label"> Cuenta de tranferencia </label>
                        <input className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight bg-red-200 focus:outline-none pointer-events-none" readOnly />
                      </div>
                      }


                    <div className="w-full md:w-full px-3 mb-2">
                      <label htmlFor="bills_quantity" className="input-label"> Cantidad *</label>
                      <input
                        type="number" id="bills_quantity" {...register("bills_quantity")} className="input" step="any" min={0} />
                    </div>

                </>
              }
                <div className="uppercase text-xl font-semibold text-slate-800 m-2 bg-slate-400 w-full px-6 clickeable rounded-md border shadow-md shadow-slate-400">{ isAccountActive ? "Cancelar" : "Activar"} ingreso de cuenta por pagar</div>

              {  isAccountActive && <>
              <div className=" font-semibold text-lg text-teal-800 text-center uppercase px-2">Información de la cuenta por pagar</div>
              <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="account_name" className="input-label">Nombre de la cuenta *</label>
                    <input type="text" id="account_name" {...register("account_name")} className="input" step="any" min={0} />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="account_quantity" className="input-label"> Cantidad *</label>
                    <input type="number" id="account_quantity" {...register("account_quantity")} className="input" step="any" min={0} />
                </div>

                
                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="account_expiration" className="input-label">
                      Fecha de vencimiento
                    </label>
                    <input type="date" id="account_expiration" {...register("account_expiration")} className="input" />
                  </div>
                </>
              }

              </div>

              <div className="flex justify-center">
              <Button type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
              </div>

            </form>
        </div>
  );
}
