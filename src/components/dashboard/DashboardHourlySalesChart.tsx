'use client';

import { Line } from 'react-chartjs-2';
import { FiActivity } from 'react-icons/fi';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';
import { useDashboardHourlyLogic } from '@/hooks/dashboard/useDashboardHourlyLogic';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1000, easing: 'easeOutQuart' as const },
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: 12, cornerRadius: 8, titleFont: { size: 13 }, bodyFont: { size: 12 } },
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
    y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 } }, border: { display: false } },
  },
  interaction: { intersect: false, mode: 'index' as const },
};

export function DashboardHourlySalesChart() {
    const { hourlySalesData, loading, hasData } = useDashboardHourlyLogic()

    return (
        <div
          className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-text-base">Movimientos del Día</h3>
              <p className="text-sm text-text-muted mt-0.5">Ventas por hora — Hoy</p>
            </div>
            <div className="flex items-center gap-1.5 text-text-muted text-sm bg-bg-subtle/50 px-3 py-1.5 rounded-full">
              <FiActivity className="w-4 h-4 animate-pulse" />
              En tiempo real
            </div>
          </div>
          <div className="h-64">
            {loading && <div className="bg-bg-subtle rounded-lg animate-pulse h-full w-full"></div>}
            {!loading && hasData && hourlySalesData && <Line data={hourlySalesData} options={lineOptions} />}
          </div>
        </div>
    )
}
