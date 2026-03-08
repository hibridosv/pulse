'use client';
import { Button, Preset } from "@/components/button/button";
import { LiComponent } from "@/components/button/LiComponent";
import { ViewTitle } from "@/components/ViewTitle";
import { useDownloadsLogic } from "@/hooks/reports/useDownloadsLogic";
import { FaSpinner } from "react-icons/fa";
import { LuDownload, LuFileJson, LuLoader } from "react-icons/lu";
import { TbPdf } from "react-icons/tb";

const STEPS = [
  { key: 'generate',   label: 'Generar JSON' },
  { key: 'processing', label: 'Procesando'   },
  { key: 'ready',      label: 'Descarga lista' },
];

export default function Page() {
  const { history: downloads, handleGet, loading, handleGenerateDocuments } = useDownloadsLogic('downloads');
  const loadingDownload = loading.downloads ?? false;
  const creating = loading.creating ?? false;
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const showGeneratePdf = downloads?.length === 1 && downloads[0]?.status == 1;

  const currentStep = !downloads || downloads.length === 0
    ? 'generate'
    : downloads[0]?.status == 1
      ? 'ready'
      : 'processing';

  const stepIndex = STEPS.findIndex(s => s.key === currentStep);

  return (
    <div className="pb-4 md:pb-10">
      <ViewTitle text="Descarga de JSON y PDF" />
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="md:col-span-2 space-y-4">
          <div className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">

            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center gap-0">
                {STEPS.map((step, i) => (
                  <div key={step.key} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                        i < stepIndex
                          ? 'bg-success border-success text-text-inverted'
                          : i === stepIndex && !loadingDownload
                            ? 'bg-primary border-primary text-text-inverted'
                            : 'bg-bg-subtle border-bg-subtle text-text-muted'
                      }`}>
                        {i < stepIndex ? '✓' : i + 1}
                      </div>
                      <span className={`text-xs mt-1 text-center leading-tight ${i === stepIndex && !loadingDownload ? 'text-primary font-semibold' : 'text-text-muted'}`}>
                        {step.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-1 mb-4 transition-colors ${i < stepIndex ? 'bg-success' : 'bg-bg-subtle'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-bg-subtle">
              {loadingDownload ? (
                <div className="p-4 space-y-3 animate-pulse">
                  <div className="h-4 w-2/3 bg-bg-subtle rounded" />
                  <div className="h-3 w-full bg-bg-subtle rounded" />
                  <div className="h-3 w-5/6 bg-bg-subtle rounded" />
                  <div className="h-8 w-32 bg-bg-subtle rounded mt-2" />
                </div>
              ) : downloads && downloads.length > 0 ? (
                <>
                  <ul className="divide-y divide-bg-subtle">
                    {downloads.map((download: any) =>
                      download.status == 1 ? (
                        <LiComponent key={download.id} text={download.comments} href={`${API_URL}zip/download/${download.id}`} />
                      ) : (
                        <li key={download.id}>
                          <button
                            onClick={creating ? undefined : () => handleGet('downloads')}
                            className="w-full flex justify-between items-center px-4 py-3 hover:bg-warning/5 text-warning text-sm transition-colors clickeable"
                          >
                            <span>Se está procesando el archivo (click para actualizar)</span>
                            <FaSpinner className="animate-spin" size={18} />
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                  {showGeneratePdf && (
                    <div className="px-4 py-4 border-t border-bg-subtle bg-bg-subtle/30 flex items-start gap-3">
                      <TbPdf size={26} className="shrink-0 text-danger/70 mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-semibold text-text-base">Generar Documentos PDF</p>
                        <p className="text-xs text-text-muted">
                          Genere los documentos en formato PDF si no se han generado previamente. Puede tardar unos minutos.
                        </p>
                        <Button
                          text={creating ? "Generando..." : "Generar PDF"}
                          onClick={() => handleGenerateDocuments('pdf')}
                          disabled={creating}
                          preset={creating ? Preset.saving : Preset.save}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="px-4 py-5 flex items-start gap-3">
                  <LuFileJson size={26} className="shrink-0 text-primary/50 mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <p className="text-sm font-semibold text-text-base">Sin documentos disponibles</p>
                    <p className="text-xs text-text-muted">
                      No hay documentos disponibles. Genere los documentos en formato JSON; esto puede tardar unos minutos dependiendo de la cantidad a procesar.
                    </p>
                    <Button
                      text={creating ? "Generando..." : "Generar JSON"}
                      onClick={() => handleGenerateDocuments('json')}
                      disabled={creating}
                      preset={creating ? Preset.saving : Preset.save}
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {downloads && downloads.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={() => handleGet('downloads')}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors clickeable"
              >
                <LuLoader size={13} />
                Actualizar estado
              </button>
            </div>
          )}
        </div>

        <div className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden self-start">
          <div className="px-4 py-3 bg-bg-subtle/60 border-b border-bg-subtle">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Información</span>
          </div>
          <div className="p-4 space-y-4 text-xs text-text-muted">
            <div className="flex items-start gap-2">
              <LuFileJson size={16} className="shrink-0 text-primary/50 mt-0.5" />
              <div>
                <p className="font-semibold text-text-base mb-0.5">Archivo JSON</p>
                <p>Contiene los documentos electrónicos en formato requerido por el Ministerio de Hacienda. Se genera una sola vez por período.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TbPdf size={16} className="shrink-0 text-danger/60 mt-0.5" />
              <div>
                <p className="font-semibold text-text-base mb-0.5">Archivo PDF</p>
                <p>Representación visual de los documentos electrónicos. Puede generarse después del JSON una vez que esté listo.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <LuDownload size={16} className="shrink-0 text-accent/70 mt-0.5" />
              <div>
                <p className="font-semibold text-text-base mb-0.5">Descarga</p>
                <p>Los archivos se entregan en formato ZIP. La generación puede tardar varios minutos dependiendo del volumen de documentos.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
