'use client';

import { NothingHere } from "@/components/NothingHere";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import useModalStore from "@/stores/modalStorage";
import manageRestaurantStore from "@/stores/restaurant/manageRestaurantStore";
import useTempStorage from "@/stores/useTempStorage";
import { AiOutlineLoading } from "react-icons/ai";
import { DeleteButton } from "../button/DeleteButton";



export function ManageOptions() {
  const { options, loadingOptions, sending, deleting, deleteOption } = manageRestaurantStore()
  const { setElement } = useTempStorage();
  const { openModal } = useModalStore();


  if(loadingOptions) return <SkeletonTable rows={4} columns={2} />

  if (!options || options.length === 0) {
    return <NothingHere height="150" width="150" text="No hay modificadores disponibles" />;
  }


  const listItems = options.map((record: any) =>{
    return (
            <div key={record.id} >
                <li className="flex justify-between p-3 hover:bg-blue-50 hover:red-blue-800">
                    <span className="clickeable" onClick={()=>{ openModal("optionSelected"); setElement("optionSelected", record)}}>{record?.name}</span>  
                    <span className="flex justify-center">
                    { deleting || sending ? <AiOutlineLoading size={24} className="animate-spin" /> : 
                      <DeleteButton id={record.id} url={`restaurant/options`} disabled={deleting || sending } text="¿Estas seguro de eliminar esta opción?" onDeleteConfirm={deleteOption} />
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
               <div className="flex font-semibold p-3">Modificadores Agregados</div>
              {listItems}
            </ul>
      </div>
    </div>
  );
}
