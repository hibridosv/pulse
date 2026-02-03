'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { Button, Preset } from "../button/button";


export interface AdjustmentsProductsToChangeTableI {
  records: any;
  isLoading?: boolean;
  isSending?: boolean;
  sendAdjustment: (record: any) => void;
}

export function AdjustmentsProductsToChangeTable(props: AdjustmentsProductsToChangeTableI) {
  const { records, isLoading, isSending, sendAdjustment } = props;
  const { openModal } = useModalStore();
  const { setSelectedElement } = useTempSelectedElementStore();

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!records || records.length === 0) {
    return <NothingHere />;
  }

  const listItems = records.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-3 py-2 whitespace-nowrap text-primary text-center">
        { record?.cod }
      </td>
      <td className="px-3 py-2 text-left whitespace-nowrap font-medium " >
       { record?.name }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        { record?.quantity }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
       <Button text="Cambiar" onClick={()=>{ openModal('setAdjustment'); setSelectedElement('setAdjustment', record)}} disabled={isLoading}/>
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap`}>
        <Button preset={isSending ? Preset.saving : Preset.save} text="Aceptar" onClick={()=>sendAdjustment(record)} disabled={isSending}/>
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cod</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Producto</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cantidad</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Cambiar</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Aceptar</th>
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
