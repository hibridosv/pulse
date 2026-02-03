'use client';
import { Alert } from "@/components/Alert/Alert";
import { Button, Preset } from "@/components/button/button";
import { Pagination } from "@/components/Pagination";
import { AdjustmentsDetailsModal } from "@/components/tools/AdjustmentsDetailsModal";
import { AdjustmentsTable } from "@/components/tools/AdjustmentsTable";
import { ViewTitle } from "@/components/ViewTitle";
import { useAjustmentLogic } from "@/hooks/tools/useAjustmentLogic";
import { usePagination } from "@/hooks/usePagination";
import useModalStore from "@/stores/modalStorage";
import adjustStore from "@/stores/tools/adjustStore";


export default function Page() {
    const {currentPage, handlePageNumber} = usePagination("&page=1");
    useAjustmentLogic(currentPage, true);
    const { adjustments, loading } = adjustStore();
    const { modals, closeModal } = useModalStore();
    const data = adjustments?.data || [];


  const isSending = false;
  const startAdjustment = () => {
    console.log("Iniciar ajuste de inventario");
  }

  console.log("adjustments", adjustments);


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-6 border-r md:border-primary">
        <ViewTitle text="Ajustar Inventario" />
        <div className="p-4">
          <AdjustmentsTable records={data} isLoading={loading} />
          <Pagination records={adjustments} handlePageNumber={handlePageNumber } />
        </div>
    </div>
    <div className="col-span-4">
        <ViewTitle text="Iniciar Ajuste" />

          <div className="my-4">
            <div className="flex justify-center m-8">
              <Alert type={Preset.info} text="No se ha iniciado el ajuste de inventario. Con esta herramienta podrá ajustar su inventario con los datos existentes reales" />
            </div>
            <div className="m-8">
              <Button onClick={startAdjustment} isFull={true} preset={isSending? Preset.saving : Preset.save} text="Iniciar ajuste de inventario" />
            </div>
          </div>
    </div> 
    <AdjustmentsDetailsModal isShow={modals.adjustmentDetails} onClose={() => closeModal('adjustmentDetails')} />
</div>
  );
}
