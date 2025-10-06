'use client';
import { LinksList } from "@/components/button/LinkList";
import { HistoryCostTable } from "@/components/history/HistoryCostTable";
import { ProductsSearch } from "@/components/search/ProductsSearch";
import { ShowProductSearched } from "@/components/search/ShowProductSearched";
import { ViewTitle } from "@/components/ViewTitle";
import { useHistoryCostLogic } from "@/hooks/history/useHistoryCostLogic";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { useMemo } from "react";


export default function Page() {
    const { getSelectedElement } = useTempSelectedElementStore();
  const elementSelected = getSelectedElement('productSearched');

  const params = useMemo(() => 
    elementSelected?.id ? [{name: "product_id", value: elementSelected?.id}] : [],
    [elementSelected?.id]
  );

  const { history, loading, links } = useHistoryCostLogic(
    `histories/cost?perPage=25${elementSelected?.id ? `&product_id=${elementSelected?.id}` : ''}`, 
    'excel/cost/', 
    params
  );
  const isLoading = loading.history ?? false; 


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Listado de costos" />
        <div className="p-4">
          <HistoryCostTable records={history?.data} isLoading={isLoading} />
        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
            <ProductsSearch />
            <ShowProductSearched />
          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAS" separator={ elementSelected ? '&' : '?'} />
          </div>
    </div> 
</div>
  );
}