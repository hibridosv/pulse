import { formatDuiWithAll, getCountryProperty, numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import { sumarDiscount, sumarSalesTotal, sumarSubtotal, sumarTotalesWithoutDiscount, sumarTotalRetentionRenta, sumarTotalRetentionSujetoExcluido } from "../utils";


export function RestaurantShowTotal() {
  const { order, sending} = ordersProductsStore();
  const { system } =useConfigStore();


  if (!order) return <></>
  const retentionSujetoExcluido = sumarTotalRetentionSujetoExcluido(order);
  const retentionRenta: number = sumarTotalRetentionRenta(order);


//   const total = sumarCantidad(order?.invoiceproducts);
  const subtotal: number = sumarTotalesWithoutDiscount(order?.invoiceproducts);
  const discount: number = sumarDiscount(order?.invoiceproducts);
  const tips_percentage: number = order?.attributes?.tips_percentage ?? 0;


    const isExcludedClient = order?.client?.excluded == 1;
    const retencionRentas = order?.retention_rent ?? 0 ;

  
    const total: number = isExcludedClient
      ? sumarSubtotal(order.invoiceproducts)
      : (retencionRentas > 0
          ? (sumarSalesTotal(order) - retentionRenta)
          : sumarSalesTotal(order));

    return (
        <div className="p-2 mt-4 w-full">
            <div className="rounded-lg border-2 uppercase">
                <div className={`flex justify-between ${sending && 'text-red-800 animate-pulse'}`}>
                    <div className="w-full text-sm items-center pl-4 text-left">Sub total</div>
                    <div className="w-full text-sm items-center flex pr-4 justify-end">
                        { numberToMoney(subtotal, system)}
                    </div>
                </div>

                <div className={`flex justify-between ${sending && 'text-red-800 animate-pulse'}`}>
                    <div className="w-full text-sm items-center pl-4 text-left">Descuento</div>
                    <div className="w-full text-sm items-center flex pr-4 justify-end">
                        { numberToMoney(discount, system)}
                    </div>
                </div>

            { tips_percentage > 0 &&
                <div className={`flex justify-between ${sending && 'text-red-800 animate-pulse'}`}>
                    <div className="w-full text-sm items-center pl-4 text-left">Propina | { tips_percentage } %</div>
                    <div className="w-full text-sm items-center flex pr-4 justify-end">
                        { numberToMoney((tips_percentage / 100 * total), system)}
                    </div>
                </div>
            }

            <div className={`flex justify-between ${sending && 'text-red-800 animate-pulse'}`}>
                    <div className="w-full  font-bold text-2xl items-center pl-4 text-left">Total</div>
                    <div className="w-full  font-bold text-2xl items-center flex pr-4 justify-end">
                        { numberToMoney(total + (tips_percentage / 100 * total), system)}
                    </div>
                </div>
            </div>

            {order?.client?.name && (
            <div className="flex justify-between"> 
                <span className="text-text-muted">Cliente:</span>
                <div className="text-right">
                <span className="font-semibold text-text-base">{order.client.name}</span>
                <span className="block text-xs text-text-muted">{order.client.document ? formatDuiWithAll(order.client.document) : formatDuiWithAll(order.client.id_number)}</span>
                </div>
            </div>
            )}

        {order?.comment && (
            <div className="border-t border-bg-subtle pt-3"> 
            <p className="text-sm">
                <span className="font-semibold text-text-muted">Nota: </span>
                <span className="text-text-base">{order.comment}</span>
            </p>
            </div>
        )}


      <div className="space-y-2 text-sm">
        {order?.invoice_assigned?.type === 4 && retentionSujetoExcluido > 0 && (
          <div className="rounded-md bg-danger/10 p-2 text-center font-semibold text-danger">
            Retención Sujeto Excluido: {getCountryProperty(parseInt(system?.country)).currency} {retentionSujetoExcluido.toFixed(2)}
          </div>
        )}
        
        {(order?.retention_rent ?? 0) > 0 && retentionRenta > 0 && (
          <div className="rounded-md bg-danger/10 p-2 text-center font-semibold text-danger">
            Retención Renta: {getCountryProperty(parseInt(system?.country)).currency} {retentionRenta.toFixed(2)}
          </div>
        )}
      </div>


        </div>
    );

}
