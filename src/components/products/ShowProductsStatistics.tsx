'use client';

import { useCallback } from 'react';
import { useGetResourceLogic } from "@/hooks/useGetResouceLogic";
import useProductStore from "@/stores/productStore";

// Componente para el esqueleto de carga
function StatisticsSkeleton() {
  return (
    <div className="m-5 bg-white rounded-lg shadow-md animate-pulse">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="p-4 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShowProductsStatistics() {
  const { statistics, loadStatistics, loadingStat } = useProductStore();

  const loadStats = useCallback(() => {
    if (!statistics || statistics.length === 0) {
        loadStatistics('products/statistics');
    }
  }, [loadStatistics, statistics]); 

  useGetResourceLogic(loadStats);

  if (loadingStat) {
    return <StatisticsSkeleton />;
  }

  if (!statistics || statistics.length === 0) {
    return null;
  }

  const statsList = [
    { label: 'Total Registros', value: statistics.totalProducts },
    { label: 'Productos', value: statistics.products },
    { label: 'Servicios', value: statistics.services },
    { label: 'Relacionados', value: statistics.linked },
  ];

  return (
    <div className="m-5 bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h3 className="text-base font-semibold text-gray-800 uppercase">Estadísticas de Productos</h3>
      </div>
      <div className="p-4 space-y-4">
        {statsList.map((stat) => (
          <div key={stat.label} className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-base font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-md">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}