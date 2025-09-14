'use client';

import { useSession, signOut } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { useConfigLogic } from "@/hooks/config/useConfigLogic";
import useConfigStore from "@/stores/configStore";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { clearConfig, configurations, system, payMethods, permission, user, invoiceExist, isInvoiceExpires, role, cashdrawer, client, tenant } = useConfigStore();

  useConfigLogic();

  if (status === "loading") {
    return <LoadingPage />;
  }

  console.log("configurations ", configurations);
  console.log("system ", system);
  console.log("payMethods ", payMethods);
  console.log("permission ", permission);
  console.log("user ", user);
  console.log("invoiceExist ", invoiceExist);
  console.log("isInvoiceExpires ", isInvoiceExpires);
  console.log("role ", role);
  console.log("cashdrawer ", cashdrawer);
  console.log('Client', client);
  console.log('Tenant', tenant);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Welcome to your dashboard.</p>
        <button onClick={() => clearConfig()} className="mt-6 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Clear Config
        </button>
      </div>
    </div>
  );
}