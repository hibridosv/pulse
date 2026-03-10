'use client';
import { useRef, useState } from "react";
import { LuFileJson, LuUpload, LuX } from "react-icons/lu";

interface Props {
  bookName?: string;
}

export function PurchasesImportSection({ bookName }: Props) {
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
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
        Importar facturas — {bookName ?? '—'}
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
  );
}
