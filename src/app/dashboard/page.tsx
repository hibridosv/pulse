'use client';

import { ViewTitle } from '@/components/ViewTitle';
import {
  FiDollarSign, FiShoppingCart, FiBox, FiTrendingUp,
  FiArrowUpRight, FiArrowDownRight, FiCreditCard, FiPercent,
  FiActivity, FiCalendar, FiTarget,
} from 'react-icons/fi';
import { HiOutlineBanknotes, HiOutlineDocumentText } from 'react-icons/hi2';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);

// --- MOCK DATA ---
const kpiCards = [
  { title: 'Ventas del Día', value: '$2,458.50', change: '+12.5%', trend: 'up' as const, icon: FiDollarSign, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  { title: 'Órdenes Hoy', value: '34', change: '+8.2%', trend: 'up' as const, icon: FiShoppingCart, color: 'text-blue-600', bg: 'bg-blue-500/10' },
  { title: 'Ticket Promedio', value: '$72.31', change: '-3.1%', trend: 'down' as const, icon: FiCreditCard, color: 'text-amber-600', bg: 'bg-amber-500/10' },
  { title: 'Ganancia del Día', value: '$934.23', change: '+5.8%', trend: 'up' as const, icon: FiTarget, color: 'text-violet-600', bg: 'bg-violet-500/10' },
];

const secondaryCards = [
  { title: 'Productos Activos', value: '248', icon: FiBox, color: 'text-primary', bg: 'bg-primary/10' },
  { title: 'Cuentas por Cobrar', value: '$4,320.00', icon: HiOutlineBanknotes, color: 'text-warning', bg: 'bg-warning/10' },
  { title: 'Margen Promedio', value: '38.2%', icon: FiPercent, color: 'text-success', bg: 'bg-success/10' },
  { title: 'Facturas Emitidas', value: '156', icon: HiOutlineDocumentText, color: 'text-info', bg: 'bg-info/10' },
];

const weeklyLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const weeklySalesData = {
  labels: weeklyLabels,
  datasets: [
    {
      label: 'Ventas',
      data: [1850, 2200, 1980, 2650, 3100, 3800, 2458],
      backgroundColor: 'rgba(99, 102, 241, 0.65)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 2,
      borderRadius: 8,
      hoverBackgroundColor: 'rgba(99, 102, 241, 0.85)',
    },
    {
      label: 'Semana Anterior',
      data: [1600, 2000, 2100, 2300, 2800, 3200, 2100],
      backgroundColor: 'rgba(226, 232, 240, 0.7)',
      borderColor: 'rgba(203, 213, 225, 1)',
      borderWidth: 1,
      borderRadius: 8,
      hoverBackgroundColor: 'rgba(203, 213, 225, 0.9)',
    },
  ],
};

const hourlyLabels = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const hourlySalesData = {
  labels: hourlyLabels,
  datasets: [
    {
      label: 'Ventas por Hora',
      data: [120, 180, 310, 480, 620, 540, 390, 280, 350, 420, 310, 200],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 280);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.02)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      borderWidth: 2.5,
      pointBackgroundColor: 'rgba(16, 185, 129, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: 'rgba(16, 185, 129, 1)',
      pointHoverBorderWidth: 3,
    },
  ],
};

const paymentMethodsData = {
  labels: ['Efectivo', 'Tarjeta', 'Transferencia', 'Crédito'],
  datasets: [
    {
      data: [45, 30, 15, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.65)',
        'rgba(52, 211, 153, 0.60)',
        'rgba(251, 191, 36, 0.60)',
        'rgba(244, 114, 182, 0.55)',
      ],
      hoverBackgroundColor: [
        'rgba(99, 102, 241, 0.88)',
        'rgba(52, 211, 153, 0.85)',
        'rgba(251, 191, 36, 0.85)',
        'rgba(244, 114, 182, 0.80)',
      ],
      borderWidth: 0,
    },
  ],
};

