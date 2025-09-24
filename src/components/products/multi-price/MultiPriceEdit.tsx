import { useState } from "react";
import { Option, RadioButton } from "../../button/RadioButton";
import { Button, Preset } from "../../button/button";
import useConfigStore from "@/stores/configStore";
import { numberToMoney4Digits } from "@/lib/utils";
import { optionsRadioButton, priceTypeToText } from "./priceTypeToText";
import { useProductPricesEditLogic } from "@/hooks/products/useProductPricesEditLogic";
import { NothingHere } from "@/components/NothingHere";
import useStateStore from "@/stores/stateStorage";
import { Loader } from "@/components/Loader";
import { DeletePriceButton } from "./DeletePriceButton";

export interface MultiPrice {
  productId: string;
  isShow: boolean;
  text: string;
}

export function MultiPriceEdit(props: MultiPrice) {
  const { text, productId, isShow } = props;
  const { system } = useConfigStore();
  const { prices } = useProductPricesEditLogic(productId, isShow);
  const { loading } = useStateStore();
  const isLoading = loading["productPrices"] ? true : false;

  console.log(prices);

  const [selectedOption, setSelectedOption] = useState<Option | null>(
    optionsRadioButton[0] ? optionsRadioButton[0] : null
  );

  if (!isShow) {
    return null;
  }

  if (isLoading) {
     return <Loader />;
  }

  if (!prices) {
    return (<NothingHere text="No hay precios disponibles" />);
  }


  return (
    <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 md:p-6">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-text-base">
          {text}
        </h3>
        <div className="w-full flex justify-center">
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
              <th scope="col" className="px-4 py-3 border-r border-bg-subtle">
                Cant
              </th>
              <th scope="col" className="px-4 py-3 border-r border-bg-subtle">
                Precio
              </th>
              <th scope="col" className="px-4 py-3 border-r border-bg-subtle">
                Tipo
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Del
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle">
            {prices &&
              prices
              .filter((price) =>
                selectedOption?.id === 0
                  ? true
                  : price.price_type === selectedOption?.id
              )
              .map((price) => {
                return (
                    <tr
                      key={price.id}
                      className="odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle"
                    >
                      <td className="px-2 py-2 font-medium">{price.qty}</td>
                      <td className="px-2 py-2">
                        {numberToMoney4Digits(price.price, system)}
                      </td>
                      <td className="px-2 py-2">{priceTypeToText(price.price_type)}</td>
                      <td className="px-2 py-2 text-center">
                        <DeletePriceButton price={price} />
                      </td>
                    </tr>
                  )
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
