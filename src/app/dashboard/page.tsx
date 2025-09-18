'use client';

import { useSession, signOut } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { useConfigLogic } from "@/hooks/config/useConfigLogic";
import { ViewTitle } from "@/components/ViewTitle";
import { PrincipalInfo } from "@/components/dashboard/PrincipalInfo";
import { CharBarWeek } from "@/components/dashboard/CharBarWeek";
import { CharBarDay } from "@/components/dashboard/CharBarDay";
import { useDashBoardLogic } from "@/hooks/config/useDashBoardLogic";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  useConfigLogic(); // carga todas las configuraciones necesarias
  useDashBoardLogic();
  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
              <div className="col-span-6 border-r md:border-sky-600">
                <div className="flex justify-between">
                  <ViewTitle text='PANEL PRINCIPAL' />
                  
                </div>

                <PrincipalInfo  />
              </div>
              <div className="col-span-4">
                <ViewTitle text='VENTAS DE LA SEMANA' />
                <div className='w-full h-96 px-4'>
                  <CharBarWeek />
                </div>
              </div>
            </div>
            <div className='border-t-2 border-teal-500 m-4 h-80'>
                <CharBarDay />
            </div>
          </div>
  );
}