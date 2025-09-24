import { useState } from "react";
import { Option, RadioButton } from "../button/RadioButton";
import { Button, Preset } from "../button/button";
import useConfigStore from "@/stores/configStore";
import { Price } from "@/interfaces/price";
import { numberToMoney4Digits } from "@/lib/utils";

export interface MultiPrice {
  text: string;
}

// Sample data to demonstrate styling with multiple rows
const samplePrices: Price[] = [
  { id: "1", price: 25.5, price_type: 1, qty: 1 },
  { id: "2", price: 22.0, price_type: 2, qty: 10 },
  { id: "3", price: 20.0, price_type: 3, qty: 25 },
];

export function MultiPriceEdit(props: MultiPrice) {
  const { text } = props;
  const { system } = useConfigStore();
  const optionsRadioButton: Option[] = [
    { id: 0, name: "Todos" },
    { id: 1, name: "Precios" },
    { id: 2, name: "Mayoristas" },
    { id: 3, name: "Promociones" },
  ];
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    optionsRadioButton[0] ? optionsRadioButton[0] : null
  );

  const priceTypeToText = (priceType: number) => {
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

  return (
    <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 md:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-base mb-4">
          {text}
        </h3>
        <div className="w-full ">
          <RadioButton
            options={optionsRadioButton}
            onSelectionChange={setSelectedOption}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-text-base">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60">
            <tr className="border-b-2 border-bg-subtle">
              <th scope="col" className="px-2 py-2 border-r border-bg-subtle">
                Cant
              </th>
              <th scope="col" className="px-2 py-2 border-r border-bg-subtle">
                Precio
              </th>
              <th scope="col" className="px-2 py-2 border-r border-bg-subtle">
                Tipo
              </th>
              <th scope="col" className="px-2 py-2 text-center">
                Del
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle">
            {samplePrices.map((price) => (
              <tr
                key={price.id}
                className="odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle"
              >
                <td className="px-2 py-1 font-medium">{price.qty}</td>
                <td className="px-2 py-1">
                  {numberToMoney4Digits(price.price, system)}
                </td>
                <td className="px-2 py-1">{priceTypeToText(price.price_type)}</td>
                <td className="px-2 py-1 text-center">
                  <Button noText={true} preset={Preset.smallClose} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
