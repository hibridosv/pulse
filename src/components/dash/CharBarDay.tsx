'use client'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useDashBoardStore from '@/stores/dashboardStore';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const options = {
  responsive: true,
  maintainAspectRatio: false, // Permitir que la altura sea flexible
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

interface DayData {
    hour: string;
    total_sales: string; // Corrected type, as it comes as a formatted string
}

export function CharBarDay(){
    const { chartDay, loading } = useDashBoardStore();

  if (loading) return <div className="bg-gray-200 rounded-lg animate-pulse h-full w-full"></div>;
  if (!Array.isArray(chartDay) || chartDay.length === 0) return null;
  
  // Sort the data by hour to ensure chronological order
  const sortedChartDay = [...chartDay].sort((a, b) => a.hour.localeCompare(b.hour));

  const data = {
    labels: sortedChartDay.map((item: DayData) => item.hour),
    datasets: [
      {
        label: 'MOVIMIENTOS DEL DIA',
        data: sortedChartDay.map((item: DayData) => parseFloat(item.total_sales.replace(/,/g, ''))),
        backgroundColor: 'rgba(64, 212, 50, 0.5)',
      }
    ],
  };

  return (
    <div className="relative h-full w-full">
        <Bar options={options} data={data} />
    </div>
  )
}