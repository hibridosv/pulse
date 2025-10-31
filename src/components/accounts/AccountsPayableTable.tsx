'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { formatDateAsDMY } from "@/lib/date-formats";
import { numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import { MdAddchart } from "react-icons/md";
import { status } from "./utils";


export interface AccountsPayableTableI {
  records: any;
  isLoading?: boolean;
}

export function AccountsPayableTable(props: AccountsPayableTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!records || records.length === 0) {
    return <NothingHere />;
  }

  const listItems = records.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base ${record?.status == 2 && 'bg-red-200'}`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary">
        { record?.name }
      </td>
      <td className="px-3 py-2 whitespace-nowrap font-semibold">
        { record?.provider?.name ?? "N/A" }
      </td>
      <td className="px-3 py-2 text-left whitespace-nowrap" >
       { record?.invoice_number ?? "N/A" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.expiration ? formatDateAsDMY(record?.expiration) : "N/A"}
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { numberToMoney(record?.quantity ?? 0, system) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { numberToMoney(record?.balance ?? 0, system) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { status(record?.status) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        <MdAddchart size={28} className="text-lime-600 clickeable" />
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Nombre </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Proveedor</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Factura </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">limite</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Total</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Saldo</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Estado</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">OP</th>
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
