'use client';

import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { SearchInput } from "@/components/Search";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { useProductLogic } from "@/hooks/products/useProductsLogic";
import { usePagination } from "@/hooks/usePagination";
import { useState } from "react";
import useProductStore from "@/stores/productStore";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { ShowProductsTableLink } from "@/components/products/ShowProductsTableLink";

export default function Page() {
  const { data: session, status } = useSession();
  const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const [sortBy, setSortBy] = useState("-cod");
  const { products, loading } = useProductStore();
  useProductLogic(currentPage, searchTerm, sortBy);

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-7 border-r md:border-primary">
          <ViewTitle text="Kardex de Producto" />
          { loading ? <SkeletonTable rows={15} columns={8} /> : <ShowProductsTableLink records={products?.data} link="edit" /> }

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
