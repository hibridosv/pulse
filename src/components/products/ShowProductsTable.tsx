import { formatDateAsDMY, formatTime } from "@/lib/date-formats";
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
  const { modals, openModal, closeModal } = useModalStore();

  if (!records || records.length == 0) {
    return null;
  }

    const productTypeIcon = (type: number)=>{
    switch (type) {
      case 2: return <span className="mr-2"><MdOutlineHomeRepairService size={12} color="blue" /></span>
      case 3: return <span className="mr-2"><FaLayerGroup size={10} color="green" /></span> 
    }
  }
    const sortBySelected = (sort: string) => {
        if (setSorBy) {
            if (sortBy.slice(0, 1) != "-") {
                sort = "-" + sort;
            }
        setSorBy(sort);
        }
    }

  const listItems = records && records.map((product: any, key: any) => (
    <tr key={key} className={`border-b hover:bg-gray-100 ${product.status == 0 && "bg-red-100"}`}>
      <td className="px-3 py-2 whitespace-nowrap clickeable" onClick={() => openModal('cutDetails')}>
        {product.cod}
      </td>
      <td className="px-3 py-2 whitespace-nowrap clickeable" onClick={() => openModal('cutDetails')}>
        {productTypeIcon(product.product_type)}
        <span>
            {product.description}
        </span>
      </td>
      <td className="px-3 py-2 text-center" onClick={() => openModal('cutDetails')}>
        {product.prices[0] ? numberToMoney(product.prices[0].price, system) : numberToMoney(0, system)}
      </td>
      <td className="px-3 py-2 text-center">{product.quantity}</td>
      <td className="px-3 py-2 text-center">{product?.category?.name ?? "Sin categoría"}</td>
      <td className="px-3 py-2 text-center">{product?.location?.name ?? "Sin ubicación"}</td>
      <td className="px-3 py-2 text-center">{product.minimum_stock}</td>
      <td className="px-3 py-2 text-center">
        {/* <DeleteCutButton cut={record} isInitial={firstRecord.id == record?.id && record.status == 2} /> */}
      </td>
    </tr>
  ));

  return (
    <div className="m-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 clickeable" onClick={()=>sortBySelected("cod")}>Cod</th>
              <th scope="col" className="px-6 py-3 clickeable" onClick={()=>sortBySelected("description")}>Producto</th>
              <th scope="col" className="px-6 py-3">Precio</th>
              <th scope="col" className="px-6 py-3 clickeable" onClick={()=>sortBySelected("quantity")}>Cantidad</th>
              <th scope="col" className="px-6 py-3 clickeable" onClick={()=>sortBySelected("category_id")}>Categoria</th>
              <th scope="col" className="px-6 py-3 clickeable" onClick={()=>sortBySelected("location_id")}>Ubicación</th>
              <th scope="col" className="px-6 py-3">Minimo</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
    </div>
  );
}