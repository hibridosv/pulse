'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { URL } from '@/constants';
import manageRestaurantStore from "@/stores/restaurant/manageRestaurantStore";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";
import { DeleteButton } from "../button/DeleteButton";



export function ManageCategories() {
  const { categories, loadingCategories, sending, deleteCategory, deleting } = manageRestaurantStore();

  if (loadingCategories) return <SkeletonTable rows={4} columns={2} />;

  if (!categories || categories.length === 0) {
    return <NothingHere height="150" width="150" text="No hay categorías disponibles" />;
  }

  const listItems = categories.map((record: any) => (
    <li key={record.id} className="flex justify-between items-center px-4 py-2.5 hover:bg-bg-subtle text-text-base text-sm transition-colors">
      <div className="flex items-center gap-2">
        <Image loader={({ src, width, quality }) => `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`} src={record?.img || "default.png"} alt="Icono de categoría" width={24} height={24} className="rounded-full" />
        <span>{record?.name}</span>
      </div>
      <span className="flex justify-center">
        {deleting || sending
          ? <AiOutlineLoading size={18} className="animate-spin text-text-muted" />
          : <DeleteButton id={record.id} url={`categories`} disabled={deleting || record.principal == 1 || sending} text="¿Estas seguro de eliminar esta categoría?" onDeleteConfirm={deleteCategory} />
        }
      </span>
    </li>
  ));

  return (
    <div className="mx-4">
      <div className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">
        <div className="px-4 py-2 bg-bg-subtle/60 border-b border-bg-subtle">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Categorias Agregadas</span>
        </div>
        <ul className="divide-y divide-bg-subtle">
          {listItems}
        </ul>
      </div>
    </div>
  );
}
