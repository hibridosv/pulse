import { Button, Preset } from "@/components/button/button";
import { DeleteButton } from "@/components/button/DeleteButton";
import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { formatDate, formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";
import { getPaymentTypeName, numberToMoney } from "@/lib/utils";
import cashExpensesStore from "@/stores/cash/cashExpensesStore";
import useConfigStore from "@/stores/configStore";
import productAddStore from "@/stores/productAddStore";
import { FaSpinner } from "react-icons/fa";


export function ExpensesTable() {
    const { system } = useConfigStore();
    const { expenses, loading, deleting, deleteExpense } = cashExpensesStore();
    console.log(expenses)

    if (expenses && loading) return <SkeletonTable rows={4} columns={7} />;
    if (!expenses) return null;
    if (expenses && expenses.length === 0) return (<NothingHere text="Ingrese los productos a descontar" />)

    let total = 0;
    const listItems = expenses && expenses.map((record: any) => {
        if (record.status === 1) {
            total += record.quantity;
        }
        return (
            <tr 
            title={ record?.status === 2 ? `Eliminado por ${record?.deleted_by?.name}` : ``}
            key={record.id} 
            className={`whitespace-nowrap transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${record.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
            
            <td className="px-3 py-2 text-center" >
                { formatDate(record?.created_at) } { formatHourAsHM(record?.created_at) }
            </td>
            <td className="px-3 py-2 font-medium">
                <div className={`${record?.description && "text-xs font-light"}`}>{ record.name }</div>
                <div>{ record.description }</div>
            </td>
            <td className="px-3 py-2 text-center" >
                { numberToMoney(record?.quantity, system)}
            </td>
            <td className={`px-3 py-2 text-center font-semibold`}>
                { getPaymentTypeName(record?.payment_type) }
            </td>
            <td className="px-3 py-2 text-center">
              { deleting ? <FaSpinner className="animate-spin" size={20} color="red" /> :
                <DeleteButton id={record.id} url="cash/expenses" onDeleteConfirm={deleteExpense} disabled={record.status === 0 || deleting} />
              }
            </td>
            </tr>
        )
      });


  return (
    <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60">
            <tr className="border-b-2 border-bg-subtle">
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle text-center">Hora</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle text-center">Descripcion</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle text-center">Cant</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle text-center">Tipo Pago</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider text-center">Del</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle">
            {listItems}
          </tbody>
        </table>
        <div className="font-bold uppercase text-right ml-4 text-subtle p-4">Total ingresado: {numberToMoney(total, system)}</div>
      </div>
  );
}