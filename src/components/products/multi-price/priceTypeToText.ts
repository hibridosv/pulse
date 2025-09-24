import { Option } from "@/components/button/RadioButton";

export const priceTypeToText = (priceType: number) => {
    switch (priceType) {
      case 1:
        return "Normal";
      case 2:
        return "Mayorista";
      case 3:
        return "Promoción";
      default:
        return "Desconocido";
    }
  };

export const optionsRadioButton: Option[] = [
    { id: 0, name: "Todos" },
    { id: 1, name: "Normal" },
    { id: 2, name: "Mayorista" },
    { id: 3, name: "Promoción" },
  ];