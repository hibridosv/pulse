'use client'

import { DateRange, DateRangeValues } from "@/components/button/DateRange";
import { LoadingPage } from "@/components/LoadingPage";
import { NothingHere } from "@/components/NothingHere";
import { KardexDetailsModal } from "@/components/products/kardex/KardexDetailsModal";
import { ShowKardexTable } from "@/components/products/kardex/ShowKardexTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useKardexLogic } from "@/hooks/products/useKardexLogic";
import { urlConstructor } from "@/lib/utils";
import useModalStore from "@/stores/modalStorage";
import useProductStore from "@/stores/productStore";
import useSelectedElementStore from "@/stores/selectedElementStorage";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: session, status } = useSession();
  const { kardex, loadKardex, loading, product } = useProductStore();
  useKardexLogic(id);
  const { elementSelected } = useSelectedElementStore();
  const { modals, closeModal } = useModalStore();

  if (status === "loading") {
    return <LoadingPage />;
  }
  const handleFormSubmit = async (values: DateRangeValues) => { 
      let url = urlConstructor(values, `products/${id}/kardex`)
      await loadKardex(url);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
      <div className="col-span-7 border-r md:border-primary">
          <ViewTitle text="Kardex de Producto" />
          <ShowKardexTable product={product} kardex={kardex} />
      </div>
      <div className="col-span-3">
          <div className="flex justify-between">
            <ViewTitle text="Busqueda" />
          </div>
          <div className="mt-2 p-2">
            <DateRange onSubmit={handleFormSubmit} loading={loading} />
          </div>
          <div className="mt-2 p-2 flex justify-center">
            <Link href="/products/search?page=kardex" className="button-href">Buscar otro producto</Link>
          </div>
      </div> 
      <KardexDetailsModal isShow={modals['kardexDetails']} onClose={() => closeModal('kardexDetails')} record={elementSelected} />
    </div>
  );
}