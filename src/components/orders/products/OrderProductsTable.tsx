'use client';

import { Button, Preset } from "@/components/button/button";
import { NothingHere } from "@/components/NothingHere";
import { Order } from "@/interfaces/order";
import { getTotalPercentage, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import { commissionTotal, sumarDiscount, sumarTotales } from "../utils";


export interface OrderProductsTableI {
  order: Order;
}

export function OrderProductsTable(props: OrderProductsTableI) {
  const { order } = props;
  const { system } = useConfigStore();
  const isDisabled = false;

  let data = order?.invoiceproducts ?? [];



  if (!data || data.length === 0) {
    return <NothingHere text="Agregue un producto" />;
  }


  const listItems = data.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-2 py-1 whitespace-nowrap font-medium text-center">
        { record.quantity }
      </td>
      <td className="px-2 py-1 whitespace-nowrap font-medium">
       { record.cod }
      </td>
      <td className="px-2 py-1 text-left whitespace-nowrap" >
        { record.product.slice(0, 50) }
      </td>
      <td className={`px-2 py-1 text-center whitespace-nowrap font-bold`}>
        { numberToMoney(record.unit_price ?? 0, system) }
      </td>
      <td className={`px-2 py-1 text-center whitespace-nowrap  font-bold ${record?.actual_stock <= 0 ? 'text-red-600' : 'text-black'}`}>
        { numberToMoney(record.discount ?? 0, system) }
      </td>
      <td className={`px-2 py-1 text-center whitespace-nowrap`}>
        { record.commission ?? 0 } % -  { numberToMoney(getTotalPercentage(record?.subtotal, record?.commission), system) }
      </td>
      <td className={`px-2 py-1 text-center whitespace-nowrap`}>
        { numberToMoney(record.total ?? 0, system) }
      </td>
      <td className={`px-2 py-1 text-center whitespace-nowrap`}>
        <Button disabled={isDisabled} preset={isDisabled ? Preset.smallMinusDisable : Preset.smallMinus} noText onClick={()=> {}} />
        <Button disabled={isDisabled} preset={isDisabled ? Preset.smallPlusDisable : Preset.smallPlus} noText onClick={()=> {}} />
      </td>
      <td className={`px-2 py-1 text-center whitespace-nowrap`}>
        <Button preset={Preset.smallClose} noText onClick={()=> {}} />
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cant</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cod </th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Producto</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Precio</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Descuento</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Comisión</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Total</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">OP</th>
              <th scope="col" className="px-2 py-1 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Del</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {listItems}
          </tbody>
          <tfoot>
            <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col" className="py-2 px-2 border">{ numberToMoney(sumarDiscount(data), system)}</th>
                <th scope="col" className="py-2 px-2 border">{ numberToMoney(commissionTotal(data), system) }</th>
                <th scope="col" className="py-2 px-2 border">{ numberToMoney(sumarTotales(data), system) }</th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
            </tfoot>
        </table>
      </div>
    </div>
  );
}
