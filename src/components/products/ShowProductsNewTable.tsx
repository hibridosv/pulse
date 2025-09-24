'use client';

import useConfigStore from "@/stores/configStore";
import { numberToMoney } from "@/lib/utils";
import { Product } from "@/interfaces/products";
import { productTypeIcon } from './utils';
import { NothingHere } from "@/components/NothingHere";
import useSelectedElementStore from "@/stores/selectedElementStorage";
import useModalStore from "@/stores/modalStorage";


export interface ShowProductsNewTableProps {
  records: Product[];
}

export function ShowProductsNewTable(props: ShowProductsNewTableProps) {
  const { records } = props;
  const { system } = useConfigStore();
  const { setElement } = useSelectedElementStore();
  const { openModal } = useModalStore();



  if (!records || records.length === 0) {
    return <NothingHere />;
  }

  const listItems = records.map((product: Product) => (
    <tr 
      key={product.id} 
      className={`whitespace-nowrap transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${product.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
      <td className="px-4 py-4 font-medium text-primary hover:underline">
        {product.cod}
      </td>
      <td className="px-4 py-4 clickeable" onClick={() => { setElement(product); openModal('productDetails')}}>
        <div className="flex items-center space-x-2">
          {productTypeIcon(product.product_type)}
          <span>{product.description}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-right font-medium">
        {product.prices[0] ? numberToMoney(product.prices[0].price, system) : numberToMoney(0, system)}
      </td>
      <td className={`px-4 py-4 text-center font-bold ${product.quantity <= product.minimum_stock ? 'text-danger' : ''}`}>
        {product.quantity}
      </td>
    </tr>
  ));

  return (
    <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60">
            <tr className="border-b-2 border-bg-subtle">
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle">Cod</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle">Producto</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider text-right border-r border-bg-subtle">Precio</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider text-center">Cant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle">
            {listItems}
          </tbody>
        </table>
      </div>
  );
}
