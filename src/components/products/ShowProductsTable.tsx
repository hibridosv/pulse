'use client';

import useConfigStore from "@/stores/configStore";
import { numberToMoney } from "@/lib/utils";
import useModalStore from "@/stores/modalStorage";
import { Product } from "@/interfaces/products";
import { productTypeIcon, sortBySelected } from './utils';
import useSelectedElementStore from "@/stores/selectedElementStorage";
import { DropDown } from "../button/DropDown";

export interface ShowProductsTableProps {
  records: Product[];
  setSortBy: (sortBy: string) => void;
  sortBy: string;
}

export function ShowProductsTable(props: ShowProductsTableProps) {
  const { records, setSortBy, sortBy } = props;
  const { system, activeConfig } = useConfigStore();
  const { openModal } = useModalStore();
  const { setElement } = useSelectedElementStore();
  const isLocation = activeConfig?.includes("product-brand");
  const isBrand = activeConfig?.includes("product-locations");


  if (!records || records.length === 0) {
    return null;
  }

// const actionOptions = [
//        { label: 'Guardar Cambios', onClick: () => alert('¡Cambios guardados!') },
//        { label: 'Eliminar Elemento', onClick: () => confirm('¿Estás seguro de eliminar?') &&
//       console.log('Elemento eliminado') },
//        { label: 'Abrir Modal', onClick: () => console.log('Modal abierto') },
//      ];
   
// const linkOptions = [
//         { label: 'Ir a Google', href: 'https://www.google.com', target: '_blank' }, 
//         { label: 'Ir a Dashboard', href: '/dashboard' },
//         { label: 'Ver Productos', href: '/products' },
//       ];
   
const mixedOptions = [
        { label: 'Ver Perfil', href: '/profile' }, 
        { label: 'Cerrar Sesión', onClick: () => alert('Cerrando sesión...') }, 
        { label: 'Descargar Reporte', href: '/reports/download', onClick: () => console.log(
      'Iniciando descarga...') }, 
        { label: 'Contactar Soporte', href: 'mailto:support@example.com' },
      ];
   
    // const dropdownOptions = [
    //               { label: 'Editar', onClick: () => alert('Editar') },
    //               { label: 'Eliminar', onClick: () => alert('Eliminar') },
    //               { label: 'Ver Detalles', onClick: () => alert('Ver Detalles') },
    //               ];

  const listItems = records.map((product: Product) => (
    <tr 
      key={product.id} 
      className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${product.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
      <td className="px-3 py-2 whitespace-nowrap clickeable font-medium text-primary hover:underline" onClick={() => { setElement(product); openModal('productDetails')  }}>
        {product.cod}
      </td>
      <td className="px-3 py-2 whitespace-nowrap clickeable" onClick={() => { setElement(product); openModal('productDetails')  }}>
        <div className="flex items-center">
          {productTypeIcon(product.product_type)}
          <span>{product.description}</span>
        </div>
      </td>
      <td className="px-3 py-2 text-right whitespace-nowrap font-medium" onClick={() => { setElement(product); openModal('productDetails')  }}>
        {product.prices[0] ? numberToMoney(product.prices[0].price, system) : numberToMoney(0, system)}
      </td>
      <td className={`px-3 py-2 text-center whitespace-nowrap font-bold ${product.quantity <= product.minimum_stock ? 'text-danger' : ''}`}>
        {product.quantity}
      </td>
      <td className="px-3 py-2 text-center whitespace-nowrap">{product?.category?.name ?? "--"}</td>
      { isLocation && 
      <td className="px-3 py-2 text-center whitespace-nowrap">{product?.location?.name ?? "--"}</td> }
      { isBrand && 
      <td className="px-3 py-2 text-center whitespace-nowrap">{product?.brand?.name ?? "--"}</td> }
      <td className="px-3 py-2 text-center whitespace-nowrap text-text-muted">{product.minimum_stock}</td>
      <td className="px-1 py-1 text-center">
        <DropDown options={mixedOptions} />
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => setSortBy(sortBySelected("cod", sortBy))}>Cod</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => setSortBy(sortBySelected("description", sortBy))}>Producto</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider text-right border-r border-bg-subtle last:border-r-0">Precio</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => setSortBy(sortBySelected("quantity", sortBy))}>Cant</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => setSortBy(sortBySelected("category_id", sortBy))}>Categoria</th>
              { isLocation && 
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => setSortBy(sortBySelected("location_id", sortBy))}>Ubicación</th> }
              { isBrand && 
              <th scope="col" className="px-6 py-3 font-bold tracking-wider clickeable border-r border-bg-subtle last:border-r-0" onClick={() => setSortBy(sortBySelected("brand_id", sortBy))}>Marca</th> }
              <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Min</th>
              <th scope="col" className="px-6 py-3 font-bold tracking-wider text-center">OP</th>
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