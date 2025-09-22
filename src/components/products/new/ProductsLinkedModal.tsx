
import { useForm } from "react-hook-form";
import { Product } from "@/interfaces/products";
import Modal from "@/components/modal/Modal";
import { Button, Preset } from "@/components/button/button";
import { productTypeIcon } from "../utils";
import { SearchInput } from "@/components/Search";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { usePagination } from "@/hooks/usePagination";
import useStateStore from "@/stores/stateStorage";
import { useProductLinkedLogic } from "@/hooks/products/useProductsLinkedLogic";
import useSelectedElementStore from "@/stores/selectedElementStorage";

export interface ProductsLinkedModalProps {
  onClose: () => void;
  isShow: boolean;
  product: Product | null;
  records: Product[];
}

export function ProductsLinkedModal(props: ProductsLinkedModalProps) {
    const { onClose, isShow, product, records } = props;
    const { register, handleSubmit, resetField } = useForm();
    const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    const sortBy = "-updated_at";
    const { products } = useProductLinkedLogic(currentPage, searchTerm, sortBy);
    const { loading } = useStateStore();
    const isLoading = loading["productSearch"] ? true : false;
    const { elementSelected, setElement, clearElement } = useSelectedElementStore();
    const isSending = loading["productLinkedSending"] ? true : false;


 const onSubmit = async (data: any) => { console.log(data); }
  const listItems = records && records.map((product: Product) => (
        <tr key={product.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${product.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
        <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
            {product.cod}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
            <div className="flex items-center">
            {productTypeIcon(product.product_type)}
            <span>{product.description}</span>
            </div>
        </td>
        <td className={`px-3 py-2 text-center whitespace-nowrap font-bold ${product.quantity <= product.minimum_stock ? 'text-danger' : ''}`}>
            {product.quantity}
        </td>
        </tr>
    ));

      const ProductList = products.data && products.data.map((product: Product) => {
        return (<li key={product.id} className="flex justify-between p-3 hover:bg-blue-200 hover:text-blue-800 cursor-pointer" onClick={() => setElement(product)}>
                    <span>{product.cod} - {product.description}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </li>);
      });

    // const ProductList =  (<li >Producto de ejemplo</li>)
  return (
    <Modal show={isShow} onClose={onClose} size="xl" headerTitle="Productos relacionados" closeOnOverlayClick={false} hideCloseButton={true}>
      <Modal.Body>
        <div className="mx-4">
            <div>
                <p className="text-sm">Producto: {product?.description}</p>
                <p className="text-sm">Codigo: {product?.cod}</p>
                <p className="text-sm">Cantidad actual: {product?.quantity}</p>
            </div>
        {
            records && records.length > 0 ? (
            <div className="border-t border-bg-subtle mt-4 mb-4">
                <p className="text-sm font-bold">Productos asignados</p>
                    <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
                        <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-base uppercase bg-bg-subtle/60 border-b-2 border-bg-subtle">
                            <tr>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cod</th>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Producto</th>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider border-r border-bg-subtle last:border-r-0">Cant</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-bg-subtle/50">
                            {listItems}
                        </tbody>
                        </table>
                    </div>
            </div>
            ) : (
            <div className="mt-4 mb-4">
                <p className="p-2 bg-red-100 text-red-800 rounded-lg">No hay productos asignados</p>
            </div>
            )
        }
        {
            elementSelected ? (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                <p className="font-bold">Producto seleccionado:</p>
                <p>{elementSelected.cod} - {elementSelected.description}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                    <div className="flex gap-2 justify-between">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="quantity">Cantidad a asignar</label>
                            <input
                                type="number"
                                id="quantity"
                                {...register("quantity", { required: true, min: 1, max: product ? product.quantity : 1 })}
                                className="w-full px-3 py-2 border border-bg-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                defaultValue={1}
                            />
                        </div>
                        <Button type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
                        </div>
                </form>
                <div className="mt-2 flex justify-end">
                    <Button onClick={() => clearElement()} text="Cancelar" preset={Preset.cancel} />
                </div>
            </div>
            ) : (
            <div>
                <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar Producto" />
                <div className="mt-2 justify-center">
                    {ProductList}
                </div> 
            </div>
            )
        }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={isLoading} />
      </Modal.Footer>
    </Modal>
  );
}

