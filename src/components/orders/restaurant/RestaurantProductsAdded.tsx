'use client';

import SkeletonTable from "@/components/skeleton/skeleton-table";
import { getLastElement, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { groupInvoiceProductsByCodAll, isProductPendientToSend } from "../utils";



export function RestaurantProductsAdded() {
  const { system } = useConfigStore();
  const { order, sending} = ordersProductsStore();


  if (!order) return <></>

  if(sending) return <SkeletonTable rows={5} columns={8} />

    order?.invoiceproducts && groupInvoiceProductsByCodAll(order);
        const listItems = order?.invoiceproductsGroup.map((record: any) => { 
        return (
        <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
            <td className="px-2 py-1 whitespace-nowrap text-primary text-center font-semibold">
              { record.quantity }
            </td>
            <td className="px-2 py-1 text-left whitespace-nowrap font-medium " >
            { record.product }
            </td>
            <td className={`px-2 py-1 text-right whitespace-nowrap`}>
              { numberToMoney(record.unit_price, system) }
            </td>
            <td className={`px-2 py-1 text-right whitespace-nowrap`}>
            { numberToMoney(record.total, system) }
            </td>
            <td className={`px-2 py-1 text-center whitespace-nowrap`}>
              <AiFillCloseCircle size={20} title="Editar" className={`${isProductPendientToSend(getLastElement(order?.invoiceproducts, "cod", record?.cod)) ? 'text-grey-800' : 'text-red-800'} clickeable`}  />
            </td>
        </tr>
        )
        });

  return (
    <div className="m-2">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cant</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Producto</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Precio</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Total</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">
                <MdDelete size={22} title="Eliminar" className={`text-red-800 clickeable`}  />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {listItems}
          </tbody>
        </table>
      </div>
    </div>
  );
}
