'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { formatDate, formatHourAsHM } from "@/lib/date-formats";
import { getTotalOfItem, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface HistoryByProductTableI {
  records: any;
  isLoading?: boolean;
}

export function HistoryByProductTable(props: HistoryByProductTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!records || records.length === 0) {
    return <NothingHere text="Seleccione un producto" />;
  }


  const listItems = records.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
        { formatDate(record?.order?.charged_at) } { formatHourAsHM(record?.order?.charged_at)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        { record?.order?.casheir?.name ?? "--" }
      </td>
      <td className="px-3 py-2 text-left whitespace-nowrap font-medium" >
        <span>{ record?.order?.invoice_assigned?.name ?? "--" }:</span>
        <span className="ml-3">{ record?.order?.invoice ?? "--" }</span>
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { record?.order?.client?.name ?? "--" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.cod ?? "--" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.product ?? "--" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.quantity ?? "--" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
       { numberToMoney((record?.total / record?.quantity), system) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { numberToMoney(record?.discount ?? 0, system) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { numberToMoney(record?.total ?? 0, system) }
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Fecha Cobrada</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cajero </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Factura </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cliente</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Codigo</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Producto</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cantidad</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Precio</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Descuento</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {listItems}
          </tbody>
        </table>
          <div className="w-full flex justify-center gap-4 p-4 mx-4 my-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle text-center">
            <div>
                <p className="text-sm text-text-muted">Total de productos: </p>
                <p className="text-lg font-semibold text-text-base">{ getTotalOfItem(records , "quantity") }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Total descuentos: </p>
                <p className="text-lg font-semibold text-text-base">{ numberToMoney(getTotalOfItem(records, "discount"), system) }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Total de venta: </p>
                <p className="text-lg font-semibold text-text-base">{ numberToMoney(getTotalOfItem(records, "total"), system) }</p>
            </div>
          </div>
      </div>
    </div>
  );
}
