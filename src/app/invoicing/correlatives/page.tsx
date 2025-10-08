'use client';
import { Button, Preset } from "@/components/button/button";
import { DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { InvoicingListTable } from "@/components/invoicing/InvoicingListTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useInvoiceTypesLogic } from "@/hooks/invoicing/useInvoiceTypesLogic";
import { useInvoicingLogic } from "@/hooks/invoicing/useInvoicingLogic";
import { useRecalculateYearsLogic } from "@/hooks/invoicing/useRecalculateYearsLogic";
import { useForm } from "react-hook-form";


export default function Page() {
  const { history, handleGet, loading, links } = useInvoicingLogic('documents', 'excel/invoices/documents/');
  const { invoiceTypes, loading: loadingFields} =  useInvoiceTypesLogic();
  const { years, months, currentYear, currentMonth } =  useRecalculateYearsLogic();
  const isSending = loading.history ?? false; 
  const isLoadingField = loadingFields.invoiceTypes ?? false; 
  const { register, handleSubmit } = useForm();


    const handleFormSubmit = async (values: DateRangeValues) => { 
        await handleGet(values, 'documents', 'excel/invoices/documents/');
    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Reporte de correlativo de documentos" />
        <div className="p-4">
          <InvoicingListTable records={history} isLoading={false} />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mx-2 px-4">
           
          <form onSubmit={console.log} className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-2">
                    <label htmlFor="invoiceId" className="input-label"> Seleccione el tipo de documento </label>
                    <select defaultValue={1} id="invoiceId" {...register("invoiceId")} className="input-select">
                        <option value=""> Seleccione</option>
                        {invoiceTypes && invoiceTypes?.map((value: any) => {
                          return (
                            <option key={value.id} value={value.id}> {value.name}</option>
                          );
                        })}
                    </select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="month" className="input-label"> Mes </label>
                    <select defaultValue={currentMonth} id="month" {...register("month")} className="input-select">
                        {months && months?.map((value: any) => {
                          return (
                            <option key={value.id} value={value.id}> {value.name}</option>
                          );
                        })}
                    </select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-2">
                    <label htmlFor="year" className="input-label"> Año </label>
                    {years.length > 0 ?
                    <select defaultValue={currentYear} id="year" {...register("year")} className="input-select">
                        {years && years?.map((value: any) => {
                          return (
                            <option key={value.id} value={value.id}> {value.name}</option>
                          );
                        })}
                    </select>
                    : <div className="input">Cargando ...</div>
                    }
                </div>
                </div>
                <div className="flex justify-center mb-2">
                    <Button type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
                </div>
                
              </form>

          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAS" />
          </div>
    </div> 
</div>
  );
}
