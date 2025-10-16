'use client'

import { ViewTitle } from "@/components/ViewTitle";



export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-4 border-r md:border-primary">
          <ViewTitle text="Detalles de la factura" />
          { id }
      </div>
      <div className="col-span-6">
          <ViewTitle text="Detalles" />
      </div> 
    </div>
  );
}