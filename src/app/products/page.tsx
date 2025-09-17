'use client';

import { LinksList } from "@/components/button/LinkList";
import { Pagination } from "@/components/Pagination";
import { ShowProductsStatistics } from "@/components/products/ShowProductsStatistics";
import { ShowProductsTable } from "@/components/products/ShowProductsTable";
import { SearchInput } from "@/components/Search";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { ViewTitle } from "@/components/ViewTitle";
import { useSetLinkLogic } from "@/hooks/products/useSetLinksLogic";
import { usePagination } from "@/hooks/usePagination";
import { useProductLogic } from "@/hooks/useProductsLogic";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { permissionExists } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
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
  const { permission } = useConfigStore();
  const links = useSetLinkLogic();

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

console.log("links", links)

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
          <ShowProductsStatistics />

          { permissionExists(permission, "inventory-download") && 
                    <div>
                      <LinksList links={links} separator="?" />
                      <li className="flex justify-between p-3 hover:bg-blue-200 hover:text-blue-800 cursor-pointer" >
                          ACTUALIZAR PRECIOS
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                      </li>
                    </div>
              } 
        </div>
    </div> 
</div>
  );
}
