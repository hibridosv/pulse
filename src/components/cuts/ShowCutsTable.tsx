'use client';

import { Cut } from "@/interfaces/Cuts";
import { formatDateAsDMY, formatTime } from "@/lib/date-formats";
import { numberToMoney } from "@/lib/utils";
import useCutStore from "@/stores/cashdrawer/cutStore";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { DeleteButton } from "../button/DeleteButton";
import { NothingHere } from "../NothingHere";
import { CutDetailsModal } from "./CutDetailsModal";

export interface ShowCutsTableProps {
  records: Cut[];
}

export function ShowCutsTable(props: ShowCutsTableProps) {
  const { records } = props;
  const { system } = useConfigStore();
  const { modals, openModal, closeModal } = useModalStore();
  const { deleteCut, deleting } = useCutStore();
  const { getSelectedElement, setSelectedElement} = useTempSelectedElementStore();


  const firstRecord = records && records[0];
  if (!records || records.length === 0) {
    return <NothingHere />;
  }

  const listItems = records.map((record: Cut) => (
    <tr 
      key={record.id} 
      className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${record.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
      <td className="px-3 py-2 whitespace-nowrap clickeable hover:underline" onClick={() =>{ setSelectedElement("cutDetails", record); openModal('cutDetails')}}>
        {record?.close ? `${formatDateAsDMY(record.close)} ${formatTime(record.close)}` : "Sin corte"}
      </td>
      <td className="px-3 py-2 whitespace-nowrap clickeable" onClick={() =>{ setSelectedElement("cutDetails", record); openModal('cutDetails')}}>
        {record?.employee?.name}
      </td>
      <td 
        className={`px-3 py-2 whitespace-nowrap font-bold text-right clickeable ${record?.cash_diference > 0 ? 'text-info' : record?.cash_diference < 0 ? 'text-danger' : 'text-text-base'}`}
        onClick={() =>{ setSelectedElement("cutDetails", record); openModal('cutDetails')}}
      >
        {numberToMoney(record?.cash_diference ?? 0, system)}
      </td>
      <td className="px-3 py-2 flex justify-center">
        <DeleteButton id={record.id} url="cuts" disabled={!(firstRecord.id === record?.id && record.status === 2) || deleting} text="¿Estas seguro de eliminar este corte?" onDeleteConfirm={deleteCut} />
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Fecha</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cajero</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider text-right border-r border-bg-subtle last:border-r-0">Diferencia</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider text-center">DEL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle">
            {listItems}
          </tbody>
        </table>
      </div>
      <CutDetailsModal isShow={modals.cutDetails} onClose={() => closeModal('cutDetails')} record={getSelectedElement('cutDetails')} />
    </div>
  );
}
