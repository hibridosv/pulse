'use client'
import useDashBoardStore from '@/stores/dashboardStore'
import { useEffect } from 'react'

interface DayData {
  hour: string;
  total_sales: string;
}

export function useDashboardHourlyLogic() {
  const { chartDay, loading, loadChardDay } = useDashBoardStore()

  useEffect(() => {
    loadChardDay()
  }, [loadChardDay])

  const hasData = Array.isArray(chartDay) && chartDay.length > 0

  const hourlySalesData = hasData ? (() => {
    const sorted = [...chartDay].sort((a: DayData, b: DayData) => a.hour.localeCompare(b.hour))
    return {
      labels: sorted.map((item: DayData) => item.hour),
      datasets: [
        {
          label: 'Ventas por Hora',
          data: sorted.map((item: DayData) => parseFloat(item.total_sales.replace(/,/g, ''))),
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
    }
  })() : null

  return { hourlySalesData, loading, hasData }
}
