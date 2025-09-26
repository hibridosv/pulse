'use client'

import { LoadingPage } from "@/components/LoadingPage";
import { AddInitialForm } from "@/components/products/add/AddInitialForm";
import { AddProductForm } from "@/components/products/add/AddProductForm";
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";



export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingPage />;
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-4 border-r md:border-primary">
          <ViewTitle text="Agregar Producto al inventario" />
          <AddInitialForm />
          <AddProductForm />
      </div>
      <div className="col-span-6">
          <ViewTitle text="Ultima entrada" />

      </div> 
    </div>
  );
}