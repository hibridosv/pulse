"use client";

import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";
import { getPaymentTypeName, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";

export interface RetornoInventarioProps {
  request?: any;
}

const Row = ({ label, children, danger }: { label: string; children: React.ReactNode; danger?: boolean }) => (
  <div className={`grid grid-cols-3 items-baseline px-3 py-2 ${danger ? 'bg-danger/5' : ''}`}>
    <dt className={`text-xs font-medium ${danger ? 'text-danger' : 'text-text-muted'}`}>{label}</dt>
    <dd className="col-span-2 text-sm text-text-base">{children}</dd>
  </div>
);

export function RetornoInventario(props: RetornoInventarioProps) {
  const { request } = props;
  const { system } = useConfigStore();

  if (!request) return <></>;

  return (
    <div className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">
      <dl className="divide-y divide-bg-subtle">
        <Row label="Fecha">{formatDateAsDMY(request?.charged_at)} {formatHourAsHM(request?.charged_at)}</Row>
        <Row label="Eliminada" danger>{formatDateAsDMY(request?.canceled_at)} {formatHourAsHM(request?.canceled_at)}</Row>
        <Row label="Documento">{request?.invoice_assigned?.name} # {request?.invoice}</Row>
        <Row label="Orden N°">{request?.number}</Row>
        <Row label="Cajero">{request?.casheir?.name}</Row>
        <Row label="Cliente">{request?.client?.name ?? 'N/A'}</Row>
        <Row label="Tipo de pago">{getPaymentTypeName(request?.payment_type)}</Row>
        <Row label="Total"><span className="font-semibold">{numberToMoney(request?.total, system)}</span></Row>
      </dl>
    </div>
  );
}
