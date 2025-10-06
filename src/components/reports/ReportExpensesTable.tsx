'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { formatDateAsDMY } from "@/lib/date-formats";
import { documentType, getPaymentTypeName, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface ReportExpensesTableI {
  records: any;
  isLoading?: boolean;
}

export function ReportExpensesTable(props: ReportExpensesTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!records || records.length === 0) {
    return <NothingHere />;
  }

  const listItems = records.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base ${record?.status == 0 && 'bg-red-200'}`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
        { formatDateAsDMY(record?.created_at) }
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        { record?.employee?.name }
      </td>
      <td className="px-3 py-2 text-left whitespace-nowrap" >
        <span>{ record?.invoice ? documentType(record?.invoice) : "N/A" }:</span>
        <span className="ml-3">{ record?.invoice_number ? record?.invoice_number : "N/A" }</span>
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.category?.name ? record?.category?.name : "N/A" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        <div className="font-bold">{ record?.name }</div>
        <span className="small">{ record?.description }</span>
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { getPaymentTypeName(record?.payment_type) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.account?.account ?? "N/A" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { numberToMoney(record?.quantity ?? 0, system) }
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Fecha </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Empleado</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Documento </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Categoria </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Gasto </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Tipo Pago</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cuenta</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Monto</th>
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
