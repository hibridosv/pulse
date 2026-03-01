'use client';

import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { DashboardDetailCards } from '@/components/dashboard/DashboardDetailCards';
import { DashboardHourlySalesChart } from '@/components/dashboard/DashboardHourlySalesChart';
import { DashboardKpiCards } from '@/components/dashboard/DashboardKpiCards';
import { DashboardTables } from '@/components/dashboard/DashboardTables';
import { ViewTitle } from '@/components/ViewTitle';


export default function DashboardPage() {
  return (
    <div className="bg-bg-base min-h-screen pb-8">
      <ViewTitle text="Dashboard" />

      <div className="px-3 sm:px-5 space-y-5">
        <DashboardKpiCards />
        <DashboardCharts />
        <DashboardHourlySalesChart />
        <DashboardDetailCards />
        <DashboardTables />
      </div>
    </div>
  );
}
