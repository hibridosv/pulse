'use client';
import { Button, Preset } from "@/components/button/button";
import { DateRangeValues } from "@/components/button/DateRange";
import { LinksList } from "@/components/button/LinkList";
import { InvoicingCorrelativeTable } from "@/components/invoicing/InvoicingCorrelativeTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useInvoiceTypesLogic } from "@/hooks/invoicing/useInvoiceTypesLogic";
import { useInvoicingLogic } from "@/hooks/invoicing/useInvoicingLogic";
import { useRecalculateYearsLogic } from "@/hooks/invoicing/useRecalculateYearsLogic";
import { useDownloadLink } from "@/hooks/useDownloadLink";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function Page() {
  const { history, handleGet, loading } = useInvoicingLogic('documents/correlatives', 'excel/invoices/documents/', false);
  const { invoiceTypes, loading: loadingFields} =  useInvoiceTypesLogic();
  const { years, months, currentYear, currentMonth } =  useRecalculateYearsLogic();
  const isSending = loading.history ?? false; 
  const isLoadingField = loadingFields.invoiceTypes ?? false; 
  const { register, handleSubmit } = useForm();
  const { links, addLink} = useDownloadLink()
  const [invoiceId, setinvoiceId] = useState("");


    const handleFormSubmit = async (data: DateRangeValues) => { 
        await handleGet(data, 'documents/correlatives', 'excel/invoices/documents/');
        addLink(data, 'excel/invoices/correlatives/', [{name: "invoiceId", value: data.invoiceId}, {name: "year", value: data.year}, {name: "month", value: data.month}], 2, "Descargar Excel");
        addLink(data, 'pdf/invoices/correlatives/', [{name: "invoiceId", value: data.invoiceId}, {name: "year", value: data.year}, {name: "month", value: data.month}], 2, "Descargar PDF");
        setinvoiceId(data.invoiceId)

    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Reporte de correlativo de documentos" />
        <div className="p-4">
          <InvoicingCorrelativeTable records={history} isLoading={isSending} invoiceId={invoiceId} />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mx-2 px-4">
           
          <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
            <div className="flex flex-col gap-4 pt-4">
              <div>
                <label htmlFor="invoiceId" className="block text-sm font-medium leading-6 text-text-muted">
                  Seleccione el tipo de documento
                </label>
                <div className="mt-1">
                  <select id="invoiceId" {...register("invoiceId")} className="input-select" disabled={isLoadingField}>
                    {isLoadingField ? (
                      <option>Cargando...</option>
                    ) : (
                      <>
                        <option value="">Seleccione</option>
                        {invoiceTypes?.map((value: any) => (
                          <option key={value.id} value={value.id}>{value.name}</option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="month" className="block text-sm font-medium leading-6 text-text-muted">
                    Mes
                  </label>
                  <div className="mt-1">
                    <select defaultValue={currentMonth} id="month" {...register("month")} className="input-select">
                      {months?.map((value: any) => (
                        <option key={value.id} value={value.id}>{value.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium leading-6 text-text-muted">
                    Año
                  </label>
                  <div className="mt-1">
                    {years.length > 0 ? (
                      <select defaultValue={currentYear} id="year" {...register("year")} className="input-select">
                        {years?.map((value: any) => (
                          <option key={value.id} value={value.id}>{value.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="input-disabled py-2 px-4">Cargando...</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex justify-center">
                <Button text="Aplicar" type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
              </div>
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