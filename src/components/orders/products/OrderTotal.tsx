
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

  const amountStyle = `text-7xl font-semibold text-center mt-1 ${sending ? 'animate-pulse text-text-muted' : 'text-text-base'}`;

  const total = isExcludedClient 
    ? sumarSubtotal(order.invoiceproducts).toFixed(2) 
    : (retencionRenta > 0 
        ? (sumarSalesTotal(order) - sumarTotalRetentionRenta(order)).toFixed(2) 
        : sumarSalesTotal(order).toFixed(2));

  return (
    <div className={`w-full my-4 p-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle ${sending ? 'animate-pulse' : ''}`}>
      <div className="text-center text-sm font-semibold text-text-muted uppercase tracking-wider">
        Total
      </div>
      <div className={amountStyle}>
        {getCountryProperty(parseInt(system?.country)).currency} {total}
      </div>
    </div>
    );
}
