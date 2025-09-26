'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";


export default function Page() {
  const { data: session, status } = useSession();


  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Gastos" />

    </div>
    <div className="col-span-3">

    </div> 
</div>
  );
}
