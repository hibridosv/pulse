'use client';
import { ViewTitle } from "@/components/ViewTitle";
import useConfigStore from "@/stores/configStore";
import { useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import { MdComputer, MdOutlineInventory, MdPointOfSale } from "react-icons/md";

const menuOptions = [
  { label: "Sistema", value: 1, icon: <MdComputer className="mr-2" /> },
  { label: "Configuraciones", value: 2, icon: <GrSettingsOption className="mr-2" /> },
  { label: "Inventario", value: 3, icon: <MdOutlineInventory className="mr-2" /> },
  { label: "Ventas", value: 4, icon: <MdPointOfSale className="mr-2" /> },
  { label: "Facturación", value: 5, icon: <FaFileInvoice className="mr-2" /> },
  { label: "Impresiones", value: 6, icon: <AiFillPrinter className="mr-2" /> },
];

export default function Page() {
  const { configurations, updateConfiguration } = useConfigStore();
  const [configFilter, setConfigFilter] = useState(1);

  if (!configurations) return null;

  const configFiltered = configurations?.filter((conf: any) => conf.group === configFilter) ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-4 md:pb-10">
      <div className="md:col-span-7 md:border-r md:border-primary">
        <ViewTitle text="Configuraciones Principales" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {/* Sidebar de categorías */}
          <div className="md:col-span-1">
            <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle overflow-hidden">
              <div className="px-4 py-3 bg-bg-subtle/60 border-b border-bg-subtle">
                <span className="text-sm font-semibold text-text-base">Seleccione una opción</span>
              </div>
              {menuOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setConfigFilter(option.value)}
                  className={`w-full flex items-center px-4 py-3 text-sm transition-colors border-b border-bg-subtle last:border-b-0 ${
                    configFilter === option.value
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-text-muted hover:bg-bg-subtle/50"
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de configuraciones */}
          <div className="md:col-span-3">
            <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle overflow-hidden">
              <div className="px-4 py-3 bg-bg-subtle/60 border-b-2 border-bg-subtle">
                <span className="text-sm font-semibold text-text-base">
                  {menuOptions.find(o => o.value === configFilter)?.label}
                </span>
              </div>

              {configFiltered.length === 0 ? (
                <div className="p-8 text-center text-text-muted text-sm">
                  No hay configuraciones en esta categoría
                </div>
              ) : (
                <div className="divide-y divide-bg-subtle">
                  {configFiltered.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-bg-subtle/30 transition-colors">
                      <span className="text-sm font-medium text-text-base pr-4">{item.description}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-medium ${item.active ? 'text-success' : 'text-text-muted'}`}>
                          {item.active ? 'Activo' : 'Inactivo'}
                        </span>
                        <button
                          onClick={() => updateConfiguration(item.id, item.active === 1 ? 0 : 1)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            item.active ? 'bg-success' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                              item.active ? 'translate-x-4' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-3">
      </div>
    </div>
  );
}
