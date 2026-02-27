'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import { URL } from '@/constants';
import manageRestaurantStore from "@/stores/restaurant/manageRestaurantStore";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";
import { DeleteButton } from "../button/DeleteButton";



export function ManageCategories() {
  const { categories, loadingCategories, sending, deleteCategory, deleting} = manageRestaurantStore()

  
  if(loadingCategories) return <SkeletonTable rows={4} columns={2} />

  if (!categories || categories.length === 0) {
    return <NothingHere height="150" width="150" text="No hay categorías disponibles" />;
  }

  const listItems = categories.map((record: any) =>{
    return (
            <div key={record.id} >
                <li className="flex justify-between p-3 hover:bg-blue-50 hover:red-blue-800">
                    <Image loader={({ src, width, quality }) => `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`} src={record?.img || "default.png"} alt="Icono de categoría" width={24} height={24} className="rounded-full mr-2" />
                    <span className="cursor-default">{record?.name}</span>  
                    <span className="flex justify-center">
                    { deleting || sending ? <AiOutlineLoading size={24} className="animate-spin" /> : 
                     <DeleteButton id={record.id} url={`categories`} disabled={deleting || record.principal == 1 || sending } text="¿Estas seguro de eliminar esta categoría?" onDeleteConfirm={deleteCategory} />
                     }
                    </span>
                </li>
            </div>
          );
  } );

  return (
    <div className="mx-4">
      <div className="bg-bg-base rounded-lg border border-bg-subtle/80">
            <ul className=" divide-bg-subtle">
              <li className="flex font-semibold p-3">Categorias Agregadas</li>
              {listItems}
            </ul>
      </div>
    </div>
  );
}
