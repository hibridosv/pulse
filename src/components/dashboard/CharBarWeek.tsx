
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
    label: string;
    value: number;
}



export function CharBarWeek(){
    const { chartWeek, loading } = useDashBoardStore();


  if (loading) return <></>
  if (!chartWeek) return null;
  
  const data = {
    labels: chartWeek.map((item: DaysOfWeek) => item.label),
    datasets: [
      {
        label: 'Dias de la semana',
        data: chartWeek.map((item: DaysOfWeek) => item.value),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };

  return <Bar options={options} data={data}  />

}
