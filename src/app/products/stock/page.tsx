'use client';

import { Pagination } from "@/components/Pagination";
import { ProductDetailsModal } from "@/components/products/ProductDetailsModal";
import { ShowLowStockStatistics } from "@/components/products/ShowLowStockStatistics";
import { ShowProductsTable } from "@/components/products/ShowProductsTable";
import { SearchInput } from "@/components/Search";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useLowStockLogic } from "@/hooks/products/useLowStockLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import useModalStore from "@/stores/modalStorage";
import useProductStore from "@/stores/productStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useState } from "react";

export default function Page() {
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
  const [sortBy, setSortBy] = useState("-cod");
  const { products, loading } = useProductStore();
  useLowStockLogic(currentPage, searchTerm, sortBy);
  const { modals, closeModal } = useModalStore();
  const { getSelectedElement } =useTempSelectedElementStore();


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Productos" />
        <div className="p-2">
          { loading ? <SkeletonTable rows={15} columns={8} /> : <ShowProductsTable records={products?.data} setSortBy={setSortBy} sortBy={sortBy} /> }
          <Pagination records={products} handlePageNumber={handlePageNumber } />
        </div>
    </div>
    <div className="col-span-3">
        <div className="flex justify-between">
          <ViewTitle text="Buscar Producto" />
        </div>
        <div className="mt-2 p-2">
          <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar Producto" />
          <ShowLowStockStatistics />
        </div>
    </div> 
    <ProductDetailsModal isShow={modals.productDetails} onClose={() => closeModal('productDetails')} record={getSelectedElement("productDetails")} /> 
    <ToasterMessage />
</div>
  );
}
