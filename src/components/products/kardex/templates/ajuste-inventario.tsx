"use client";

import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";

export interface AjusteInventarioProps {
    request?: any;
}

export function AjusteInventario(props: AjusteInventarioProps) {
    const { request } = props;

    if (!request) return <></>

    
    return (<div className="w-full">
                <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 mb-4 text-text-base flex justify-between items-center">
        <h3 className="text-lg font-bold">Producto: <span className="font-semibold">{ request?.product?.cod }</span> | <span className="font-semibold">{ request?.product?.description }</span></h3>
    </div>

                <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 text-text-base">
                    <h4 className="text-lg font-bold mb-2">Detalles del Ajuste</h4>
                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Inicio</div>
                        <div className="w-3/4 ml-4">{ formatDateAsDMY(request?.adjustment?.initial_date) } { formatHourAsHM(request?.adjustment?.initial_date) }</div>
                    </div>

                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Finalizado</div>
                        <div className="w-3/4 ml-4">{ formatDateAsDMY(request?.adjustment?.final_date) } { formatHourAsHM(request?.adjustment?.final_date) }</div>
                    </div>

                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Estado</div>
                        <div className="w-3/4 ml-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${request?.adjustment?.status == 1 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                                { request?.adjustment?.status == 1 ? "Activo" : "Finalizado" }
                            </span>
                        </div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Cantidad</div>
                        <div className="w-3/4 ml-4">{ request?.quantity }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Establecido</div>
                        <div className="w-3/4 ml-4">{ request?.stablished }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Diferencia</div>
                        <div className="w-3/4 ml-4">{ request?.difference }</div>
                    </div>


                </div>

    </div>);
}
