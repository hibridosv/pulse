'use client'

import { LoadingPage } from "@/components/LoadingPage";
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";


export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingPage />;
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-7 border-r md:border-primary">
          <ViewTitle text="Descontar Producto" />
      </div>
      <div className="col-span-3">

      </div> 
    </div>
  );
}