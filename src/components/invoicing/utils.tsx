import { Indicator } from "../Indicators";

export const status = (status: number)=>{
    switch (status) {
        case 1: return <Indicator text="Recibido" type="info" />;
        case 2: return <Indicator text="Firmado" type="warning" />;
        case 3: return <Indicator text="Rechazado" type="danger" />;
        case 4: return <Indicator text="Procesado" type="success" />;
        case 5: return <Indicator text="Anulado" type="danger" />;
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
