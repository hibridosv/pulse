'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import useConfigStore from "@/stores/configStore";
import { FaEdit } from "react-icons/fa";
import { status, tipoDTE } from "./utils";


export interface DocumentsElectronicTableI {
  records: any;
  isLoading?: boolean;
}

export function DocumentsElectronicTable(props: DocumentsElectronicTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!records || records.length === 0) {
    return <NothingHere />;
  }


  const listItems = records.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
        { record?.fecha_procesamiento ?? "N/A" }
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        { tipoDTE(record?.tipo_dte) }
      </td>
      <td className="px-3 py-2 text-left whitespace-nowrap font-medium" >
        { record?.numero_control ?? "--" }
      </td>
      <td className={`px-3 py-2 text-left`}>
        { record?.receptor_nombre ?? "N/A" }
      </td>
      <td className={`px-3 py-2 text-left whitespace-nowrap`}>
        { status(record?.status) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.email == 1 ? "Enviado" : "Sin Enviar" }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
         <div className='clickeable'><FaEdit size="1.2em" /></div>
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
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Tipo DTE</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Numero de Control</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cliente</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Estado </th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Email</th>
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
