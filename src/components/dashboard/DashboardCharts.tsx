'use client';

import { useDashboardChartsLogic } from '@/hooks/dashboard/useDashboardChartsLogic';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FiTrendingUp } from 'react-icons/fi';

  ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 800, easing: 'easeOutQuart' as const },
  plugins: {
    legend: { position: 'top' as const, labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 12 } } },
    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: 12, cornerRadius: 8, titleFont: { size: 13 }, bodyFont: { size: 12 } },
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
    y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 } }, border: { display: false } },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  animation: { animateRotate: true, duration: 900, easing: 'easeOutQuart' as const },
  plugins: {
    legend: { position: 'bottom' as const, labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 12 } } },
    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: 12, cornerRadius: 8 },
  },
};

export function DashboardCharts() {
    const { weeklySalesData, paymentMethodsData, loading, hasWeekData, hasPayData } = useDashboardChartsLogic()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div
          className="lg:col-span-2 bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-text-base">Ventas de la Semana</h3>
              <p className="text-sm text-text-muted mt-0.5">Comparativa con semana anterior</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-sm font-semibold px-3 py-1.5 rounded-full">
              <FiTrendingUp className="w-4 h-4" />
              +15.3%
            </div>
          </div>
          <div className="h-72">
            {loading && <div className="bg-bg-subtle rounded-lg animate-pulse h-full w-full"></div>}
            {!loading && hasWeekData && weeklySalesData && <Bar data={weeklySalesData} options={barOptions} />}
          </div>
        </div>

        <div
          className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-base font-semibold text-text-base mb-1">Métodos de Pago</h3>
          <p className="text-sm text-text-muted mb-4">Distribución del día</p>
          <div className="h-72 flex items-center justify-center">
            {loading && <div className="bg-bg-subtle rounded-lg animate-pulse h-full w-full"></div>}
            {!loading && hasPayData && paymentMethodsData && <Doughnut data={paymentMethodsData} options={doughnutOptions} />}
          </div>
        </div>
      </div>
    )
}
