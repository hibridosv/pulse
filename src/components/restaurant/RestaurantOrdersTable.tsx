'use client';

import { Indicator } from '@/components/Indicators';
import { NothingHere } from '@/components/NothingHere';
import SkeletonTable from '@/components/skeleton/skeleton-table';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import useModalStore from '@/stores/modalStorage';
import useTempStorage from '@/stores/useTempStorage';
import { BiInfoCircle } from 'react-icons/bi';
import { orderTypeMap, deliveryTypeMap, orderStatusMap } from './utils';

function RelativeTimeCell({ timestamp }: { timestamp: string }) {
  const relativeTime = useRelativeTime(timestamp);
  return <td className="px-3 py-2 whitespace-nowrap text-danger font-medium">{relativeTime}</td>;
}

interface RestaurantOrdersTableProps {
  records: any;
  isLoading?: boolean;
}

export function RestaurantOrdersTable({ records, isLoading }: RestaurantOrdersTableProps) {
  const { openModal } = useModalStore();
  const { setElement } = useTempStorage();

  if (isLoading) return <SkeletonTable rows={6} columns={8} />;
  if (!records?.data || records.data.length === 0) return <NothingHere text="No se encontraron ordenes" />;

  const handleShowDetails = (record: any) => {
    setElement('restaurantOrderDetail', record);
    openModal('restaurantOrderDetail');
  };

  const listItems = records.data.map((record: any) => {
    const status = orderStatusMap[record?.status] || { label: 'Activo', type: 'info' as const };
    const deliveryType = deliveryTypeMap[record?.delivery_type] || { label: 'Para Llevar', type: 'warning' as const };

    return (
      <tr key={record.id} className="transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle text-text-base">
        <td className="px-3 py-2 font-bold text-primary text-center">{record?.number}</td>
        <td className="px-3 py-2 text-center">{record?.attributes?.clients_quantity}</td>
        <td className="px-3 py-2 whitespace-nowrap">{record?.employee?.name}</td>
        <td className="px-3 py-2 whitespace-nowrap">{orderTypeMap[record?.order_type] ?? 'En Mesa'}</td>
        <td className="px-3 py-2 whitespace-nowrap">
          <Indicator type={deliveryType.type} text={deliveryType.label} />
        </td>
        <RelativeTimeCell timestamp={record?.created_at} />
        <td className="px-3 py-2 text-center">
          <Indicator type={status.type} text={status.label} />
        </td>
        <td className="px-3 py-2 text-center">
          <BiInfoCircle size={22} className="text-accent clickeable" onClick={() => handleShowDetails(record)} />
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
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Orden</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Clientes</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Atiende</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Servicio</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Llevar</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Tiempo</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle whitespace-nowrap">Estado</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider whitespace-nowrap"></th>
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
