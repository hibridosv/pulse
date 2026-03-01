'use client';

import { FiCalendar } from 'react-icons/fi';

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

interface RecentOrder {
    id: string;
    client: string;
    total: string;
    method: string;
    time: string;
    status: 'success' | 'warning' | 'danger';
}

interface TopProduct {
    name: string;
    sold: number;
    revenue: string;
    barFrom: string;
    barTo: string;
    barHoverFrom: string;
    barHoverTo: string;
}

interface CashDrawer {
    name: string;
    employee: string;
    status: 'open' | 'closed';
    opening: string;
    orders: number;
    salesTotal: number;
    expensesTotal: number;
    inicialCash: number;
    balance: number;
}

const topProducts: TopProduct[] = [
  { name: 'Coca Cola 600ml', sold: 84, revenue: '$126.00', barFrom: 'from-indigo-400', barTo: 'to-indigo-500', barHoverFrom: 'group-hover:from-indigo-500', barHoverTo: 'group-hover:to-indigo-600' },
  { name: 'Hamburguesa Clásica', sold: 52, revenue: '$364.00', barFrom: 'from-emerald-400', barTo: 'to-emerald-500', barHoverFrom: 'group-hover:from-emerald-500', barHoverTo: 'group-hover:to-emerald-600' },
  { name: 'Papas Fritas Grande', sold: 47, revenue: '$141.00', barFrom: 'from-amber-400', barTo: 'to-amber-500', barHoverFrom: 'group-hover:from-amber-500', barHoverTo: 'group-hover:to-amber-600' },
  { name: 'Agua Cristal 500ml', sold: 41, revenue: '$41.00', barFrom: 'from-pink-400', barTo: 'to-pink-500', barHoverFrom: 'group-hover:from-pink-500', barHoverTo: 'group-hover:to-pink-600' },
  { name: 'Pizza Pepperoni', sold: 38, revenue: '$342.00', barFrom: 'from-sky-400', barTo: 'to-sky-500', barHoverFrom: 'group-hover:from-sky-500', barHoverTo: 'group-hover:to-sky-600' },
];

const recentOrders: RecentOrder[] = [
  { id: '#0034', client: 'María López', total: '$85.50', method: 'Efectivo', time: 'Hace 5 min', status: 'success' },
  { id: '#0033', client: 'Carlos Rivas', total: '$142.00', method: 'Tarjeta', time: 'Hace 12 min', status: 'success' },
  { id: '#0032', client: 'Ana Martínez', total: '$67.25', method: 'Transferencia', time: 'Hace 18 min', status: 'success' },
  { id: '#0031', client: 'José Hernández', total: '$210.00', method: 'Crédito', time: 'Hace 25 min', status: 'warning' },
  { id: '#0030', client: 'Laura Gómez', total: '$53.75', method: 'Efectivo', time: 'Hace 32 min', status: 'success' },
];

const cashDrawers: CashDrawer[] = [
  { name: 'Caja 1', employee: 'María López', status: 'open', opening: '8:00 AM', orders: 22, salesTotal: 1580.50, expensesTotal: 180.00, inicialCash: 300.00, balance: 1700.50 },
  { name: 'Caja 2', employee: 'Carlos Rivas', status: 'open', opening: '9:30 AM', orders: 12, salesTotal: 878.00, expensesTotal: 140.00, inicialCash: 200.00, balance: 938.00 },
];

export function DashboardTables() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent Orders */}
        <div
          className="lg:col-span-2 bg-bg-content rounded-xl shadow-sm border border-bg-subtle hover:shadow-md transition-shadow duration-300"
        >
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
                {recentOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="hover:bg-bg-subtle/30 transition-colors duration-200"
                  >
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
          <div
            className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-base font-semibold text-text-base mb-4">Productos Más Vendidos</h3>
            <div className="space-y-3">
              {topProducts.map((product, index) => {
                const maxSold = topProducts[0].sold;
                const barWidth = Math.round((product.sold / maxSold) * 100);
                return (
                  <div
                    key={product.name}
                    className="group"
                  >
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
          <div
            className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle p-5 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text-base">Cajas Abiertas</h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                {cashDrawers.length} activa{cashDrawers.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-3">
              {cashDrawers.map((drawer, i) => (
                <div
                  key={drawer.name}
                  className="rounded-lg border border-bg-subtle p-3 hover:bg-bg-subtle/20 transition-colors duration-200"
                >
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
    )
}