const topProducts = [
  { name: 'Coca Cola 600ml', sold: 84, revenue: '$126.00', barFrom: 'from-indigo-400', barTo: 'to-indigo-500', barHoverFrom: 'group-hover:from-indigo-500', barHoverTo: 'group-hover:to-indigo-600' },
  { name: 'Hamburguesa Clásica', sold: 52, revenue: '$364.00', barFrom: 'from-emerald-400', barTo: 'to-emerald-500', barHoverFrom: 'group-hover:from-emerald-500', barHoverTo: 'group-hover:to-emerald-600' },
  { name: 'Papas Fritas Grande', sold: 47, revenue: '$141.00', barFrom: 'from-amber-400', barTo: 'to-amber-500', barHoverFrom: 'group-hover:from-amber-500', barHoverTo: 'group-hover:to-amber-600' },
  { name: 'Agua Cristal 500ml', sold: 41, revenue: '$41.00', barFrom: 'from-pink-400', barTo: 'to-pink-500', barHoverFrom: 'group-hover:from-pink-500', barHoverTo: 'group-hover:to-pink-600' },
  { name: 'Pizza Pepperoni', sold: 38, revenue: '$342.00', barFrom: 'from-sky-400', barTo: 'to-sky-500', barHoverFrom: 'group-hover:from-sky-500', barHoverTo: 'group-hover:to-sky-600' },
];

const recentOrders = [
  { id: '#0034', client: 'María López', total: '$85.50', method: 'Efectivo', time: 'Hace 5 min', status: 'success' as const },
  { id: '#0033', client: 'Carlos Rivas', total: '$142.00', method: 'Tarjeta', time: 'Hace 12 min', status: 'success' as const },
  { id: '#0032', client: 'Ana Martínez', total: '$67.25', method: 'Transferencia', time: 'Hace 18 min', status: 'success' as const },
  { id: '#0031', client: 'José Hernández', total: '$210.00', method: 'Crédito', time: 'Hace 25 min', status: 'warning' as const },
  { id: '#0030', client: 'Laura Gómez', total: '$53.75', method: 'Efectivo', time: 'Hace 32 min', status: 'success' as const },
];

const cashDrawers = [
  { name: 'Caja 1', employee: 'María López', status: 'open' as const, opening: '8:00 AM', orders: 22, salesTotal: 1580.50, expensesTotal: 180.00, inicialCash: 300.00, balance: 1700.50 },
  { name: 'Caja 2', employee: 'Carlos Rivas', status: 'open' as const, opening: '9:30 AM', orders: 12, salesTotal: 878.00, expensesTotal: 140.00, inicialCash: 200.00, balance: 938.00 },
];

// --- CHART OPTIONS ---
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

// --- STATUS STYLES ---
const statusStyles = {
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-red-50 text-red-600',
};

const rankColors = [
  'bg-indigo-500 text-white',
  'bg-emerald-500 text-white',
  'bg-amber-500 text-white',
  'bg-pink-400 text-white',
  'bg-sky-400 text-white',
];

