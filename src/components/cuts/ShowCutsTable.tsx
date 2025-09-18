'use client';

import { formatDateAsDMY, formatTime } from "@/lib/date-formats";
import useConfigStore from "@/stores/configStore";
import { numberToMoney } from "@/lib/utils";
import { Cut } from "@/interfaces/Cuts";
import { DeleteCutButton } from "./DeleteCutsButton";
import { CutDetailsModal } from "./CutDetailsModal";
import useModalStore from "@/stores/modalStorage";
import { NothingHere } from "../NothingHere";

export interface ShowCutsTableProps {
  records: Cut[];
}

export function ShowCutsTable(props: ShowCutsTableProps) {
  const { records } = props;
  const { system } = useConfigStore();
  const { modals, openModal, closeModal } = useModalStore();

  const firstRecord = records && records[0];
  if (!records || records.length === 0) {
    return <NothingHere />;
  }

  const listItems = records.map((record: Cut) => (
    <tr 
      key={record.id} 
      className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${record.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
      <td className="px-3 py-2 whitespace-nowrap clickeable hover:underline" onClick={() => openModal('cutDetails')}>
        {record?.close ? `${formatDateAsDMY(record.close)} ${formatTime(record.close)}` : "Sin corte"}
      </td>
      <td className="px-3 py-2 whitespace-nowrap clickeable" onClick={() => openModal('cutDetails')}>
        {record?.employee?.name}
      </td>
      <td 
        className={`px-3 py-2 whitespace-nowrap font-bold text-right clickeable ${record?.cash_diference > 0 ? 'text-info' : record?.cash_diference < 0 ? 'text-danger' : 'text-text-base'}`}
        onClick={() => openModal('cutDetails')}
      >
        {numberToMoney(record?.cash_diference ?? 0, system)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-center">
        <DeleteCutButton cut={record} isInitial={firstRecord.id === record?.id && record.status === 2} />
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
      {/* Asegúrate de que CutDetailsModal también use los estilos del tema si es necesario */}
      <CutDetailsModal isShow={modals['cutDetails']} onClose={() => closeModal('cutDetails')} record={records[0]} />
    </div>
  );
}
