'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import useModalStore from "@/stores/modalStorage";
import manageRestaurantStore from "@/stores/restaurant/manageRestaurantStore";
import useTempStorage from "@/stores/useTempStorage";
import { AiOutlineLoading } from "react-icons/ai";
import { DeleteButton } from "../button/DeleteButton";



export function ManageOptions() {
  const { options, loadingOptions, sending, deleting, deleteOption } = manageRestaurantStore();
  const { setElement } = useTempStorage();
  const { openModal } = useModalStore();

  if (loadingOptions) return <SkeletonTable rows={4} columns={2} />;

  if (!options || options.length === 0) {
    return <NothingHere height="150" width="150" text="No hay modificadores disponibles" />;
  }

  const listItems = options.map((record: any) => (
    <li key={record.id} className="flex justify-between items-center px-4 py-2.5 hover:bg-bg-subtle text-text-base text-sm transition-colors">
      <span className="clickeable" onClick={() => { openModal("optionSelected"); setElement("optionSelected", record); }}>{record?.name}</span>
      <span className="flex justify-center">
        {deleting || sending
          ? <AiOutlineLoading size={18} className="animate-spin text-text-muted" />
          : <DeleteButton id={record.id} url={`restaurant/options`} disabled={deleting || sending} text="¿Estas seguro de eliminar esta opción?" onDeleteConfirm={deleteOption} />
        }
      </span>
    </li>
  ));

  return (
    <div className="mx-4">
      <div className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">
        <div className="px-4 py-2 bg-bg-subtle/60 border-b border-bg-subtle">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Modificadores Agregados</span>
        </div>
        <ul className="divide-y divide-bg-subtle">
          {listItems}
        </ul>
      </div>
    </div>
  );
}
