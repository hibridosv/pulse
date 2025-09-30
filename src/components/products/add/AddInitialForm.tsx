import { Button, Preset } from "@/components/button/button";
import { Switch } from "@/components/button/Switch";
import { SkeletonForm } from "@/components/skeleton/SkeletonForm";
import { useProductAddLogic } from "@/hooks/products/useProductAddLogic";
import useContactStore from "@/stores/ContactStore";
import productAddStore from "@/stores/products/productAddStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import useToastMessageStore from "@/stores/toastMessageStore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function AddInitialForm() {
    const { expensesCategories: categories, accounts} = useProductAddLogic();
    const { register, handleSubmit, control, watch, reset } = useForm();
    const { product, loading, createPrincipal } = productAddStore();
    const { contacts: providers } = useContactStore();
    const { setSelectedElement } = useTempSelectedElementStore();

    const [isBillsActive, setIsBillsActive] = useState(false);
    const [isAccountActive, setIsAccountActive] = useState(false);

    
    if (loading) return <SkeletonForm />;
    if (product && !loading) return null;



    const onSubmit = (data: any) => {
            if (isAccountActive && (!data.account_name || !data.account_quantity) || isBillsActive && (!data.bills_name || !data.bills_quantity) ) {
            useToastMessageStore.getState().setError({ message : "Faltan algunos datos importantes para continuar!"});
            return
            }
            data.provider_id = data.provider_id ? data.provider_id : providers.data ? providers.data[0].id : 0;
            data.comment = data.comment ? data.comment : "Ingreso de productos";
            data.account_active = isAccountActive;
            setSelectedElement("isBill", data.bills_active);
            createPrincipal(data);
            reset();
    };


    return (
        <div className="bg-bg-content rounded-2xl shadow-lg border border-bg-subtle p-4 w-full max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border-b border-bg-subtle pb-6">
                    <div>
                        <label htmlFor="document_number" className="block text-sm font-bold text-text-muted mb-1">
                            Número de Documento
                        </label>
                        <input type="text" id="document_number" {...register("document_number")} className="input" />
                    </div>

                    <div>
                        <label htmlFor="document_type" className="block text-sm font-bold text-text-muted mb-1">
                            Tipo de Documento
                        </label>
                        <select id="document_type" {...register("document_type")} className="input-select">
                            <option value="0">Ninguno</option>
                            <option value="1">Ticket</option>
                            <option value="2">Factura</option>
                            <option value="3">Crédito Fiscal</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="provider_id" className="block text-sm font-bold text-text-muted mb-1">
                            Proveedor
                        </label>
                        {providers ?
                        <select id="provider_id" {...register("provider_id")} className="input-select" defaultValue={providers[0] ?? 0}>
                            {providers?.map((value: any) => {
                                return (<option key={value.id} value={value.id}>{value.name}</option>)
                            })}                        
                        </select> :
                        <div className="input-disabled"></div>    }
                    </div>

                    <div className="flex items-end pb-1">
                        <Controller
                            name="bills_active"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onChange={field.onChange}
                                    label="Sumar Impuestos"
                                />
                            )}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="comment" className="block text-sm font-bold text-text-muted mb-1">
                            Comentario
                        </label>
                        <textarea {...register("comment")} rows={2} id="comment" className="input" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
                    <div className="bg-bg-subtle/50 p-2 rounded-lg flex items-center">
                        <Switch
                            checked={isBillsActive}
                            onChange={setIsBillsActive}
                            label="Registrar como Gasto"
                        />
                    </div>
                    <div className="bg-bg-subtle/50 p-2 rounded-lg flex items-center">
                        <Switch
                            checked={isAccountActive}
                            onChange={setIsAccountActive}
                            label="Crear Cuenta por Pagar"
                        />
                    </div>
                </div>

                {isBillsActive && (
                    <div className="md:col-span-2 space-y-4 pt-4 border-t border-bg-subtle">
                        <h3 className="text-lg font-semibold text-text-base">Información del Gasto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <label htmlFor="bills_name" className="block text-sm font-bold text-text-muted mb-1">Nombre del Gasto *</label>
                                <input type="text" id="bills_name" {...register("bills_name")} className="input" />
                            </div>
                            <div>
                                <label htmlFor="bills_quantity" className="block text-sm font-bold text-text-muted mb-1">Cantidad *</label>
                                <input type="number" id="bills_quantity" {...register("bills_quantity")} className="input" step="any" min={0} />
                            </div>
                            <div>
                                <label htmlFor="bills_payment_type" className="block text-sm font-bold text-text-muted mb-1">Tipo de pago</label>
                                <select id="bills_payment_type" {...register("bills_payment_type")} className="input-select">
                                    <option value="1">Efectivo</option>
                                    <option value="2">Tarjeta</option>
                                    <option value="3">Transferencia</option>
                                    <option value="4">Cheque</option>
                                    <option value="6">BTC</option>
                                    <option value="0">Otro</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bills_categories_id" className="block text-sm font-bold text-text-muted mb-1">Categoría de gasto</label>
                                <select id="bills_categories_id" {...register("bills_categories_id")} className="input-select">
                                    {categories && categories?.map((value: any) => (
                                        <option key={value.id} value={value.id}>{value.name}</option>
                                    ))}                                
                                </select>
                            </div>
                            {watch("bills_payment_type") != 1 ? (
                                <div>
                                    <label htmlFor="bills_cash_accounts_id" className="block text-sm font-bold text-text-muted mb-1">Cuenta de transferencia</label>
                                    <select id="bills_cash_accounts_id" {...register("bills_cash_accounts_id")} className="input-select">
                                        {accounts && accounts?.map((value: any) => (
                                            <option key={value.id} value={value.id}>{value.account} | {value.bank} | ${value.balance}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-bold text-text-muted mb-1">Cuenta de transferencia</label>
                                    <input className="input-disabled" readOnly value="N/A para pagos en efectivo" />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {isAccountActive && (
                    <div className="md:col-span-2 space-y-4 pt-4 border-t border-bg-subtle">
                        <h3 className="text-lg font-semibold text-text-base">Información de la Cuenta por Pagar</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <label htmlFor="account_name" className="block text-sm font-bold text-text-muted mb-1">Nombre de la cuenta *</label>
                                <input type="text" id="account_name" {...register("account_name")} className="input" />
                            </div>
                            <div>
                                <label htmlFor="account_quantity" className="block text-sm font-bold text-text-muted mb-1">Cantidad *</label>
                                <input type="number" id="account_quantity" {...register("account_quantity")} className="input" step="any" min={0} />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="account_expiration" className="block text-sm font-bold text-text-muted mb-1">Fecha de vencimiento</label>
                                <input type="date" id="account_expiration" {...register("account_expiration")} className="input" />
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center pt-6 border-t border-bg-subtle">
                    <Button type="submit" disabled={loading} preset={loading ? Preset.saving : Preset.save} />
                </div>
            </form>
        </div>
    );
}
