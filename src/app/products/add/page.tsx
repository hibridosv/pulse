'use client';

import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { LoadingPage } from "@/components/LoadingPage";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();


  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-5 border-r md:border-primary">
        <ViewTitle text="Registrar Producto" />
    </div>
    <div className="col-span-5">
        <ViewTitle text="Ultimos Producto" />
    </div> 
    <ToasterMessage />
</div>
  );
}
