import { SearchInput } from "@/components/Search";
import { useProductsSearchLogic } from "@/hooks/products/useProductsSearchLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import useProductStore from "@/stores/products/productStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { LiComponent } from "../button/LiComponent";

export function ProductsSearch() {
    const { setSelectedElement} = useTempSelectedElementStore();
    const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
    const {currentPage} = usePagination("&page=1");
    const sortBy = "-updated_at";
    const { products } = useProductStore();
    useProductsSearchLogic(currentPage, searchTerm, sortBy);


    const handleSelectProduct = (product: any) => {
        setSelectedElement('productSearched', product);
        handleSearchTerm('');
    };

    return (
        <div className="relative w-full">
            <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar Producto por código o descripción..." />
            { searchTerm && products && products.data && products.data.length > 0 && (
                <div className='absolute top-full left-0 right-0 z-20 mt-2 bg-bg-content rounded-lg shadow-lg border border-bg-subtle/50'>
                  <ul className="divide-y divide-bg-subtle max-h-80 overflow-y-auto custom-scrollbar">
                    {products.data.map((item: any) => {
                        return (
                          <LiComponent 
                            key={item.id} 
                            text={item.cod} 
                            content={`${item.cod} - ${item.description}`} 
                            onClick={() => handleSelectProduct(item)}
                          />
                        );
                    })}
                  </ul>
                </div> 
            )}
        </div>
    );
}