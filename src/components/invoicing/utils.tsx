import { Indicator } from "../Indicators";

export const status = (status: number)=>{
    switch (status) {
        case 1: return <Indicator text="RECIBIDO" type="info" />;
        case 2: return <Indicator text="FIRMADO" type="warning" />;
        case 3: return <Indicator text="RECHAZADO" type="danger" />;
        case 4: return <Indicator text="PROCESADO" type="success" />;
        case 5: return <Indicator text="ANULADO" type="danger" />;
        }
    }

export const tipoDTE = (dte: string)=>{
    switch (dte) {
        case "01": return "Factura";
        case "03": return "CCF";
        case "14": return "FSE";
        case "11": return "FEX";
        case "05": return "NC";
        case "04": return "NR";
    }
}
