import { formatDateAsDMY, formatTime } from "@/lib/date-formats";
import { Button, Preset } from "../button/button";

import useConfigStore from "@/stores/configStore";
import { numberToMoney } from "@/lib/utils";
import { Cut } from "@/interfaces/Cuts";


export interface ShowCutsTableProps {
 records: Cut[];
}

export function ShowCutsTable(props: ShowCutsTableProps) {
  const { records } = props;
  const { system } = useConfigStore();

const firstRecord = records && records[0];


  const listItems = records &&  records.map((record: any, key: any) => (
    <tr key={key} className={`border-2 ${record.status == 0 && "bg-red-100"}`} >
      <td className="py-2 px-6 truncate clickeable" onClick={()=>{}}>
        { record?.close && formatDateAsDMY(record.close) }  { record?.close ? formatTime(record.close) : "Sin corte"}
      </td>
      <td className="py-2 px-6 clickeable" onClick={()=>{}}>
        { record?.employee?.name }
      </td>
      <td className={`py-2 px-6 font-bold clickeable ${record?.cash_diference > 0 ? 'text-blue-600' : record?.cash_diference < 0 ? 'text-red-600' : 'text-black'}`} onClick={()=>{}}>{ numberToMoney(record?.cash_diference ?? 0, system) }
      </td>
      <td className="py-2 px-6">
        <Button preset={firstRecord.id == record?.id ? Preset.smallClose : Preset.smallCloseDisable} onClick={ ()=>{} } noText />
      </td>
    </tr>
  ));

  return (<div className="mx-4">
            <div className="w-full overflow-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                    <th scope="col" className="py-3 px-4 border">Fecha</th>
                    <th scope="col" className="py-3 px-4 border">Cajero</th>
                    <th scope="col" className="py-3 px-4 border">Diferencia</th>
                    <th scope="col" className="py-3 px-4 border">Del</th>
                    </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </table>
        </div>
   </div>);
}
