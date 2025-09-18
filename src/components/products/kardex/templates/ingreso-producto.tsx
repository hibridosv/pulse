"use client";

import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";
import { documentType, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface IngresoProductoProps {
    request?: any;
}

export function IngresoProducto(props: IngresoProductoProps) {
    const { request } = props;
      const { system } = useConfigStore();


    if (!request) return <></>

    
    return (<div className="w-full">
                <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 mb-4 text-text-base flex justify-between items-center">
                    <h3 className="text-lg font-bold">Producto: <span className="font-semibold">{ request?.product?.cod }</span> | <span className="font-semibold">{ request?.product?.description }</span></h3>
                </div>


                <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 text-text-base">
                    <h4 className="text-lg font-bold mb-2">Detalles del Ingreso</h4>
                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Ingreso</div>
                        <div className="w-3/4 ml-4">{ formatDateAsDMY(request?.created_at) } { formatHourAsHM(request?.created_at) }</div>
                    </div>

                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Numero de documento</div>
                        <div className="w-3/4 ml-4">{ documentType(request?.document_type)} # { request?.document_number }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Ingresado por:</div>
                        <div className="w-3/4 ml-4">{ request?.employee?.name }</div>
                    </div>

                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Proveedor</div>
                        <div className="w-3/4 ml-4">{ request?.provider?.name }</div>
                    </div>


                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Cantidad</div>
                        <div className="w-3/4 ml-4">{ request?.quantity }</div>
                    </div>

                    
                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Precio Compra</div>
                        <div className="w-3/4 ml-4">{ numberToMoney(request?.unit_cost, system) }</div>
                    </div>

                    
                    <div className="flex justify-between items-center p-2 border-b border-bg-subtle last:border-b-0">
                        <div className="w-1/4 font-semibold text-text-muted border-r border-bg-subtle pr-2">Precio Venta</div>
                        <div className="w-3/4 ml-4">{ numberToMoney(request?.sale_price, system) }</div>
                    </div>


                </div>

    
    </div>);
}
