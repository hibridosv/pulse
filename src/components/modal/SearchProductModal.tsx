import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { usePagination } from "@/hooks/usePagination";
import { useProductsSearchModalLogic } from "@/hooks/useProductsSearchModalLogic";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import useModalStore from "@/stores/modalStorage";
import productSearchModalStore from "@/stores/productSearchModalStore";
import useTempStorage from "@/stores/useTempStorage";
import { SearchInput } from "../Search";
import { LiComponent } from "../button/LiComponent";

export interface SearchProductModalI {
  onClose: () => void;
  isShow: boolean;
}

export function SearchProductModal({ onClose, isShow }: SearchProductModalI) {
    const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
    const {currentPage} = usePagination("&page=1");
    const { products } = productSearchModalStore();
    useProductsSearchModalLogic(currentPage, searchTerm);
    const { modals, closeModal, openModal } = useModalStore();
    const { getElement, clearElement, setElement } = useTempStorage();


    const handleSelected = (product: any) => {
        openModal('productDetails');
        setElement('productDetails', product.cod);
        handleSearchTerm('');
    }   


    return (
        <Modal show={isShow}  onClose={onClose}  size="xl" headerTitle="Buscar Producto">
            <Modal.Body>
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="w-full">
                    <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar Producto por código o descripción..." />
                    { searchTerm && products && products.data && products.data.length > 0 && (
                        <div className='top-full left-0 right-0 z-20 mt-2 bg-bg-content rounded-lg shadow-lg border border-bg-subtle/50'>
                            <ul className="divide-y divide-bg-subtle max-h-80 overflow-y-auto custom-scrollbar">
                            {products.data.map((item: any) => {
                                return (
                                    <LiComponent 
                                    key={item.id} 
                                    text={item.cod} 
                                    content={`${item.cod} - ${item.description}`} 
                                    onClick={() => handleSelected(item)}
                                    />
                                );
                            })}
                            </ul>
                        </div> 
                    )}
                </div>

            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} preset={Preset.close} />
            </Modal.Footer>
        </Modal>
    );
}
