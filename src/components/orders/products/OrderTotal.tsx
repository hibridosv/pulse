
import { getCountryProperty } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import ordersProductsStore from "@/stores/orders/ordersProductsStore";
import { sumarSalesTotal, sumarSubtotal, sumarTotalRetentionRenta } from "../utils";



export function OrderTotal() {
  const { order, sending } = ordersProductsStore();
  const { system } = useConfigStore();
  const isExcludedClient = order?.client?.excluded == 1;
  const retencionRenta = order?.retention_rent ?? 0 ;

  if (!order?.invoiceproducts || order.invoiceproducts.length === 0) {
    return null;
  }

  const total = isExcludedClient
    ? sumarSubtotal(order.invoiceproducts).toFixed(2)
    : (retencionRenta > 0
        ? (sumarSalesTotal(order) - sumarTotalRetentionRenta(order)).toFixed(2)
        : sumarSalesTotal(order).toFixed(2));

  return (
    <div className={`relative w-full my-4 overflow-hidden rounded-xl bg-bg-content transition-all duration-500 ${
      sending
        ? 'border border-primary/25 shadow-xl shadow-primary/10'
        : 'border border-bg-subtle shadow-sm'
    }`}>
      <div className={`h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500 ${sending ? 'opacity-100' : 'opacity-30'}`} />

      <div className="px-5 pt-4 pb-5">
        <div className={`text-center text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${sending ? 'text-primary' : 'text-text-muted'}`}>
          Total
        </div>

        <div className="relative mt-1">
          <div className={`flex items-start justify-center transition-all duration-500 ${sending ? 'text-primary/60' : 'text-text-base'}`}>
            <span className="text-2xl font-semibold mt-3 mr-1">
              {getCountryProperty(parseInt(system?.country)).currency}
            </span>
            <span className="text-7xl font-bold tabular-nums tracking-tight">
              {total}
            </span>
          </div>

          {sending && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-y-0 -inset-x-full bg-gradient-to-r from-transparent via-bg-content/60 to-transparent animate-shimmer" />
            </div>
          )}
        </div>
      </div>
    </div>
    );
}
