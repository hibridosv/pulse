'use client';
import { PurchasesDetailsModal } from "@/components/reports/PurchasesDetailsModal";
import { ReportPurchasesTable } from "@/components/reports/ReportPurchasesTable";
import { ViewTitle } from "@/components/ViewTitle";
import { usePurchasesLogic } from "@/hooks/reports/usePurchasesLogic";
import useModalStore from "@/stores/modalStorage";
import purchasesStore from "@/stores/reports/purchasesStore";
import { DateTime } from "luxon";
import { useRef, useState } from "react";
import { LuBookOpen, LuFileJson, LuLock, LuUpload, LuX } from "react-icons/lu";

const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function Page() {
  usePurchasesLogic();
  const { purchases, loading } = purchasesStore();
  const { modals, closeModal } = useModalStore();

  const months = Array.from({ length: 3 }, (_, i) => {
    const dt = DateTime.now().minus({ months: i });
    return {
      label: MONTHS_ES[dt.month - 1],
      year: dt.year,
      isOpen: i === 0,
      index: i,
    };
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith('.json'));
    setFiles(prev => [...prev, ...dropped]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).filter(f => f.name.endsWith('.json'));
    setFiles(prev => [...prev, ...selected]);
    e.target.value = '';
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">

      <div className="md:col-span-7 md:border-r md:border-primary">
        <ViewTitle text="Libro de compras" />
        <ReportPurchasesTable records={purchases} isLoading={loading} />
      </div>

      <div className="md:col-span-3 p-4 space-y-5">

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Libros disponibles</p>
          <div className="space-y-2">
            {months.map((month) => month.isOpen ? (
              <div key={month.index} className="bg-bg-content rounded-lg border-2 border-primary overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <LuBookOpen size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text-base truncate">{month.label} {month.year}</p>
                      <p className="text-xs text-primary font-medium">Libro activo</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                    Abierto
                  </span>
                </div>
                <div className="border-t border-primary/20 px-4 py-2 bg-primary/5 flex items-center justify-between">
                  <p className="text-xs text-text-muted">
                    {purchases?.length ?? 0} documento{(purchases?.length ?? 0) !== 1 ? 's' : ''} registrado{(purchases?.length ?? 0) !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ) : (
              <div key={month.index} className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between gap-3 opacity-50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-bg-subtle flex items-center justify-center shrink-0">
                      <LuLock size={15} className="text-text-muted" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-muted truncate">{month.label} {month.year}</p>
                      <p className="text-xs text-text-muted">Período cerrado</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-bg-subtle text-text-muted font-medium">
                    Cerrado
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
            Importar facturas — {months[0].label} {months[0].year}
          </p>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-lg border-2 border-dashed cursor-pointer transition-all p-6 flex flex-col items-center gap-2 text-center ${
              isDragging
                ? 'border-primary bg-primary/8 scale-[1.01]'
                : 'border-bg-subtle hover:border-primary/40 hover:bg-primary/5'
            }`}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              isDragging ? 'bg-primary/20' : 'bg-bg-subtle'
            }`}>
              <LuUpload size={20} className={isDragging ? 'text-primary' : 'text-text-muted'} />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-base">
                {isDragging ? 'Suelte los archivos aquí' : 'Arrastre los archivos aquí'}
              </p>
              <p className="text-xs text-text-muted mt-0.5">o haga clic para seleccionar</p>
            </div>
            <span className="text-xs text-text-muted bg-bg-subtle px-2.5 py-0.5 rounded-full font-medium">
              Solo archivos .json
            </span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".json"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>

          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-text-muted">
                {files.length} archivo{files.length !== 1 ? 's' : ''} seleccionado{files.length !== 1 ? 's' : ''}
              </p>
              <ul className="max-h-44 overflow-y-auto custom-scrollbar space-y-1.5">
                {files.map((file, i) => (
                  <li key={i} className="flex items-center justify-between px-3 py-2 bg-bg-content rounded-lg border border-bg-subtle text-xs group">
                    <div className="flex items-center gap-2 min-w-0">
                      <LuFileJson size={14} className="shrink-0 text-primary/60" />
                      <span className="truncate text-text-base">{file.name}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                      className="shrink-0 ml-2 text-text-muted hover:text-danger transition-colors clickeable opacity-0 group-hover:opacity-100"
                    >
                      <LuX size={13} />
                    </button>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-1 px-4 py-2 rounded-lg bg-primary text-text-inverted text-xs font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all clickeable">
                Importar {files.length} archivo{files.length !== 1 ? 's' : ''}
              </button>
            </div>
          )}
        </div>

      </div>

      <PurchasesDetailsModal isShow={modals.purchasesDetailsModal} onClose={() => closeModal('purchasesDetailsModal')} />
    </div>
  );
}
