'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { RemittanceForm } from "@/components/cash/remittances/RemitancesForm";
import { RemittancesTable } from "@/components/cash/remittances/RemittancesTable";


export default function Page() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-4 border-r md:border-primary">
        <ViewTitle text="Gastos" />
        <div className="p-4">
          <RemittanceForm />
        </div>
    </div>
    <div className="col-span-6">
        <ViewTitle text="Ultimas remesas" />
        <div className="p-4">
          <RemittancesTable />
        </div>
    </div> 
</div>
  );
}
