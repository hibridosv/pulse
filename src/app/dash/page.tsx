'use client';

import { ViewTitle } from "@/components/ViewTitle";
import { CharBarDay } from "@/components/dashboard/CharBarDay";
import { CharBarWeek } from "@/components/dashboard/CharBarWeek";
import { PrincipalInfo } from "@/components/dashboard/PrincipalInfo";
import { useDashBoardLogic } from "@/hooks/config/useDashBoardLogic";

export default function DashboardPage() {
  useDashBoardLogic();


  return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
              <div className="col-span-1 md:col-span-6 md:border-r md:border-primary">
                <div className="flex justify-between">
                  <ViewTitle text='PANEL PRINCIPAL' />
                </div>
                <PrincipalInfo  />
              </div>
              <div className="col-span-1 md:col-span-4">
                <ViewTitle text='VENTAS DE LA SEMANA' />
                <div className='w-full h-64 sm:h-80 md:h-96 px-2 sm:px-4'>
                  <CharBarWeek />
                </div>
              </div>
            </div>
            <div className='border-t-2 border-bg-subtle m-2 sm:m-4 h-60 sm:h-72 md:h-80'>
                <CharBarDay />
            </div>
          </div>
  );
}