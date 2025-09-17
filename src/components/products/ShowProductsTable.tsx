'use client';

import { useCallback } from 'react';
import { useGetResourceLogic } from "@/hooks/useGetResouceLogic";
import useProductStore from "@/stores/productStore";
import useConfigStore from "@/stores/configStore";
import { numberToMoney } from "@/lib/utils";
import useModalStore from "@/stores/modalStorage";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { Product } from "@/interfaces/products";

export interface ShowProductsTableProps {
  records: Product[];
  setSorBy: (sortBy: string) => void;
  sortBy: string;
}

export function ShowProductsTable(props: ShowProductsTableProps) {
  const { records, setSorBy, sortBy } = props;
  const { system } = useConfigStore();
  const { openModal } = useModalStore();

  if (!records || records.length === 0) {
    return null;
  }

  const productTypeIcon = (type: number) => {
    switch (type) {
      case 2: return <span title="Servicio" className="mr-2 text-info"><MdOutlineHomeRepairService size={14} /></span>;
      case 3: return <span title="Relacionado" className="mr-2 text-success"><FaLayerGroup size={12} /></span>;
      default: return null;
    }
  };

  const sortBySelected = (sort: string) => {
    if (setSorBy) {
      if (sortBy.slice(0, 1) !== "-") {
        sort = "-" + sort;
      }
      setSorBy(sort);
    }
  };

  const listItems = records.map((product: Product) => (
    <tr 
      key={product.id} 
      className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${product.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
      <td className="px-3 py-2 whitespace-nowrap clickeable font-medium text-primary hover:underline" onClick={() => openModal('cutDetails')}>
        {product.cod}
      </td>
      <td className="px-3 py-2 whitespace-nowrap clickeable" onClick={() => openModal('cutDetails')}>
        <div className="flex items-center">
          {productTypeIcon(product.product_type)}
          <span>{product.description}</span>
        </div>
      </td>
      <td className="px-3 py-2 text-right whitespace-nowrap font-medium" onClick={() => openModal('cutDetails')}>
        {product.prices[0] ? numberToMoney(product.prices[0].price, system) : numberToMoney(0, system)}
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold ${product.quantity <= product.minimum_stock ? 'text-danger' : ''}`}>
        {product.quantity}
      </td>
      <td className="px-3 py-2 text-center whitespace-nowrap">{product?.category?.name ?? "--"}</td>
      <td className="px-3 py-2 text-center whitespace-nowrap">{product?.location?.name ?? "--"}</td>
      <td className="px-3 py-2 text-center whitespace-nowrap text-text-muted">{product.minimum_stock}</td>
      <td className="px-3 py-2 text-center">
        {/* Acciones como botones de Editar/Eliminar irían aquí */}
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => sortBySelected("cod")}>Cod</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => sortBySelected("description")}>Producto</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider text-right border-r border-bg-subtle last:border-r-0">Precio</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => sortBySelected("quantity")}>Cantidad</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => sortBySelected("category_id")}>Categoria</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => sortBySelected("location_id")}>Ubicación</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Minimo</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle/50">
            {listItems}
          </tbody>
        </table>
      </div>
    </div>
  );
}