export default function DashboardPage() {
  return (
    <div className="bg-bg-base min-h-screen pb-8">
      <ViewTitle text="Dashboard" />

      <div className="px-3 sm:px-5 space-y-5">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {kpiCards.map((card, i) => (
            <div
              key={card.title}
              className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-3.5 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${card.bg} transition-transform duration-300 hover:scale-110`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  card.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {card.trend === 'up' ? <FiArrowUpRight className="w-3 h-3" /> : <FiArrowDownRight className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-text-muted font-medium">{card.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-text-base mt-0.5">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {secondaryCards.map((card, i) => (
            <div
              key={card.title}
              className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-4 flex items-center gap-3 hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`p-2 rounded-lg ${card.bg} shrink-0`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-muted truncate">{card.title}</p>
                <p className="text-lg font-bold text-text-base">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Weekly Sales */}
          <div className="lg:col-span-2 bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300">
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
              <Bar data={weeklySalesData} options={barOptions} />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-base font-semibold text-text-base mb-1">Métodos de Pago</h3>
            <p className="text-sm text-text-muted mb-4">Distribución del día</p>
            <div className="h-72 flex items-center justify-center">
              <Doughnut data={paymentMethodsData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Hourly Sales */}
        <div className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300">
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
            <Line data={hourlySalesData} options={lineOptions} />
          </div>
        </div>

        {/* Bottom Row: Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-bg-content rounded-xl shadow-sm border border-bg-subtle hover:shadow-md transition-shadow duration-300">
            <div className="p-5 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-text-base">Últimas Órdenes</h3>
                <p className="text-sm text-text-muted mt-0.5">Transacciones más recientes</p>
              </div>
              <div className="flex items-center gap-1.5 text-text-muted text-xs bg-bg-subtle/50 px-2.5 py-1.5 rounded-full">
                <FiCalendar className="w-3.5 h-3.5" />
                Hoy
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-subtle/40 border-y border-bg-subtle">
                    <th className="text-left py-2.5 px-5 font-semibold text-text-muted text-xs uppercase tracking-wider">Orden</th>
                    <th className="text-left py-2.5 px-5 font-semibold text-text-muted text-xs uppercase tracking-wider">Cliente</th>
                    <th className="text-left py-2.5 px-5 font-semibold text-text-muted text-xs uppercase tracking-wider">Total</th>
                    <th className="text-left py-2.5 px-5 font-semibold text-text-muted text-xs uppercase tracking-wider hidden sm:table-cell">Método</th>
                    <th className="text-right py-2.5 px-5 font-semibold text-text-muted text-xs uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bg-subtle">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-bg-subtle/30 transition-colors duration-200">
                      <td className="py-3 px-5 font-semibold text-primary">{order.id}</td>
                      <td className="py-3 px-5 text-text-base">{order.client}</td>
                      <td className="py-3 px-5 font-semibold text-text-base">{order.total}</td>
                      <td className="py-3 px-5 text-text-muted hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1.5 text-xs bg-bg-subtle/60 px-2 py-0.5 rounded">
                          {order.method}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[order.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-current ${order.status === 'success' ? '' : 'animate-pulse'}`}></span>
                          {order.status === 'success' ? 'Completada' : 'Pendiente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">

            {/* Top Products */}
            <div className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-base font-semibold text-text-base mb-4">Productos Más Vendidos</h3>
              <div className="space-y-3">
                {topProducts.map((product, index) => {
                  const maxSold = topProducts[0].sold;
                  const barWidth = Math.round((product.sold / maxSold) * 100);
                  return (
                    <div key={product.name} className="group">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${rankColors[index]}`}>
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-text-base truncate">{product.name}</p>
                            <span className="text-sm font-semibold text-text-base shrink-0 ml-2">{product.revenue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-bg-subtle/60 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-1.5 rounded-full bg-gradient-to-r ${product.barFrom} ${product.barTo} transition-all duration-500 ${product.barHoverFrom} ${product.barHoverTo}`}
                                style={{ width: `${barWidth}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-text-muted shrink-0">{product.sold} uds</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cash Drawers */}
            <div className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-text-base">Cajas Abiertas</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                  {cashDrawers.length} activa{cashDrawers.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-3">
                {cashDrawers.map((drawer) => (
                  <div key={drawer.name} className="rounded-lg border border-bg-subtle p-3 hover:bg-bg-subtle/20 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-semibold text-text-base">{drawer.name}</span>
                      </div>
                      <span className="text-xs text-text-muted">{drawer.employee}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">Ventas</span>
                        <span className="text-xs font-semibold text-emerald-600">${drawer.salesTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">Gastos</span>
                        <span className="text-xs font-semibold text-red-500">${drawer.expensesTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">Órdenes</span>
                        <span className="text-xs font-bold text-text-base">{drawer.orders}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">Apertura</span>
                        <span className="text-xs text-text-muted">{drawer.opening}</span>
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2.5 border-t border-bg-subtle/60 flex items-center justify-between">
                      <span className="text-xs font-medium text-text-muted">Saldo en caja</span>
                      <span className="text-sm font-bold text-text-base">${drawer.balance.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
