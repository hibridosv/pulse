'use client';
import { LuBookOpen, LuLock } from "react-icons/lu";

interface Purchase {
  id: string;
  nit: string;
  month: string;
  year: string;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  purchases: Purchase[] | null;
  invoicesCount?: number;
}

export function PurchasesBooksList({ purchases, invoicesCount = 0 }: Props) {
  if (!purchases || purchases.length === 0) {
    return (
      <p className="text-xs text-text-muted italic">No hay libros disponibles.</p>
    );
  }

  return (
    <div className="space-y-2">
      {purchases.map((book) => {
        const isOpen = book.status === 1;

        if (isOpen) {
          return (
            <div key={book.id} className="bg-bg-content rounded-lg border-2 border-primary overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <LuBookOpen size={18} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text-base truncate">{book.name}</p>
                    <p className="text-xs text-primary font-medium">Libro activo</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                  Abierto
                </span>
              </div>
              <div className="border-t border-primary/20 px-4 py-2 bg-primary/5 flex items-center justify-between">
                <p className="text-xs text-text-muted">
                  {invoicesCount} documento{invoicesCount !== 1 ? 's' : ''} registrado{invoicesCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div key={book.id} className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-bg-subtle flex items-center justify-center shrink-0">
                  <LuLock size={15} className="text-text-muted" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-muted truncate">{book.name}</p>
                  <p className="text-xs text-text-muted">Período cerrado</p>
                </div>
              </div>
              <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-bg-subtle text-text-muted font-medium">
                Cerrado
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
