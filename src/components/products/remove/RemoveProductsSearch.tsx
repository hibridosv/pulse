import { SearchInput } from "@/components/Search";
import { useProductLogic } from "@/hooks/products/useProductsLogic";
import { useProductsRemoveSearchLogic } from "@/hooks/products/useProductsRemoveSearchLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import productRemovedStore from "@/stores/productRemovedStore";
import useProductStore from "@/stores/productStore";
import useSelectedElementStore from "@/stores/selectedElementStorage";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { FiChevronRight } from "react-icons/fi";


export function RemoveProductsSearch() {
    const { product, loading } = productRemovedStore();
    const { getSelectedElement, setSelectedElement} = useTempSelectedElementStore();
    const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    const sortBy = "-updated_at";
    const { products, loading: loadingSearch } = useProductStore();
    useProductsRemoveSearchLogic(currentPage, searchTerm, sortBy);
    const elementSelected = getSelectedElement('product');

    console.log("Product: ", products);

    if (!product || loading) return null;
    if (elementSelected) return null;


  return (
        <div className="w-full px-4">
            <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar Producto" />
            { searchTerm != "" && (
                <div className='my-5 bg-bg-content rounded-lg shadow-sm border border-bg-subtle/50'>
                  <ul className="divide-y divide-bg-subtle">
                    {products?.data && products.data.map((item: any) => {
                        return (
                          <li key={item.id} className="flex justify-between p-3 hover:bg-bg-subtle rounded-md cursor-pointer transition-colors duration-150" onClick={() => setSelectedElement('product', item)}>
                            <span>{item.cod} - {item.description}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </li>
                        );
                    })}
                  </ul>
                </div> 
            )}
        </div>
  );
}
