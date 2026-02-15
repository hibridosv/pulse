export const setNameContact = (tempSelectedName: string) => {
  switch (tempSelectedName) {
    case "customerSearch": return "cliente";
    // case "supplierSearch": return "proveedor";
    // case "driverSearch": return "repartidor";
    case "referralSearch": return "referido"
  }
}

export const setRowToChange = (tempSelectedName: string) => {
  switch (tempSelectedName) {
    case "customerSearch": return "client_id";
    case "setSeller": return "employee_id";
    case "setDriver": return "delivery_id";
    case "referralSearch": return "referred_id"
    default: return "client_id";
  }
}


export const setParam = (tempSelectedName: string) => {
  switch (tempSelectedName) {
    case "customerSearch": return "customers";
    // case "supplierSearch": return "suppliers";
    // case "driverSearch": return "drivers";
    case "referralSearch": return "referrals"
    default: return "customers";
  }
}

export const setNameUser = (tempSelectedName: string) => {
  switch (tempSelectedName) {
    case "setSeller": return "vendedor";
    case "setDriver": return "repartidor";
  }
}


export function getModalSize(imagesFiltered: any) {
  const count = imagesFiltered.length;
  if (count <= 3) return 'xs';
  if (count >= 4 && count <= 6) return 'sm';
  if (count >= 7 && count <= 12) return 'md';
  if (count >= 13 && count <= 20) return 'lg';
  if (count >= 21 && count <= 35) return 'xl';
  if (count >= 36 && count <= 40) return 'xl2';
  // size?: "xs" | "sm" | "md" | "lg" | "xl" | "xl2" | "xl3" | "xl4" | "xl5" | "xl6" | "xl7" | "full";
  return 'full';
}