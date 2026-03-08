'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { formatDateAsDMY } from "@/lib/date-formats";
import { numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import useModalStore from "@/stores/modalStorage";
import useTempStorage from "@/stores/useTempStorage";

export interface ReportPurchasesTableI {
  records: any;
  isLoading?: boolean;
}

export function ReportPurchasesTable(props: ReportPurchasesTableI) {
  const { records, isLoading } = props;
  const { system } = useConfigStore();
  const { setElement } = useTempStorage();
  const { openModal } = useModalStore();

  if (isLoading) return <SkeletonTable rows={5} columns={6} />;

  if (!records || records.length === 0) {
    return <NothingHere />;
  }

  const parsed = records.map((record: any) => ({
    record,
    json: JSON.parse(record.documento_json),
  }));

  const totalSubtotal = parsed.reduce((acc: number, { json }: any) => acc + (json?.resumen?.subTotal ?? 0), 0);
  const totalOperacion = parsed.reduce((acc: number, { json }: any) => acc + (json?.resumen?.montoTotalOperacion ?? 0), 0);
  const totalRetenciones = parsed.reduce((acc: number, { json }: any) => acc + (json?.resumen?.reteRenta ?? 0), 0);

  const listItems = parsed.map(({ record, json }: any) => {
    const anulado = record?.status == 0;
    return (
      <tr
        key={json.id}
        className={`transition-colors duration-150 divide-x divide-bg-subtle text-text-base ${
          anulado
            ? 'bg-danger/5 hover:bg-danger/10'
            : 'odd:bg-bg-subtle/40 hover:bg-bg-subtle'
        }`}
      >
        <td className="px-3 py-2 whitespace-nowrap text-text-muted text-xs">
          {formatDateAsDMY(json?.identificacion?.fecEmi)}
        </td>
        <td className="px-3 py-2 whitespace-nowrap text-xs font-mono text-text-muted">
          {json?.emisor?.nit ?? 'N/A'}
        </td>
        <td
          className="px-3 py-2 text-left whitespace-nowrap clickeable"
          onClick={() => { setElement('purchaseSelected', json); openModal('purchasesDetailsModal'); }}
        >
          <div className="flex items-center gap-2">
            <span className="text-primary hover:underline font-medium">
              {json?.emisor?.nombreComercial ?? 'N/A'}
            </span>
            {anulado && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-danger/10 text-danger font-semibold leading-none">
                Anulado
              </span>
            )}
          </div>
        </td>
        <td className="px-3 py-2 text-right whitespace-nowrap tabular-nums">
          {numberToMoney(json?.resumen?.subTotal ?? 0, system)}
        </td>
        <td className="px-3 py-2 text-right whitespace-nowrap tabular-nums font-semibold">
          {numberToMoney(json?.resumen?.montoTotalOperacion ?? 0, system)}
        </td>
        <td className={`px-3 py-2 text-right whitespace-nowrap tabular-nums ${(json?.resumen?.reteRenta ?? 0) > 0 ? 'text-warning font-medium' : 'text-text-muted'}`}>
          {numberToMoney(json?.resumen?.reteRenta ?? 0, system)}
        </td>
      </tr>
    );
  });

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Fecha</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">NIT</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Proveedor</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap text-right">Subtotal</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap text-right">Total</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider whitespace-nowrap text-right">Retenciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {listItems}
          </tbody>
          <tfoot className="border-t-2 border-bg-subtle bg-bg-subtle/60 text-xs font-bold text-text-base uppercase">
            <tr className="divide-x divide-bg-subtle">
              <td colSpan={3} className="px-6 py-2 tracking-wider">
                {parsed.length} documento{parsed.length !== 1 ? 's' : ''}
              </td>
              <td className="px-3 py-2 text-right tabular-nums">{numberToMoney(totalSubtotal, system)}</td>
              <td className="px-3 py-2 text-right tabular-nums">{numberToMoney(totalOperacion, system)}</td>
              <td className={`px-3 py-2 text-right tabular-nums ${totalRetenciones > 0 ? 'text-warning' : ''}`}>
                {numberToMoney(totalRetenciones, system)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
