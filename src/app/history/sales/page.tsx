'use client';
import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { ViewTitle } from "@/components/ViewTitle";
import { urlConstructor } from "@/lib/utils";


export default function Page() {

    const handleFormSubmit = async (values: DateRangeValues) => { 
        let url = urlConstructor(values, `histories/sales`)
        // await loadKardex(url);
        console.log(url)
    }
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Historial de ventas" />

    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
            <DateRange onSubmit={handleFormSubmit} loading={false} />
          </div>
    </div> 
</div>
  );
}
