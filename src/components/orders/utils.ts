import { getTotalPercentage } from "@/lib/utils";

export const sumarTotalesWithoutDiscount = (datos: any): number => {
  let totalSuma = 0;
  let totalDiscount = 0;
  let total = 0;

  datos?.forEach((elemento: any) => {
    if (elemento.hasOwnProperty('total')) {
      totalSuma += elemento.total;
    }
    if (elemento.hasOwnProperty('discount')) {
      totalDiscount += elemento.discount;
    }
  });
  total = totalDiscount + totalSuma;

  return total;
}

export const sumarDiscount = (datos: any): number => {
  let totalSuma = 0;

  datos?.forEach((elemento: any) => {
    if (elemento.hasOwnProperty('discount')) {
      totalSuma += elemento.discount;
    }
  });

  return totalSuma;
}

  export const commissionTotal = (records: any)=>{
    let commission = 0;
        records.forEach((element: any) => {
          let comissionPercentage = getTotalPercentage(element?.subtotal, element?.commission)
        commission = commission + comissionPercentage;
      });
    return commission;
  }

  export const sumarTotales = (datos: any): number => {
  let totalSuma = 0;

  datos?.forEach((elemento: any) => {
    if (elemento.hasOwnProperty('total')) {
      totalSuma += elemento.total;
    }
  });

  return totalSuma;
}



export const sumarSubtotal = (datos: any): number => {
  let totalSuma = 0;

  datos?.forEach((elemento: any) => {
    if (elemento.hasOwnProperty('subtotal')) {
      totalSuma += elemento.subtotal;
    }
  });

  return totalSuma;
}


export const sumarCantidad = (datos: any): number => {
  let totalSuma = 0;

  datos?.forEach((elemento: any) => {
    if (elemento.hasOwnProperty('total')) {
      totalSuma += elemento.total;
    }
  });

  return totalSuma;
}

/**
 * 
 * @param records (datos de la factura)
 * @returns 
 */
export const sumarSalesTotal = (records: any): number => {
  const total = sumarCantidad(records?.invoiceproducts);
  const subtotal = sumarSubtotal(records?.invoiceproducts);

  if (records?.client?.taxpayer_type == 2 && subtotal >= 100) { // gran contribuyente
    let retention = subtotal * 0.01;
    return (total - retention)
  }

  if (records?.invoice_assigned?.type == 4) { // sujeto excluido
    let retention = sumarTotalRetentionSujetoExcluido(records);
    return (total - retention)
  }
  return total;
}


export const sumarTotalRetentionRenta = (datos: any): number => {
  let totalSuma = 0;

  datos?.invoiceproducts?.forEach((elemento: any) => {
    if (elemento.hasOwnProperty('subtotal')) {
        if (elemento.operation_type == 1 && elemento.product_type == 2) {
          totalSuma += elemento.subtotal;
        } 
    }
  });

  return totalSuma * 0.10;
}

export const sumarTotalRetentionSujetoExcluido= (datos: any): number => {
  let totalSuma = 0;

  datos?.invoiceproducts?.forEach((elemento: any) => {
    if (elemento.hasOwnProperty('total')) {
      if (datos?.invoice_assigned?.type == 4) { // sujeto excluido
        if (elemento.operation_type == 1 && elemento.product_type ==2) {
          totalSuma += elemento.total;
        }
      } else {
        totalSuma += elemento.total;
      }
    }
  });

  return totalSuma * 0.10;
}

// agrupa los productos de restaurante para no mostrarlos individuales
export function groupInvoiceProductsByCodSpecial(invoice: any) {
  const groupedProducts = {} as any;
  let products = {} as any;

  invoice.invoiceproducts.forEach((product : any) => {
      const { cod, quantity, subtotal, total } = product;

      if (product.special == 1 && product.group_by == null) {
          if (!groupedProducts[cod]) {
            groupedProducts[cod] = { ...product };
        } else {
            groupedProducts[cod].quantity += quantity;
            groupedProducts[cod].subtotal += subtotal;
            groupedProducts[cod].total += total;
        }
      }

  });

  // Convertir el objeto en un array de productos
  products = Object.values(groupedProducts);
  products.sort((a: any, b: any) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
);
  return products;
}


// agrupa los productos de restaurante para no mostrarlos individuales
 export function groupInvoiceProductsByCodAll(invoice: any) {
  const groupedProducts = {} as any;

  invoice.invoiceproducts.forEach((product : any) => {
      const { cod, quantity, subtotal, total } = product;
        if (product.special == 0) {
          if (!groupedProducts[cod]) {
              groupedProducts[cod] = { ...product };
          } else {
              groupedProducts[cod].quantity += quantity;
              groupedProducts[cod].subtotal += subtotal;
              groupedProducts[cod].total += total;
          }
        }

  });

  // Convertir el objeto en un array de productos
  invoice.invoiceproductsGroup = Object.values(groupedProducts);
  invoice.invoiceproductsGroup.sort((a: any, b: any) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
);
  return invoice;
}

//// Verfifica si hay productos esta pendiente de mandar a imprimir o a comanda
export function isProductPendientToSend(product: any) {
  if (!product) return false;
  const sendPrint = product?.attributes?.send_print;
  const isValidPrintStatus = [1, 2, 3].includes(sendPrint ?? -1);
  return product.attributes && product.attributes.work_station_id && (isValidPrintStatus);
}