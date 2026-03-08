"use client";

import { statusOfTransfer } from "@/components/transfers/utils";
import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";

export interface TransferenciaAProps {
  request?: any;
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-3 items-baseline px-3 py-2">
    <dt className="text-xs font-medium text-text-muted">{label}</dt>
    <dd className="col-span-2 text-sm text-text-base">{children}</dd>
  </div>
);

export function TransferenciaA(props: TransferenciaAProps) {
  const { request } = props;

  if (!request) return <></>;

  return (
    <div className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">
      <dl className="divide-y divide-bg-subtle">
        <Row label="Fecha">{formatDateAsDMY(request?.created_at)} {formatHourAsHM(request?.created_at)}</Row>
        <Row label="Enviado a">{request?.to?.description}</Row>
        <Row label="Envía"><span className="font-semibold">{request?.send}</span></Row>
        <Row label="Recibe"><span className="font-semibold">{request?.receive}</span></Row>
        <Row label="Estado">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
            request?.status == 1 ? 'bg-success/15 text-success'
            : request?.status == 2 ? 'bg-warning/15 text-warning'
            : 'bg-danger/15 text-danger'
          }`}>
            {statusOfTransfer(request?.status)}
          </span>
        </Row>
      </dl>
    </div>
  );
}
