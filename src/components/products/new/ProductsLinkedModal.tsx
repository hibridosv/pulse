
import { Button, Preset } from "@/components/button/button";
import { LiComponent } from "@/components/button/LiComponent";
import Modal from "@/components/modal/Modal";
import { SearchInput } from "@/components/Search";
import { useProductLinkedLogic } from "@/hooks/products/useProductsLinkedLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { Product } from "@/interfaces/products";
import useStateStore from "@/stores/stateStorage";
import useToastMessageStore from "@/stores/toastMessageStore";
import useTempStorage from "@/stores/useTempStorage";
import { useForm } from "react-hook-form";
import { productTypeIcon } from "../utils";

export interface ProductsLinkedModalProps {
  onClose: () => void;
  isShow: boolean;
  product: Product;
}

export function ProductsLinkedModal(props: ProductsLinkedModalProps) {
    const { onClose, isShow, product } = props;
    const { register, handleSubmit, resetField } = useForm();
    const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    const sortBy = "-updated_at";
    const { products, onSubmit, productsLinked, loading: isSending } = useProductLinkedLogic(currentPage, searchTerm, sortBy, product, isShow);
    const { loading } = useStateStore();
    const isLoading = loading["productSearch"] ? true : false;
    const { setElement, getElement, clearElement } = useTempStorage();
    const elementSelected = getElement("product");

    if (!isShow || !product) return null;

    const handleClose = () => {
        if (productsLinked && productsLinked.length > 0) {
            resetField("quantity");
            onClose();
            return;
        }
        useToastMessageStore.getState().setError({ message: "Para cerrar debe tener al menos un producto vinculado."});
    };



  const listItems = productsLinked && productsLinked.map((product: any) => (
        <tr key={product.id} className={`transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${product.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
        <td className="px-3 py-2 whitespace-nowrap font-medium text-primary hover:underline">
            {product?.composed?.cod}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
            <div className="flex items-center">
            {productTypeIcon(product?.composed?.product_type)}
            <span>{product?.composed?.description}</span>
            </div>
        </td>
        <td className={`px-3 py-2 text-center whitespace-nowrap font-bold ${product.quantity <= product.minimum_stock ? 'text-danger' : ''}`}>
            {product.quantity}
        </td>
        </tr>
    ));

    const ProductList = products.data && products.data.map((productMap: Product) => {
        if (product.id === productMap.id) return;
        return (
            <LiComponent key={productMap.id} text={`${productMap.cod} - ${productMap.description}`}  onClick={() => setElement("product", productMap)} />
        );
    });

  return (
    <Modal show={isShow} onClose={handleClose} size="xl2" headerTitle="Administrar Productos Vinculados" closeOnOverlayClick={false} hideCloseButton={true}>
      <Modal.Body>

        {/* Section 1: Main Product Details */}
        <div className="p-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
            <h3 className="text-lg font-semibold text-text-base mb-3 border-b border-bg-subtle pb-2">Producto Principal</h3>
            <dl className="flex justify-between gap-x-6 gap-y-4 text-sm">
                <div className="col-span-1 md:col-span-2">
                    <dt className="font-medium text-text-muted">Descripción</dt>
                    <dd className="text-text-base mt-1">{product?.description}</dd>
                </div>
                <div>
                    <dt className="font-medium text-text-muted">Código</dt>
                    <dd className="text-text-base mt-1">{product?.cod}</dd>
                </div>
                <div>
                    <dt className="font-medium text-text-muted">Stock</dt>
                    <dd className="text-text-base font-bold mt-1">{product?.quantity}</dd>
                </div>
            </dl>
        </div>

        {/* Section 2: Assigned Products */}
        <div className="p-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
            <h3 className="text-lg font-semibold text-text-base mb-3">Productos Vinculados</h3>
            {productsLinked && productsLinked.length > 0 ? (
                <div className="relative overflow-x-auto border border-bg-subtle rounded-lg">
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
            ) : (
                <div className="p-3 text-center bg-blue-500/10 text-blue-500 rounded-lg">
                    <p>No hay productos vinculados a este item.</p>
                </div>
            )}
        </div>

        {/* Section 3: Link New Product */}
        <div className="p-4 bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
            {elementSelected ? (
                // Form View
                <div>
                    <div className="p-3 mb-4 bg-green-500/10 text-green-600 rounded-lg">
                        <p className="font-bold">Producto seleccionado:</p>
                        <p>{elementSelected.cod} - {elementSelected.description}</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="quantity">Cantidad a vincular</label>
                            <input
                                type="number"
                                id="quantity"
                                {...register("quantity", { required: true, min: 1, max: product ? product.quantity : 1 })}
                                className="w-full px-3 py-2 bg-bg-base border border-bg-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                defaultValue={1}
                            />
                        </div>
                        <div className="flex justify-end items-center gap-3 border-t border-bg-subtle pt-4 mt-4">
                            <Button onClick={() => clearElement()} text="Cancelar" preset={Preset.cancel} />
                            <Button type="submit" disabled={isSending} preset={isSending ? Preset.saving : Preset.save} />
                        </div>
                    </form>
                </div>
            ) : (
                // Search View
                <div>
                    <h3 className="text-lg font-semibold text-text-base mb-3">Buscar y Vincular Nuevo Producto</h3>
                    <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar por código o descripción..." />
                    <ul className="mt-2 max-h-48 overflow-y-auto space-y-1">
                        {isLoading ? <p className="text-center text-text-muted p-4">Buscando...</p> : ProductList}
                    </ul>
                </div>
            )}
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} preset={Preset.close} disabled={isSending} />
      </Modal.Footer>
    </Modal>
  );
}

