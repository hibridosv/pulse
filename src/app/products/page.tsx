'use client';

import { LinksList } from "@/components/button/LinkList";
import { Pagination } from "@/components/Pagination";
import { ShowProductsStatistics } from "@/components/products/ShowProductsStatistics";
import { ShowProductsTable } from "@/components/products/ShowProductsTable";
import { SearchInput } from "@/components/Search";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import { useSetLinkLogic } from "@/hooks/products/useSetLinksLogic";
import { useGetRequest } from "@/hooks/request/useGetRequest";
import { usePagination } from "@/hooks/usePagination";
import { useProductLogic } from "@/hooks/products/useProductsLogic";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { permissionExists } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";
import useProductStore from "@/stores/productStore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { ProductDetailsModal } from "@/components/products/ProductDetailsModal";
import useSelectedElementStore from "@/stores/selectedElementStorage";
import useModalStore from "@/stores/modalStorage";
import { LoadingPage } from "@/components/LoadingPage";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const {currentPage, handlePageNumber} = usePagination("&page=1");
  const { searchTerm, handleSearchTerm } = useSearchTerm(["cod", "description"], 500);
  const [sortBy, setSortBy] = useState("-cod");
  const { products, loading } = useProductStore()
  useProductLogic(currentPage, searchTerm, sortBy);
  const { permission } = useConfigStore();
  const links = useSetLinkLogic();
  const { getRequest, loading: loadingRequest } = useGetRequest();
  const { elementSelected } = useSelectedElementStore();
  const { modals, closeModal } = useModalStore();

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Productos" />
        { loading ? <SkeletonTable rows={15} columns={8} /> : <ShowProductsTable records={products?.data} setSortBy={setSortBy} sortBy={sortBy} /> }
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
              <div className="mt-2 p-2">
                <LinksList links={links} separator="?" text="DESCARGAS" />
                <div onClick={loadingRequest ? ()=>{} : ()=>getRequest('transactions/products/prices')} >
                    {loadingRequest ? <li className="flex justify-between p-3 hover:bg-blue-200 hover:text-blue-800 cursor-pointer" >
                      ACTUALIZANDO...
                      <FaSpinner className="animate-spin" />
                      </li> : <li className="flex justify-between p-3 hover:bg-blue-200 hover:text-blue-800 cursor-pointer" >
                        ACTUALIZAR PRECIOS
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </li>
                    }
                </div>
              </div>
              } 
        </div>
    </div> 
    <ProductDetailsModal isShow={modals['productDetails']} onClose={() => closeModal('productDetails')} record={elementSelected} /> 
    <ToasterMessage />
</div>
  );
}
