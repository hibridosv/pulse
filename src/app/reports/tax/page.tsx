'use client';
import { Button, Preset } from "@/components/button/button";
import { DateRange } from "@/components/button/DateRange";
import { LiComponent } from "@/components/button/LiComponent";
import { LinksList } from "@/components/button/LinkList";
import { fieldUsersActive } from "@/components/reports/utils";
import { ViewTitle } from "@/components/ViewTitle";
import { useDownloadsLogic } from "@/hooks/reports/useDownloadsLogic";
import { FaSpinner } from "react-icons/fa";


export default function Page() {
  const { history: downloads, handleGet, loading, links, handleCreateLinks, handleGenerateDocuments} = useDownloadsLogic(`document/download`);
  const loadingDownload = loading.downloads ?? false; 
  const isLoading = loading.loading ?? false; 
  const creating = loading.creating ?? false; 
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  



  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-7 border-r md:border-primary">
        <ViewTitle text="Reporte de anexos de IVA y descargas" />
        <div className="p-4">
          
          <div className="m-4 p-4 border-2 rounded-md">
            <div className="uppercase flex justify-center font-bold">Documentos disponibles:</div>
            {
              downloads && downloads?.length > 0 ?
              
              <ul className="mt-4 border-t border-teal-700 p-4" >
                {downloads.map((download: any) => {
                  return (
                    <div key={download?.id}>
                    {
                      download.status == 1 ? 
                     <LiComponent text={download.comments} href={`${API_URL}zip/download/${download?.id}`} />  :
                    <li className="flex justify-between p-3 hover:bg-red-200 hover:text-red-800 clickeable" onClick={creating ? ()=>{} : () => handleGet('document/download') }>
                        Se esta procesando el archivo de descarga (Click para actualizar)
                        <FaSpinner className="animate-spin" size={30} />
                    </li>
                    }
                    { downloads?.length === 1 && download.status == 1 &&
                    <div className="m-4 p-4 border-2 rounded-md">
                      <p className="font-bold mb-2">Generar Documentos</p>
                      <p className="mb-2">Puede generar los documentos en formato PDF si no se han generado previamente, esto puede tardar unos minutos dependiendo de la cantidad de documentos a procesar.</p>  
                      <div className="flex gap-4">
                        <Button text={ creating ? "Generando..." : "Generar PDF"} 
                        onClick={ () => handleGenerateDocuments('pdf') } 
                        disabled={ creating } 
                        preset={creating ? Preset.saving : Preset.save}
                        />
                      </div>
                    </div>
                    }
                    </div>
                )
                })}
              </ul> 
              :
              <div>
                { loadingDownload ?
                  <div className="m-4 p-4 border-2 rounded-md">
                      <p className="font-bold mb-2">Generar Documentos</p>
                      <p className="mb-2">No hay documentos disponibles para descargar. Puede generar los documentos en formato JSON si no se han generado previamente, esto puede tardar unos minutos dependiendo de la cantidad de documentos a procesar.</p>  
                      <div className="flex gap-4">
                        <Button text={ creating ? "Generando..." : "Generar JSON"} 
                        onClick={ () => handleGenerateDocuments('json') } 
                        disabled={ creating } 
                        preset={creating ? Preset.saving : Preset.save}
                        />
                      </div>
                    </div> :
                    <div className="m-4 p-4 border-2 rounded-md animate-pulse">
                      <div className="h-5 w-40 bg-gray-300 rounded mb-3"></div>
                      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>

                      <div className="flex gap-4">
                        <div className="h-10 w-36 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                }
              </div>      
            }
            </div>

        </div>
    </div>
    <div className="col-span-3">
        <ViewTitle text="Seleccionar fechas" />
          <div className="mt-2 p-2">
            <DateRange onSubmit={handleCreateLinks} loading={isLoading} additionalFields={fieldUsersActive} />
          </div>
          <div className="p-4">
            <LinksList links={links} text="DESCARGAR DOCUMENTOS" />
          </div>
    </div> 
</div>
  );
}
