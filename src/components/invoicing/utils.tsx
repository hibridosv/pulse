import { Indicator } from "../Indicators";

export const status = (status: number)=>{
    switch (status) {
        case 1: return <Indicator text="Recibido" type="info" coloredText={true} />;
        case 2: return <Indicator text="Firmado" type="warning" coloredText={true} />;
        case 3: return <Indicator text="Rechazado" type="danger" coloredText={true} />;
        case 4: return <Indicator text="Procesado" type="success" coloredText={true} />;
        case 5: return <Indicator text="Anulado" type="danger" coloredText={true} />;
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
