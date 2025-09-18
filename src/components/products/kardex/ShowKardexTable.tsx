'use client';

import useConfigStore from "@/stores/configStore";
import { numberToMoney } from "@/lib/utils";
import { Product } from "@/interfaces/products";
import { NothingHere } from "@/components/NothingHere";
import { useRouter } from 'next/navigation';
import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";


export interface ShowKardexTableProps {
  product: Product;
  kardex: any;
}

export function ShowKardexTable(props: ShowKardexTableProps) {
  const { product, kardex } = props;
  const { system, activeConfig } = useConfigStore();


  if (!product) {
    return <NothingHere />;
  }

  const listItems = kardex.map((record: any) => (
    <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary">{ formatDateAsDMY(record.created_at) } { formatHourAsHM(record.created_at) }</td>
      <td className="px-3 py-2 text-left whitespace-nowrap font-medium hover:underline clickeable">{ record.description }</td>
      <td className="px-3 py-2 text-center whitespace-nowrap text-text-muted">{ record.unit_cost }</td>
      <td className={`px-3 py-2 text-center whitespace-nowrap  ${record.qty_in ? 'text-text-muted' : 'text-blue-600 font-semibold'}`}>{ record.qty_in ? record.qty_in : 0 }</td>
      <td className={`px-3 py-2 text-center whitespace-nowrap  ${record.total_in ? 'text-text-muted' : 'text-blue-600 font-semibold'}`}>{ numberToMoney(record.total_in ? record.total_in : 0, system) }</td>
      <td className={`px-3 py-2 text-center whitespace-nowrap ${record.qty_out ? 'text-text-muted' : 'text-red-600 font-semibold'}`}>{ record.qty_out ? record.qty_out : 0 }</td>
      <td className={`px-3 py-2 text-center whitespace-nowrap ${record.total_out ? 'text-text-muted' : 'text-red-600 font-semibold'}`}>{ numberToMoney(record.total_out ? record.total_out : 0, system) }</td>
      <td className="px-3 py-2 text-center whitespace-nowrap text-text-muted">{ record.qty_balance ? record.qty_balance : 0 }</td>
      <td className="px-3 py-2 text-center whitespace-nowrap text-text-muted">{ numberToMoney(record.total_balance ? record.total_balance : 0, system) }</td>
    </tr>
  ));

  return (
    <div className="m-4">
        <div className="text-2xl md:text-1xl text-gray-800">PRODUCTO: <span className="uppercase font-semibold">{product.description}</span></div>
        <div className="text-2xl md:text-1xl">METODO: COSTO PROMEDIO PONDERADO</div>
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-base uppercase bg-bg-subtle">
                <tr>
                <th scope="col" colSpan={3} className="py-3 px-4 border text-center">Código: {product.cod}</th>
                <th scope="col" colSpan={2} className="py-3 px-4 border text-center">Entradas</th>
                <th scope="col" colSpan={2} className="py-3 px-4 border text-center">Salidas</th>
                <th scope="col" colSpan={2} className="py-3 px-4 border text-center">Saldo</th>
                </tr>
            </thead>
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0">Fecha</th>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0">Detalle</th>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider text-right border-r border-bg-subtle last:border-r-0">Costo</th>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0">Cantidad</th>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Total</th>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0">Cantidad</th>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0">Total</th>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0">Cantidad</th>
              <th scope="col" className="px-3 py-2 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0">Total</th>
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
