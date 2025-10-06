'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { getTotalOfItem, numberToMoney, percentage } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";


export interface ReportSalesTableI {
  records: any;
  isLoading?: boolean;
}

export function ReportSalesTable(props: ReportSalesTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();

  if(isLoading) return <SkeletonTable rows={5} columns={8} />

  if (!records || records.length === 0) {
    return <NothingHere />;
  }

  let totalSale = 0;
  let totalCost = 0;


  const listItems = records.map((record: any) => {
    const priceWithoutBill = record?.subtotal / record?.quantity;
    const totalUnitPrice = priceWithoutBill * record?.quantity;
    const totalUnitCost = record?.unit_cost * record?.quantity;

    totalSale += totalUnitPrice;
    totalCost += totalUnitCost;

    return (
      <tr key={record.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base`}>
      <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
        { record?.cod }
      </td>
      <td className="px-3 py-2 whitespace-nowrap clickeable">
        { record?.product }
      </td>
      <td className="px-3 py-2 text-right whitespace-nowrap font-medium" >
        { record?.quantity_sum }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { numberToMoney(record?.unit_price ? record?.unit_price : 0, system) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { numberToMoney(record?.discount_sum ? record?.discount_sum : 0, system) }
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold`}>
        { numberToMoney(record?.total_sum ? record?.total_sum : 0, system) }
      </td>
    </tr>
    )
  });

  const totalMargin = totalSale - totalCost;
  const marginPercentage = totalSale > 0 ? percentage(totalCost, totalSale).toFixed(2) : '0.00';

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Fecha</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Producto</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Codigo</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cantidad</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Costo U</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Costo T</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0" title="Precio Unitario con Impuestos">Precio U</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0" title="Total Precio Unitario con Impuestos">Precio T</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Descuento %</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Monto</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0" title="Total Venta con Impuestos">Total</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0" title="Margen Bruto">Margen $</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider text-right border-r border-bg-subtle last:border-r-0" title="Porcentaje de Margen Bruto">Margen %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {listItems}
          </tbody>
        </table>
          <div className="w-full flex justify-center gap-4 p-4 mx-4 my-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle text-center">
            <div>
                <p className="text-sm text-text-muted">Subtotal</p>
                <p className="text-lg font-semibold text-text-base">{numberToMoney(getTotalOfItem(records?.data, "subtotal"), system)}</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Impuestos</p>
                <p className="text-lg font-semibold text-success">{numberToMoney(getTotalOfItem(records?.data, "taxes"), system)}</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Ventas</p>
                <p className="text-lg font-semibold text-primary">{numberToMoney(getTotalOfItem(records?.data, "total"), system)}</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Margen</p>
                <p className="text-lg font-semibold text-primary">{numberToMoney(totalMargin, system)}</p>
            </div>
            <div>
                <p className="text-sm text-text-muted">Margen</p>
                <p className="text-lg font-semibold text-primary">{marginPercentage} %</p>
            </div>
          </div>
      </div>
    </div>
  );
}
