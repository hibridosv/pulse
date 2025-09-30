'use client';

import useProductStore from "@/stores/products/productStore";

// --- Componente Skeleton con Estilos de Tema ---
function StatisticsSkeleton() {
  return (
    <div className="bg-bg-content rounded-lg shadow-md animate-pulse p-4">
      <div className="pb-4 border-b border-bg-subtle">
        <div className="h-5 bg-bg-subtle rounded w-1/2"></div>
      </div>
      <div className="pt-4 space-y-4">
        {[...Array(1)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 bg-bg-subtle rounded w-1/3"></div>
            <div className="h-6 bg-bg-subtle rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Componente Principal ---
export function ShowLowStockStatistics() {
  const { products, loading } = useProductStore();

  if (loading) {
    return <StatisticsSkeleton />;
  }

  if (!products || Object.keys(products).length === 0) {
    return null;
  }

  const statsList = [
    { label: 'Total Registros', value: products.total || 0 },
  ];

  return (
    <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle/50 p-4 mt-2">
      <div className="pb-4 border-b border-bg-subtle">
        <h3 className="text-base font-semibold text-text-base uppercase">Estadísticas</h3>
      </div>
      <div className="pt-4 space-y-3">
        {statsList.map((stat) => (
          <div key={stat.label} className="flex justify-between items-center text-sm">
            <p className="text-text-muted font-semibold">{stat.label}</p>
            <p className="font-bold text-text-base bg-bg-subtle/60 px-2 py-0.5 rounded-md">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}