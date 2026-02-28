'use client';

import { NothingHere } from '@/components/NothingHere';
import SkeletonTable from '@/components/skeleton/skeleton-table';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import useModalStore from '@/stores/modalStorage';
import useTempStorage from '@/stores/useTempStorage';
import { BiInfoCircle } from 'react-icons/bi';

const orderTypeMap: Record<number, string> = {
  1: 'Venta Rapida',
  2: 'En mesa',
  3: 'Delivery',
};

const deliveryTypeMap: Record<number, string> = {
  1: 'Comer Aqui',
  2: 'Para Llevar',
  3: 'Delivery',
};

const orderStatusMap: Record<number, { label: string; className: string }> = {
  1: { label: 'Activo', className: 'status-info' },
  2: { label: 'Guardado', className: 'status-success' },
  3: { label: 'Pagado', className: 'status-danger' },
  4: { label: 'Anulado', className: 'status-warning' },
  6: { label: 'Eliminada', className: 'status-warning' },
};

function OrderRow({ record }: { record: any }) {
  const relativeTime = useRelativeTime(record?.created_at);
  const { openModal } = useModalStore();
  const { setElement } = useTempStorage();

  const handleShowDetails = () => {
    setElement('restaurantOrderDetail', record);
    openModal('restaurantOrderDetail');
  };

  const status = orderStatusMap[record?.status] || { label: 'Activo', className: 'status-info' };

  return (
    <tr className="transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base">
      <td className="px-4 py-2 font-bold text-primary text-center">{record?.number}</td>
      <td className="px-4 py-2 text-center">{record?.attributes?.clients_quantity}</td>
      <td className="px-4 py-2 whitespace-nowrap">{record?.employee?.name}</td>
      <td className="px-4 py-2 whitespace-nowrap">{orderTypeMap[record?.order_type] ?? 'En mesa'}</td>
      <td className="px-4 py-2 whitespace-nowrap">{deliveryTypeMap[record?.delivery_type] ?? 'Para Llevar'}</td>
      <td className="px-4 py-2 whitespace-nowrap text-danger font-medium">{relativeTime}</td>
      <td className="px-4 py-2 text-center"><span className={status.className}>{status.label}</span></td>
      <td className="px-4 py-2 text-center">
        <BiInfoCircle size={22} className="text-accent clickeable" onClick={handleShowDetails} />
      </td>
    </tr>
  );
}

interface RestaurantOrdersTableProps {
  records: any;
  isLoading?: boolean;
}

export function RestaurantOrdersTable({ records, isLoading }: RestaurantOrdersTableProps) {
  if (isLoading) return <SkeletonTable rows={6} columns={8} />;
  if (!records?.data || records.data.length === 0) return <NothingHere text="No se encontraron ordenes" />;

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Orden</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Clientes</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Atiende</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Tipo de Servicio</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Llevar</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Tiempo</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Estado</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {records.data.map((record: any) => (
              <OrderRow key={record.id} record={record} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
