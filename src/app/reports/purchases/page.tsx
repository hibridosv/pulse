'use client';
import { PurchasesDetailsModal } from "@/components/reports/PurchasesDetailsModal";
import { ReportPurchasesTable } from "@/components/reports/ReportPurchasesTable";
import { ViewTitle } from "@/components/ViewTitle";
import { usePurchasesLogic } from "@/hooks/reports/usePurchasesLogic";
import useModalStore from "@/stores/modalStorage";
import purchasesStore from "@/stores/reports/purchasesStore";


export default function Page() {
  usePurchasesLogic();
  const { purchases, loading } = purchasesStore()
  const { modals, closeModal } = useModalStore();



  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
    <div className="md:col-span-7 md:border-r md:border-primary">
        <ViewTitle text="Libro de compras actual" />
        <div className="px-4">
          <ReportPurchasesTable records={purchases} isLoading={loading} />

        </div>
    </div>
    <div className="md:col-span-3">
        <ViewTitle text="Libros disponibles" />
    </div> 
    <PurchasesDetailsModal isShow={modals.purchasesDetailsModal} onClose={() => closeModal('purchasesDetailsModal')} />
</div>
  );
}
