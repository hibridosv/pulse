
'use client'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useDashBoardStore from '@/stores/dashboardStore';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};


interface DaysOfWeek {
    hour: string;
    total_sales: number;
}



export function CharBarDay(){
    const { chartDay, loading } = useDashBoardStore();


  
  if (loading) return null;
  if (!chartDay) return null;
  
  const data = {
    labels: chartDay.map((item: DaysOfWeek) => item.hour),
    datasets: [
      {
        label: 'MOVIMIENTOS DEL DIA',
        data: chartDay.map((item: DaysOfWeek) => item.total_sales),
        backgroundColor: 'rgba(64, 212, 50, 0.5)',
      }
    ],
  };

  return <Bar options={options} data={data} height={50}  />

}
