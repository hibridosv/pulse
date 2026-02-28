'use client';
import { formatDateAsDMY, formatHourAsHM } from '@/lib/date-formats';
import { statusOfTransfer } from '@/components/transfers/utils';
import useConfigStore from '@/stores/configStore';
import { IoMdAlert } from 'react-icons/io';
import { MdCheck } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { NothingHere } from '@/components/NothingHere';
import SkeletonTable from '@/components/skeleton/skeleton-table';

interface TransfersHistoryTableProps {
  records: any;
  onRowClick: (record: any, tenant: any) => void;
  onGetProductsOnline: (transfer: any) => void;
  sending?: boolean;
  loading?: boolean;
}

export function TransfersHistoryTable({ records, onRowClick, onGetProductsOnline, sending, loading }: TransfersHistoryTableProps) {
  const tenant = useConfigStore((s) => s.tenant);

  if (loading) return <SkeletonTable rows={10} columns={7} />;

  if (!records?.data || records.data.length === 0) return <NothingHere />;

  const getRowClass = (record: any) => {
    if ((record.status === 6 && record.to_tenant_id === tenant) ||
        (record.status === 7 && record.from_tenant_id === tenant)) {
      return 'bg-danger/10 clickeable';
    }
    if (record.status === 8 && record.from_tenant_id === tenant) {
      return 'bg-info/10 clickeable';
    }
    return '';
  };

  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-bg-subtle/60 text-text-base border-b-2 border-bg-subtle">
          <tr>
            <th className="py-3 px-4 border-r border-bg-subtle">Recibido</th>
            <th className="py-3 px-4 border-r border-bg-subtle">Origen</th>
            <th className="py-3 px-4 border-r border-bg-subtle">Destino</th>
            <th className="py-3 px-4 border-r border-bg-subtle">Envía</th>
            <th className="py-3 px-4 border-r border-bg-subtle">Recibe</th>
            <th className="py-3 px-4 border-r border-bg-subtle">Estado</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-bg-subtle">
          {records.data.map((record: any) => (
            <tr
              key={record.id}
              className={`hover:bg-bg-subtle ${getRowClass(record)}`}
              onClick={() => onRowClick(record, tenant)}
            >
              <td className="py-3 px-4 truncate">
                {record?.received_at
                  ? `${formatDateAsDMY(record.received_at)} ${formatHourAsHM(record.received_at)}`
                  : 'N/A'}
              </td>
              <td className="py-3 px-4">{record?.from?.description}</td>
              <td className="py-3 px-4">{record?.to?.description}</td>
              <td className="py-3 px-4">{record?.send}</td>
              <td className="py-3 px-4">{record?.receive || 'PENDIENTE'}</td>
              <td className="py-3 px-4">{statusOfTransfer(record?.status)}</td>
              <td className="py-3 px-4">
                {sending ? (
                  <FaSpinner size={18} className="text-primary animate-spin" />
                ) : (record?.status === 3 || record?.status === 5) && record?.is_online === 1 ? (
                  <IoMdAlert
                    size={22}
                    className="clickeable text-warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGetProductsOnline(record);
                    }}
                  />
                ) : (
                  <MdCheck size={18} className="text-success" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
