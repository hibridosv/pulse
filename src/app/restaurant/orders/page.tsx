'use client';

import { ViewTitle } from '@/components/ViewTitle';
import { Pagination } from '@/components/Pagination';
import { RestaurantOrdersTable } from '@/components/restaurant/RestaurantOrdersTable';
import { OrderDetailsModal } from '@/components/restaurant/OrderDetailsModal';
import { useRestaurantOrdersLogic } from '@/hooks/restaurant/useRestaurantOrdersLogic';
import { usePagination } from '@/hooks/usePagination';
import useModalStore from '@/stores/modalStorage';
import useTempStorage from '@/stores/useTempStorage';

export default function Page() {
  const { currentPage, handlePageNumber } = usePagination('&page=1');
  const { modals, closeModal } = useModalStore();
  const { elements } = useTempStorage();

  const {
    orders, loading,
    pendingCount, tableServiceCount, deliveryCount,
  } = useRestaurantOrdersLogic(currentPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
      <div className="md:col-span-7 md:border-r md:border-primary">
        <ViewTitle text="ORDENES DEL DIA" />
        <div className="p-2 md:p-4">
          <RestaurantOrdersTable records={orders} isLoading={loading} />
          <Pagination records={orders} handlePageNumber={handlePageNumber} />
        </div>
      </div>

      <div className="md:col-span-3">
        <ViewTitle text="DATOS GENERALES" />
        <div className="p-2 md:p-4 space-y-3">
          <StatCard label="Ordenes Pendientes" value={pendingCount} />
          <StatCard label="Servicio en Mesa" value={tableServiceCount} />
          <StatCard label="Delivery" value={deliveryCount} />
        </div>
      </div>

      <OrderDetailsModal
        isShow={modals.restaurantOrderDetail}
        onClose={() => closeModal('restaurantOrderDetail')}
        order={elements.restaurantOrderDetail}
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-3">
      <div className="grid grid-cols-6 items-center">
        <span className="col-span-4 text-text-base text-sm xl:text-base">{label}:</span>
        <span className="col-span-2 text-right text-text-base text-sm xl:text-lg font-semibold">{value}</span>
      </div>
    </div>
  );
}
