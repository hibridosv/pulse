import { formatDateAsNumber } from "./date-formats";

export const getCountryProperty = (country: number): { name: string, subname: string, currency: string, currencyName: string, document: string , taxes: number, taxesName: string} => {
  switch (country) {
    case 1: return {"name": "El Salvador", "subname": "SV", "currency": "$", "currencyName": "Dolares", "document": "NIT", "taxes": 13, "taxesName" : "IVA"};
    case 2: return {"name": "Honduras", "subname": "HN", "currency": "L", "currencyName": "Lempiras", "document": "RTN", "taxes": 15, "taxesName" : "ISV"};
    case 3: return {"name": "Guatemala", "subname": "GT", "currency": "Q", "currencyName": "Quetzales", "document": "NIT", "taxes": 12, "taxesName" : "IVA"};
    default: return {"name": "El Salvador", "subname": "SV", "currency": "$", "currencyName": "Dolares", "document": "NIT", "taxes": 13, "taxesName" : "IVA"};
  }
}


export const numberToMoney = (number: number, systemInformation = null as any): string => {
    let num = number ? number : 0;
    let symbol =  systemInformation ? getCountryProperty(parseInt(systemInformation?.system?.country)).currency : '$';
    return `${symbol}${num.toFixed(2)}`
}


export const dateToNumberValidate = () =>{
  const fecha = new Date();
  const hoy = fecha.toISOString();
  return formatDateAsNumber(hoy)
}

export const permissionExists = (permissions: any, permission: string) => {
  if(!permissions) return false; 
  return permissions.some((perm: any) => perm.name === permission);
};