'use client';
import { PurchasesBooksList } from "@/components/reports/PurchasesBooksList";
import { PurchasesDetailsModal } from "@/components/reports/PurchasesDetailsModal";
import { PurchasesImportSection } from "@/components/reports/PurchasesImportSection";
import { ReportPurchasesTable } from "@/components/reports/ReportPurchasesTable";
import { ViewTitle } from "@/components/ViewTitle";
import { usePurchasesLogic } from "@/hooks/reports/usePurchasesLogic";
import useModalStore from "@/stores/modalStorage";
import purchasesStore from "@/stores/reports/purchasesStore";

export default function Page() {
  usePurchasesLogic();
  const { purchases, loading, invoices } = purchasesStore();
  const { modals, closeModal } = useModalStore();

  const activeBook = purchases?.find((p: { status: number }) => p.status === 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">

      <div className="md:col-span-7 md:border-r md:border-primary">
        <ViewTitle text="Libro de compras" />
        <ReportPurchasesTable records={invoices} isLoading={loading} />
      </div>

      <div className="md:col-span-3 p-4 space-y-5">

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Libros disponibles</p>
          <PurchasesBooksList purchases={purchases} invoicesCount={invoices?.length ?? 0} />
        </div>
        <PurchasesImportSection bookName={activeBook?.name} />
      </div>

      <PurchasesDetailsModal isShow={modals.purchasesDetailsModal} onClose={() => closeModal('purchasesDetailsModal')} />
    </div>
  );
}
