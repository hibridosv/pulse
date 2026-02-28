'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { formatDate } from "@/lib/date-formats";
import { getTotalOfItem, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface HistoryByDayTableI {
  records: any;
  isLoading?: boolean;
}

export function HistoryByDayTable(props: HistoryByDayTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();

  if(isLoading) return <SkeletonTable rows={5} columns={6} />

  if (!records || records.length === 0) {
    return <NothingHere />;
  }


  const listItems = records.map((record: any, key: any) => (
    <tr key={key} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary">
        { formatDate(record?.date) }
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-right">
        { numberToMoney(record?.subtotal ?? 0, system) }
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-right">
        { numberToMoney(record?.taxes ?? 0, system) }
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-right">
        { numberToMoney(record?.exempt ?? 0, system) }
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-right">
        { numberToMoney(record?.total_recorded ?? 0, system) }
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-right font-bold">
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
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Fecha</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Subtotal</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">IVA</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Exento</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Gravado</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {listItems}
          </tbody>
        </table>
          <div className="w-full flex justify-center gap-4 flex-wrap p-4 mx-4 my-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle text-center">
            <div>
                <p className="text-sm text-text-muted">Subtotal</p>
                <p className="text-lg font-semibold text-text-base">{ numberToMoney(getTotalOfItem(records, "subtotal"), system) }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">IVA</p>
                <p className="text-lg font-semibold text-text-base">{ numberToMoney(getTotalOfItem(records, "taxes"), system) }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Exento</p>
                <p className="text-lg font-semibold text-text-base">{ numberToMoney(getTotalOfItem(records, "exempt"), system) }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Gravado</p>
                <p className="text-lg font-semibold text-text-base">{ numberToMoney(getTotalOfItem(records, "total_recorded"), system) }</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Total</p>
                <p className="text-lg font-semibold text-primary">{ numberToMoney(getTotalOfItem(records, "total"), system) }</p>
            </div>
          </div>
      </div>
    </div>
  );
}
