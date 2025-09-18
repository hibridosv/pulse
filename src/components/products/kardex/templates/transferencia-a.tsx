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

                <div className="w-full mx-3 shadow-md shadow-amber-500 rounded-md p-4 font-semibold">

                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Fecha</div>
                        <div className=" w-3/4 ml-4">{ formatDateAsDMY(request?.created_at) } { formatHourAsHM(request?.created_at) }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Enviado a</div>
                        <div className=" w-3/4 ml-4">{ request?.to?.description }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Envia</div>
                        <div className=" w-3/4 ml-4">{ request?.send }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Recive</div>
                        <div className=" w-3/4 ml-4">{ request?.receive }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Estado</div>
                        <div className=" w-3/4 ml-4">{ statusOfTransfer(request?.status) }</div>
                    </div>


                </div>

    </div>);
}
