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