'use client'

import { Button, Preset } from "@/components/button/button";
import { InvoiceDetails } from "@/components/invoicing/InvoiceDetails";
import { ViewTitle } from "@/components/ViewTitle";
import { useInvoiceDetailsLogic } from "@/hooks/invoicing/useInvoiceDetailsLogic";
import useConfigStore from "@/stores/configStore";
import { useRouter } from "next/navigation";



export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { system, activeConfig } = useConfigStore();
  const { order, loading } = useInvoiceDetailsLogic(id, true);
  const isLoading = loading.getOrder ?? false;
  const showCodeStatus = activeConfig && activeConfig.includes("sales-show-code");
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-7 border-r md:border-primary">
          <ViewTitle text="Detalles de la factura" />
          <InvoiceDetails isLoading={isLoading} order={order} onElectronic={false} />
      </div>
      <div className="col-span-3">
          <ViewTitle text="Detalles" />
          <div className="w-full p-4 flex justify-end">
            <Button text="Regresar" preset={Preset.back} onClick={() => router.back()} />   
          </div>  
      </div> 
    </div>
  );
}