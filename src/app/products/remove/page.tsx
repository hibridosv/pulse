'use client'

import { Button, Preset } from "@/components/button/button";
import { LoadingPage } from "@/components/LoadingPage";
import { LastRegistersTable } from "@/components/products/remove/LastRegistersTable";
import { ProductsRegistersTable } from "@/components/products/remove/ProductsRegistersTable";
import { RemoveInitialForm } from "@/components/products/remove/RemoveInitialForm";
import { RemoveProductsForm } from "@/components/products/remove/RemoveProductsForm";
import { RemoveProductsSearch } from "@/components/products/remove/RemoveProductsSearch";
import { ViewTitle } from "@/components/ViewTitle";
import { useProductRemoveLogic } from "@/hooks/products/useProductRemoveLogic";
import { useSession } from "next-auth/react";


export default function Page() {
  const { data: session, status } = useSession();
  useProductRemoveLogic();

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-4 border-r md:border-primary">
          <ViewTitle text="Descontar Producto" />
          <RemoveInitialForm  />
          <RemoveProductsForm />
          <RemoveProductsSearch />
      </div>
      <div className="col-span-6">
          <ViewTitle text="Ultimos Registros" />
          <div className="p-4">
            <LastRegistersTable />
            <ProductsRegistersTable />
          </div>
      </div> 
    </div>
  );
}