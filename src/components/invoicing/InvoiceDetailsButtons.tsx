import { useInvoiceFnLogic } from "@/hooks/invoicing/useInvoiceFnLogic";
import useConfigStore from "@/stores/configStore";
import useToastMessageStore from "@/stores/toastMessageStore";
import { FaPrint } from "react-icons/fa";
import { MdCreditScore } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ButtonDownload } from "../button/button-download";


export interface InvoiceDetailsButtonsI {
  order: any;
}



export function InvoiceDetailsButtons(props: InvoiceDetailsButtonsI) {
    const { order } = props;
    const { system, activeConfig } = useConfigStore();
  const isCreditNoteAvailable = (order?.invoice_assigned?.type == 3 || order?.invoice_assigned?.type == 2); 
  const isDeleted = order?.status == 3;
  const { setMessage, setError } = useToastMessageStore();
  const { printOrder, sending} = useInvoiceFnLogic();
  const isSending = sending.printing ?? false;
    
  if (!order) return null;


  return (
            <div className="bg-bg-content border border-bg-subtle rounded-lg p-4">
              <div className="flex items-center justify-center gap-8">

                { activeConfig && activeConfig.includes("print-link") ? (
                  <ButtonDownload
                    autoclass={false} 
                    href={`download/pdf/invoice/${order?.id}`}
                    style="flex flex-col items-center justify-center gap-1 text-text-muted hover:text-blue-600 transition-colors duration-200 clickeable"
                  >
                    <div className="p-3 bg-bg-subtle rounded-full">
                      <FaPrint size={28} />
                    </div>
                    <span className="text-xs font-medium">Imprimir</span>
                  </ButtonDownload>
                ) : (
                  <button
                    title="Imprimir"
                    disabled={isSending}
                    onClick={() => printOrder(order?.id)}
                    className="flex flex-col items-center justify-center gap-1 text-text-muted hover:text-blue-600 transition-colors duration-200 clickeable"
                  >
                    <div className="p-3 bg-bg-subtle rounded-full">
                      <FaPrint size={28} />
                    </div>
                    <span className="text-xs font-medium">Imprimir</span>
                  </button>
                )}

                {!isCreditNoteAvailable && (
                  <button
                    title="Crear nota de crédito"
                    onClick={() => {
                      if (isDeleted) {
                        setError({ message: "Este documento ya se encuentra eliminado" });
                      } else {
                        setError({ message: "Mostrando modal" }); // Placeholder for modal logic
                      }
                    }}
                    disabled={isDeleted || isSending}
                    className="flex flex-col items-center justify-center gap-1 text-text-muted hover:text-sky-600 disabled:text-text-muted/50 disabled:cursor-not-allowed transition-colors duration-200 clickeable"
                  >
                    <div className="p-3 bg-bg-subtle rounded-full">
                      <MdCreditScore size={28} />
                    </div>
                    <span className="text-xs font-medium">Nota C.</span>
                  </button>
                )}

                <button
                  title="Anular orden"
                  onClick={() => {
                    if (isDeleted) {
                      setError({ message: "Este documento ya se encuentra eliminado" });
                    } else {
                      setError({ message: "Mostrando modal" }); // Placeholder for modal logic
                    }
                  }}
                  disabled={isDeleted || isSending}
                  className="flex flex-col items-center justify-center gap-1 text-text-muted hover:text-danger disabled:text-text-muted/50 disabled:cursor-not-allowed transition-colors duration-200 clickeable"
                >
                  <div className="p-3 bg-bg-subtle rounded-full">
                    <RiDeleteBin2Line size={28} />
                  </div>
                  <span className="text-xs font-medium">Anular</span>
                </button>
              </div>
            </div>
  )
}