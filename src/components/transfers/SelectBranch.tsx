'use client';
import { BiHomeCircle } from 'react-icons/bi';
import { NothingHere } from '@/components/NothingHere';

interface SelectBranchProps {
  records: any;
  onSelect: (record: any) => void;
  loading?: boolean;
}

function SelectBranchSkeleton() {
  return (
    <div className="py-4 px-4 animate-pulse">
      <div className="h-5 w-24 bg-bg-subtle rounded mb-3" />
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-bg-content rounded-lg border border-bg-subtle">
            <div className="h-7 w-7 bg-bg-subtle rounded-full" />
            <div className="h-5 w-40 bg-bg-subtle rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SelectBranch({ records, onSelect, loading }: SelectBranchProps) {
  if (loading) return <SelectBranchSkeleton />;

  if (!records?.data || records.data.length === 0) return <NothingHere text="No tienes sucursales asignadas" />;

  return (
    <div className="py-4 px-4">
      <div className="text-text-muted font-semibold mb-3">Enviar a:</div>
      <div className="space-y-2">
        {records.data.map((record: any) => (
          <button
            key={record.id}
            onClick={() => onSelect(record)}
            className="w-full flex items-center gap-3 p-4 bg-bg-content rounded-lg border border-bg-subtle hover:bg-bg-subtle transition-colors clickeable"
          >
            <BiHomeCircle size={28} className="text-primary" />
            <span className="text-left font-semibold uppercase text-lg text-text-base">
              {record?.to?.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
