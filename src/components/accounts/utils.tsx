import { Indicator } from "../Indicators";

  export const status = (expiration: number) => {
    return (expiration == 1) ? 
    <Indicator text="ACTIVO" type="warning" /> : 
    <Indicator text="PAGADO" type="success" />;
  }
