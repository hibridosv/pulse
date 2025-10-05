'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { formatDate, formatHourAsHM } from "@/lib/date-formats";
import { getPaymentTypeName, getTotalOfItem, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface HistoryDiscountedTableI {
  records: any;
  isLoading?: boolean;
}

export function HistoryDiscountedTable(props: HistoryDiscountedTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!records || records.length === 0) {
    return <NothingHere />;
  }

console.log(records)
  const listItems = records.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base ${record?.status == 0 && 'bg-red-200'}`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
        { formatDate(record?.charged_at) } { formatHourAsHM(record?.charged_at)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        { record?.casheir?.name ?? "--" }
      </td>
      <td className="px-3 py-2 text-left whitespace-nowrap font-medium" >
        <span>{ record?.invoice_assigned?.name ?? "--" }:</span>
        <span className="ml-3">{ record?.invoice ?? "--" }</span>
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { getPaymentTypeName(record?.payment_type) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
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
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Fecha </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cajero</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Factura </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Tipo Pago</th>
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
                <p className="text-sm text-text-muted">Total descuentos: </p>
                <p className="text-lg font-semibold text-text-base">{ numberToMoney(getTotalOfItem(records?.data, "discount"), system) }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Total de venta: </p>
                <p className="text-lg font-semibold text-text-base">{ numberToMoney(getTotalOfItem(records?.data, "total"), system) }</p>
            </div>
          </div>
      </div>
    </div>
  );
}
