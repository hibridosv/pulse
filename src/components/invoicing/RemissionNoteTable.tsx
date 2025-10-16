'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { formatDateAsDMY } from "@/lib/date-formats";
import useConfigStore from "@/stores/configStore";


export interface RemissionNoteTableI {
  records: any;
  isLoading?: boolean;
}

export function RemissionNoteTable(props: RemissionNoteTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();
  const data = records?.data;

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!data || data.length === 0) {
    return <NothingHere />;
  }


  const listItems = data.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
        { record?.invoice ?? "--" }
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        { record?.client?.name ?? "N/A" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { record?.client?.document ?? "N/A" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { formatDateAsDMY(record?.charged_at) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.status ?? "--" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        X
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">NO</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cliente </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Documento</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Fecha </th>
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
