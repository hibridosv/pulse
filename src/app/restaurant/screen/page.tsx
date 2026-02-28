'use client';

import { NothingHere } from '@/components/NothingHere';
import { ScreenCard } from '@/components/restaurant/ScreenCard';
import { useScreenOrdersLogic } from '@/hooks/restaurant/useScreenOrdersLogic';
import SkeletonTable from '@/components/skeleton/skeleton-table';

export default function Page() {
  const { orders, loading, processData } = useScreenOrdersLogic();

  if (loading) return <SkeletonTable rows={6} columns={4} />;
  if (!orders || orders.length === 0) return <NothingHere text="No hay comandas pendientes" />;

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 m-4 pb-10">
      {orders.map((order: any) => (
        <div key={order.id} className="mb-4 break-inside-avoid-column">
          <ScreenCard order={order} processData={processData} />
        </div>
      ))}
    </div>
  );
}
