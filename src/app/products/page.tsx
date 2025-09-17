'use client';

import { Pagination } from "@/components/Pagination";
import { ShowProductsTable } from "@/components/products/ShowProductsTable";
import { SearchInput } from "@/components/Search";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { ViewTitle } from "@/components/ViewTitle";
import { usePagination } from "@/hooks/usePagination";
import { useProductLogic } from "@/hooks/useProductsLogic";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import useProductStore from "@/stores/productStore";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
  const [sortBy, setSortBy] = useState("-cod");
  const { products, loading } = useProductStore()
  useProductLogic(currentPage, searchTerm, sortBy);

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

console.log("products", products)

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Productos" />
        { loading ? <SkeletonTable rows={15} columns={8} /> : <ShowProductsTable records={products?.data} setSorBy={setSortBy} sortBy={sortBy} /> }
        <Pagination records={products} handlePageNumber={handlePageNumber } />
    </div>
    <div className="col-span-3">
        <div className="flex justify-between">
          <ViewTitle text="Buscar Producto" />
        </div>
        <div className="mt-2 p-2">
          <SearchInput handleSearchTerm={handleSearchTerm} placeholder="Buscar Producto" />
        </div>
    </div> 
</div>
  );
}
