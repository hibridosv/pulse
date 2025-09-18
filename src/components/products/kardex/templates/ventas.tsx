"use client";

import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";
import { getPaymentTypeName, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface VentasProps {
    request?: any;
}

export function Ventas(props: VentasProps) {
    const { request } = props;
      const { system } = useConfigStore();

    if (!request) return <></>

    
    return (<div className="w-full">

                <div className="w-full mx-3 shadow-md shadow-amber-500 rounded-md p-4 font-semibold">

                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Fecha</div>
                        <div className=" w-3/4 ml-4">{ formatDateAsDMY(request?.charged_at) } { formatHourAsHM(request?.charged_at) }</div>
                    </div>

                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Documento</div>
                        <div className=" w-3/4 ml-4">{ request?.invoice_assigned?.name } # { request?.invoice }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Orden Numero</div>
                        <div className=" w-3/4 ml-4">{ request?.number }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Cajero</div>
                        <div className=" w-3/4 ml-4">{ request?.casheir?.name }</div>
                    </div>


                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Cliente</div>
                        <div className=" w-3/4 ml-4">{ request?.client?.name ? request?.client?.name : "N/A" }</div>
                    </div>

                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Tipo Pago</div>
                        <div className=" w-3/4 ml-4">{ getPaymentTypeName(request?.payment_type) }</div>
                    </div>

                    <div className="mx-3 flex justify-between p-2 font-semibold border-2 border-gray-500">
                        <div className=" w-1/4 border-r-2 border-gray-500">Total</div>
                        <div className=" w-3/4 ml-4">{ numberToMoney(request?.total, system) }</div>
                    </div>

                </div>

    </div>);
}
