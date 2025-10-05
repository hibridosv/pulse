'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { getTotalOfItem, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface HistorySalesTableI {
  records: any;
  isLoading?: boolean;
}

export function HistorySalesTable(props: HistorySalesTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!records || records.length === 0) {
    return <NothingHere />;
  }


  const listItems = records.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
        { record?.cod }
      </td>
      <td className="px-3 py-2 whitespace-nowrap clickeable">
        { record?.product }
      </td>
      <td className="px-3 py-2 text-right whitespace-nowrap font-medium" >
        { record?.quantity_sum }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { numberToMoney(record?.unit_price ? record?.unit_price : 0, system) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { numberToMoney(record?.discount_sum ? record?.discount_sum : 0, system) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { numberToMoney(record?.total_sum ? record?.total_sum : 0, system) }
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Codigo</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Producto</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cantidad</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Precio</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Descuento</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider text-right border-r border-bg-subtle last:border-r-0">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {listItems}
          </tbody>
        </table>
          <div className="w-full flex justify-center gap-4 p-4 mx-4 my-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle text-center">
            <div>
                <p className="text-sm text-text-muted">Cantidad de productos</p>
                <p className="text-lg font-semibold text-text-base">{ getTotalOfItem(records, "quantity_sum") }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Total descuentos</p>
                <p className="text-lg font-semibold text-success">{ numberToMoney(getTotalOfItem(records, "discount_sum"), system) }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Total de ventas</p>
                <p className="text-lg font-semibold text-primary">{ numberToMoney(getTotalOfItem(records, "total_sum"), system) }</p>
            </div>
          </div>
      </div>
    </div>
  );
}
