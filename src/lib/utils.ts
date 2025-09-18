import { DocumentTypes, DocumentTypesNames, PaymentType, PaymentTypeNames } from "@/services/enums";
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


export const urlConstructor = (data: any, url: string)=>{
  let dir = encodeURI(`${url}?option=${data.option}${data.initialDate ? `&initialDate=${data.initialDate}` : ``}${data.finalDate ? `&finalDate=${data.finalDate}` : ``}${data.product_id ? `&product_id=${data.product_id}` : ``}${data.userId ? `&userId=${data.userId}` : ``}${data.clientId ? `&clientId=${data.clientId}` : ``}`)
  return dir;
}

/// obtengo el nombre del tipo de pago 
export const getPaymentTypeName = (type: PaymentType): string | undefined => {
  const typeName = Object.entries(PaymentType)
    .filter(([key, value]) => typeof value === 'number' && value === type)
    .map(([key]) => key)
    .pop();

  return typeName ? (PaymentTypeNames as Record<string, string>)[typeName] : undefined;
};

export const documentType = (document: DocumentTypes): string => {
  if (document == DocumentTypes.ninguno) return DocumentTypesNames.ninguno;
  if (document == DocumentTypes.ticket) return DocumentTypesNames.ticket;
  if (document == DocumentTypes.factura) return DocumentTypesNames.factura;
  if (document == DocumentTypes.creditoFiscal) return DocumentTypesNames.creditoFiscal;
  return DocumentTypesNames.ninguno;
}
