'use client'

import { Button, Preset } from "@/components/button/button";
import { InvoiceDetails } from "@/components/invoicing/InvoiceDetails";
import { InvoiceDetailsButtons } from "@/components/invoicing/InvoiceDetailsButtons";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useInvoiceDetailsLogic } from "@/hooks/invoicing/useInvoiceDetailsLogic";
import { useRouter } from "next/navigation";



export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { order, loading, refetchOrder } = useInvoiceDetailsLogic(id, true);
  const isLoading = loading.getOrder ?? false;
  const router = useRouter();


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-7 border-r md:border-primary">
          <ViewTitle text="Detalles de la factura" />
          <InvoiceDetails isLoading={isLoading} order={order} onElectronic={false} />
      </div>
      <div className="col-span-3">
          <ViewTitle text="Detalles" />
          <div className="w-full p-4">
            <InvoiceDetailsButtons order={order} onUpdate={refetchOrder} />
          </div>
          <div className="w-full p-4 flex justify-end">
            <Button text="Regresar" preset={Preset.back} onClick={() => router.back()} />   
          </div>  
      </div> 
      <ToasterMessage />
    </div>
  );
}