"use client";

import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";
import { typeFailure } from "../../utils";

export interface RegistroAveriasProps {
    request?: any;
}

export function RegistroAverias(props: RegistroAveriasProps) {
    const { request } = props;

    if (!request) return <></>

    
    return (<div className="w-full">
                <div className="w-full mx-3 flex justify-between shadow-md shadow-lime-600 rounded-md m-4 p-4 font-semibold">
                    <div>Producto: { request?.product?.cod } | { request?.product?.description }</div>
                </div>

                <div className="w-full mx-3 shadow-md shadow-amber-500 rounded-md p-4 font-semibold">

                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Fecha</div>
                        <div className=" w-3/4 ml-4">{ formatDateAsDMY(request?.created_at) } { formatHourAsHM(request?.created_at) }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Usuario</div>
                        <div className=" w-3/4 ml-4">{ request?.employee?.name }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Cantidad</div>
                        <div className=" w-3/4 ml-4">{ request?.quantity }</div>
                    </div>

                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Razón</div>
                        <div className=" w-3/4 ml-4">{ request?.reason }</div>
                    </div>

                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Tipo</div>
                        <div className=" w-3/4 ml-4">{ typeFailure(request?.type) }</div>
                    </div>

                </div>

    </div>);
}
