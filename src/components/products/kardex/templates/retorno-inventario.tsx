"use client";

import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";
import { getPaymentTypeName, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface RetornoInventarioProps {
    request?: any;
}

export function RetornoInventario(props: RetornoInventarioProps) {
    const { request } = props;
      const { system } = useConfigStore();

    if (!request) return <></>

    
    return (<div className="w-full">

                <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 text-text-base">
                    <h4 className="text-lg font-bold mb-2">Detalles del Retorno de Inventario</h4>
                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Fecha</div>
                        <div className="w-3/4 ml-4">{ formatDateAsDMY(request?.charged_at) } { formatHourAsHM(request?.charged_at) }</div>
                    </div>

                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0 bg-danger/10">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Eliminada</div>
                        <div className="w-3/4 ml-4">{ formatDateAsDMY(request?.canceled_at) } { formatHourAsHM(request?.canceled_at) }</div>
                    </div>

                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Documento</div>
                        <div className="w-3/4 ml-4">{ request?.invoice_assigned?.name } # { request?.invoice }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Orden Numero</div>
                        <div className="w-3/4 ml-4">{ request?.number }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Cajero</div>
                        <div className="w-3/4 ml-4">{ request?.casheir?.name }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Cliente</div>
                        <div className="w-3/4 ml-4">{ request?.client?.name ? request?.client?.name : "N/A" }</div>
                    </div>

                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Tipo Pago</div>
                        <div className="w-3/4 ml-4">{ getPaymentTypeName(request?.payment_type) }</div>
                    </div>

                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Total</div>
                        <div className="w-3/4 ml-4">{ numberToMoney(request?.total, system) }</div>
                    </div>

                </div>

    </div>);
}
