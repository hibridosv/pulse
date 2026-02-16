import { getTotalPercentage } from "@/lib/utils";

export const sumarTotalesWithoutDiscount = (datos: any): number => {
  let totalSuma = 0;
  let totalDiscount = 0;

  datos?.forEach((elemento: any) => {
    totalSuma += elemento.total ?? 0;
    totalDiscount += elemento.discount ?? 0;
  });

  return totalDiscount + totalSuma;
}

export const sumarDiscount = (datos: any): number => {
  let totalSuma = 0;

  datos?.forEach((elemento: any) => {
    totalSuma += elemento.discount ?? 0;
  });

  return totalSuma;
}

export const commissionTotal = (records: any): number => {
  let commission = 0;

  records?.forEach((element: any) => {
    commission += getTotalPercentage(element?.subtotal, element?.commission);
  });

  return commission;
}

export const sumarTotales = (datos: any): number => {
  let totalSuma = 0;

  datos?.forEach((elemento: any) => {
    totalSuma += elemento.total ?? 0;
  });

  return totalSuma;
}

export const sumarSubtotal = (datos: any): number => {
  let totalSuma = 0;

  datos?.forEach((elemento: any) => {
    totalSuma += elemento.subtotal ?? 0;
  });

  return totalSuma;
}

export const sumarCantidad = (datos: any): number => {
  let totalSuma = 0;

  datos?.forEach((elemento: any) => {
    totalSuma += elemento.quantity ?? 0;
  });

  return totalSuma;
}

export const sumarSalesTotal = (records: any): number => {
  const total = sumarTotales(records?.invoiceproducts);
  const subtotal = sumarSubtotal(records?.invoiceproducts);

  if (records?.client?.taxpayer_type == 2 && subtotal >= 100) { // gran contribuyente
    const retention = subtotal * 0.01;
    return (total - retention)
  }

  if (records?.invoice_assigned?.type == 4) { // sujeto excluido
    const retention = sumarTotalRetentionSujetoExcluido(records);
    return (total - retention)
  }
  return total;
}

export const sumarTotalRetentionRenta = (datos: any): number => {
  let totalSuma = 0;

  datos?.invoiceproducts?.forEach((elemento: any) => {
    if (elemento.operation_type == 1 && elemento.product_type == 2) {
      totalSuma += elemento.subtotal ?? 0;
    }
  });

  return totalSuma * 0.10;
}

export const sumarTotalRetentionSujetoExcluido = (datos: any): number => {
  let totalSuma = 0;

  datos?.invoiceproducts?.forEach((elemento: any) => {
    if (datos?.invoice_assigned?.type == 4) { // sujeto excluido
      if (elemento.operation_type == 1 && elemento.product_type == 2) {
        totalSuma += elemento.total ?? 0;
      }
    } else {
      totalSuma += elemento.total ?? 0;
    }
  });

  return totalSuma * 0.10;
}

function groupInvoiceProducts(products: any[], filterFn: (product: any) => boolean) {
  const grouped = {} as any;

  products.forEach((product: any) => {
    const { cod, quantity, subtotal, total } = product;

    if (filterFn(product)) {
      if (!grouped[cod]) {
        grouped[cod] = { ...product };
      } else {
        grouped[cod].quantity += quantity;
        grouped[cod].subtotal += subtotal;
        grouped[cod].total += total;
      }
    }
  });

  const result = Object.values(grouped);
  result.sort((a: any, b: any) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return result;
}

export function groupInvoiceProductsByCodSpecial(order: any) {
  return groupInvoiceProducts(
    order.invoiceproducts,
    (product: any) => product.special == 1 && product.group_by == null
  );
}

export function groupInvoiceProductsByCodAll(order: any) {
  order.invoiceproductsGroup = groupInvoiceProducts(
    order.invoiceproducts,
    (product: any) => product.special == 0
  );
  return order;
}

export function isProductPendientToSend(product: any) {
  if (!product) return false;
  const sendPrint = product?.attributes?.send_print;
  const isValidPrintStatus = [1, 2, 3].includes(sendPrint ?? -1);
  return product.attributes && product.attributes.work_station_id && isValidPrintStatus;
}

export function countSendPrintZero(order: any) {
  if (!order?.invoiceproducts) return 0;
  console.log("countSendPrintZero", order?.invoiceproducts);
  return order.invoiceproducts.filter(
    (product: any) => product.attributes?.work_station_id && product.attributes?.send_print === 0
  ).length;
}
