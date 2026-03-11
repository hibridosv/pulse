'use client';
import Modal from "@/components/modal/Modal";
import { LuCircleCheck, LuCircleX, LuFileJson } from "react-icons/lu";
import { Button, Preset } from "../button/button";

interface ImportError {
  file: string;
  message: string;
}

interface ImportResult {
  processed: number;
  errors: ImportError[];
}

interface Props {
  show: boolean;
  onClose: () => void;
  result: ImportResult | null;
}

export function PurchasesImportResultModal({ show, onClose, result }: Props) {
  if (!result) return null;

  const totalErrors = result.errors.length;
  const totalProcessed = result.processed;

  return (
    <Modal show={show} onClose={onClose} headerTitle="Resultado de importación" size="md">
      <Modal.Body>
        <div className="space-y-4">

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-success/10 border border-success/20">
              <LuCircleCheck size={20} className="text-success shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Procesados</p>
                <p className="text-lg font-bold text-success">{totalProcessed}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-danger/10 border border-danger/20">
              <LuCircleX size={20} className="text-danger shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Errores</p>
                <p className="text-lg font-bold text-danger">{totalErrors}</p>
              </div>
            </div>
          </div>

          {totalErrors > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Detalle de errores
              </p>
              <ul className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                {result.errors.map((error, i) => (
                  <li key={i} className="flex gap-3 px-3 py-2.5 rounded-lg bg-danger/5 border border-danger/15">
                    <LuFileJson size={15} className="text-danger/70 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-text-base truncate">{error.file}</p>
                      <p className="text-xs text-danger mt-0.5">{error.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={false} />
      </Modal.Footer>
    </Modal>
  );
}
