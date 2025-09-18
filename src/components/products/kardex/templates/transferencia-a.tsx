"use client";

import { statusOfTransfer } from "@/components/transfers/utils";
import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";


export interface TransferenciaAProps {
    request?: any;
}

export function TransferenciaA(props: TransferenciaAProps) {
    const { request } = props;

    if (!request) return <></>

    
    return (<div className="w-full">

                <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 text-text-base">
                    <h4 className="text-lg font-bold mb-2">Detalles de la Transferencia</h4>
                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Fecha</div>
                        <div className="w-3/4 ml-4">{ formatDateAsDMY(request?.created_at) } { formatHourAsHM(request?.created_at) }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Enviado a</div>
                        <div className="w-3/4 ml-4">{ request?.to?.description }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Envia</div>
                        <div className="w-3/4 ml-4">{ request?.send }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Recive</div>
                        <div className="w-3/4 ml-4">{ request?.receive }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Estado</div>
                        <div className="w-3/4 ml-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${request?.status == 1 ? 'bg-success/20 text-success' : request?.status == 2 ? 'bg-warning/20 text-warning' : 'bg-danger/20 text-danger'}`}>
                                { statusOfTransfer(request?.status) }
                            </span>
                        </div>
                    </div>


                </div>

    </div>);
}
