'use client'
import useDashBoardStore from '@/stores/dashboardStore'
import { useEffect } from 'react'

interface DayOfWeek {
  label: string;
  value: number;
}

interface PayMethod {
  label: string;
  value: string | number;
}

const doughnutColors = [
  'rgba(16, 185, 129, 0.75)',
  'rgba(59, 130, 246, 0.75)',
  'rgba(245, 158, 11, 0.75)',
  'rgba(239, 68, 68, 0.70)',
  'rgba(139, 92, 246, 0.75)',
  'rgba(236, 72, 153, 0.70)',
  'rgba(107, 114, 128, 0.65)',
]

const doughnutHoverColors = [
  'rgba(16, 185, 129, 0.95)',
  'rgba(59, 130, 246, 0.95)',
  'rgba(245, 158, 11, 0.95)',
  'rgba(239, 68, 68, 0.90)',
  'rgba(139, 92, 246, 0.95)',
  'rgba(236, 72, 153, 0.90)',
  'rgba(107, 114, 128, 0.85)',
]

export function useDashboardChartsLogic() {
  const { chartWeek, chartLastWeek, payMethods, loading, loadChardWeek, loadChartLastWeek, loadPayMethods } = useDashBoardStore()

  useEffect(() => {
    loadChardWeek()
    loadChartLastWeek()
    loadPayMethods()
  }, [loadChardWeek, loadChartLastWeek, loadPayMethods])

  const hasWeekData = Array.isArray(chartWeek) && chartWeek.length > 0
  const hasPayData = Array.isArray(payMethods) && payMethods.length > 0

  const weeklySalesData = hasWeekData ? {
    labels: chartWeek.map((item: DayOfWeek) => item.label),
    datasets: [
      {
        label: 'Ventas',
        data: chartWeek.map((item: DayOfWeek) => item.value),
        backgroundColor: 'rgba(99, 102, 241, 0.65)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(99, 102, 241, 0.85)',
      },
      {
        label: 'Semana Anterior',
        data: Array.isArray(chartLastWeek) ? chartLastWeek.map((item: DayOfWeek) => item.value) : [],
        backgroundColor: 'rgba(226, 232, 240, 0.7)',
        borderColor: 'rgba(203, 213, 225, 1)',
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(203, 213, 225, 0.9)',
      },
    ],
  } : null

  const paymentMethodsData = hasPayData ? {
    labels: payMethods.map((item: PayMethod) => item.label),
    datasets: [
      {
        data: payMethods.map((item: PayMethod) => parseFloat(String(item.value).replace(/,/g, '')) || 0),
        backgroundColor: payMethods.map((_: any, i: number) => doughnutColors[i % doughnutColors.length]),
        hoverBackgroundColor: payMethods.map((_: any, i: number) => doughnutHoverColors[i % doughnutHoverColors.length]),
        borderWidth: 0,
      },
    ],
  } : null

  return { weeklySalesData, paymentMethodsData, loading, hasWeekData, hasPayData }
}
