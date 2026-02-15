
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
    <div className="relative w-full overflow-hidden rounded-lg bg-bg-subtle/30 py-4">
      <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500 ${sending ? 'opacity-100' : 'opacity-0'}`} />

      <div className={`text-center text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${sending ? 'text-primary' : 'text-text-muted'}`}>
        Total
      </div>

      <div className="relative mt-1">
        <div className={`flex items-baseline justify-center gap-1 transition-colors duration-300 ${sending ? 'text-primary' : 'text-text-base'}`}>
          <span className="text-lg font-semibold">
            {getCountryProperty(parseInt(system?.country)).currency}
          </span>
          <span className="text-5xl font-bold tabular-nums tracking-tight">
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
  );
}
