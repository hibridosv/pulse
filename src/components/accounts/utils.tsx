import { Indicator } from "../Indicators";

  export const status = (expiration: number) => {
    return (expiration == 1) ? 
    <Indicator text="ACTIVO" type="success" /> : 
    <Indicator text="PAGADO" type="danger" />;
  }


  export const statusPayment = (expiration: number) => {
    return (expiration == 1) ? 
    <Indicator text="Pagado" type="success" /> : 
    <Indicator text="Eliminado" type="danger" />;
  }