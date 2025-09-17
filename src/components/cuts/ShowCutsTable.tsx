import { formatDateAsDMY, formatTime } from "@/lib/date-formats";
import useConfigStore from "@/stores/configStore";
import { numberToMoney } from "@/lib/utils";
import { Cut } from "@/interfaces/Cuts";
import { DeleteCutButton } from "./DeleteCutsButton";
import { CutDetailsModal } from "./CutDetailsModal";
import useModalStore from "@/stores/modalStorage";

export interface ShowCutsTableProps {
  records: Cut[];
}

export function ShowCutsTable(props: ShowCutsTableProps) {
  const { records } = props;
  const { system } = useConfigStore();
  const { modals, openModal, closeModal } = useModalStore();

  const firstRecord = records && records[0];
  if (!records || records.length == 0) {
    return null;
  }

  const listItems = records && records.map((record: any, key: any) => (
    <tr key={key} className={`border-b hover:bg-gray-100 ${record.status == 0 && "bg-red-100"}`}>
      <td className="px-3 py-2 whitespace-nowrap clickeable" onClick={() => openModal('cutDetails')}>
        {record?.close && formatDateAsDMY(record.close)} {record?.close ? formatTime(record.close) : "Sin corte"}
      </td>
      <td className="px-3 py-2 whitespace-nowrap clickeable" onClick={() => openModal('cutDetails')}>
        {record?.employee?.name}
      </td>
      <td className={`px-3 py-2 whitespace-nowrap font-bold clickeable ${record?.cash_diference > 0 ? 'text-blue-600' : record?.cash_diference < 0 ? 'text-red-600' : 'text-gray-900'}`} onClick={() => openModal('cutDetails')}>
        {numberToMoney(record?.cash_diference ?? 0, system)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-center">
        <DeleteCutButton cut={record} isInitial={firstRecord.id == record?.id && record.status == 2} />
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">Fecha</th>
              <th scope="col" className="px-6 py-3">Cajero</th>
              <th scope="col" className="px-6 py-3">Diferencia</th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
      <CutDetailsModal isShow={modals['cutDetails']} onClose={() => closeModal('cutDetails')} record={records[0]} />
    </div>
  );
}