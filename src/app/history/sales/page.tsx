'use client';
import { ViewTitle } from "@/components/ViewTitle";


export default function Page() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Historial de ventas" />

    </div>
    <div className="col-span-3">

    </div> 
</div>
  );
}
