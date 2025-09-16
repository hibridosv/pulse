'use client'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useDashBoardStore from '@/stores/dashboardStore';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const options = {
  responsive: true,
  maintainAspectRatio: false, // Clave para que la altura sea flexible
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

interface DaysOfWeek {
    label: string;
    value: number;
}

export function CharBarWeek(){
    const { chartWeek, loading } = useDashBoardStore();

  if (loading) return <div className="bg-gray-200 rounded-lg animate-pulse h-full w-full"></div>
  if (!chartWeek) return null;
  
  const data = {
    labels: chartWeek.map((item: DaysOfWeek) => item.label),
    datasets: [
      {
        label: 'Ventas de la semana',
        data: chartWeek.map((item: DaysOfWeek) => item.value),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };

  return (
    <div className="relative h-full w-full">
        <Bar options={options} data={data} />
    </div>
  )
}