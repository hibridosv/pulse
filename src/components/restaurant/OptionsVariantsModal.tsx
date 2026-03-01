"use client";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { URL } from '@/constants';
import manageRestaurantStore from "@/stores/restaurant/manageRestaurantStore";
import useTempStorage from "@/stores/useTempStorage";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";
import { DeleteButton } from "../button/DeleteButton";


export interface OptionsVariantsModalI {
  onClose: () => void;
  isShow: boolean;
}


export function OptionsVariantsModal(props: OptionsVariantsModalI) {
  const { onClose, isShow } = props;
  const { sending, deleting, deleteOption } = manageRestaurantStore()
  const { getElement, clearElement } = useTempStorage();
  const optionSelected = getElement("optionSelected");


  const isDeleting = optionSelected?.variants?.length > 2;
 
  const listVariants = optionSelected && optionSelected?.variants?.map((variant: any) => {
    return (
      <div key={variant.id} className="flex justify-between p-3 hover:bg-blue-50 hover:red-blue-800">
        <Image loader={({ src, width, quality }) => `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`} src={variant?.image || "default.png"} alt="Icono de la variante" width={40} height={40} className="rounded-full mr-2" />
        <span className="cursor-default text-left">{variant?.name}</span>  
        <span className="flex justify-center">
          { deleting || sending ? <AiOutlineLoading size={24} className="animate-spin" /> : 
            <DeleteButton id={variant.id} urlFull={`restaurant/options/${variant.id}/variants`} disabled={deleting || sending || !isDeleting } text="¿Estas seguro de eliminar esta variante?" onDeleteConfirm={deleteOption} onDelete={() => {onClose(); clearElement('optionSelected')}} />
          }
        </span>
      </div>
    )
  })


  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle={optionSelected?.name ?? "Variantes"} closeOnOverlayClick={true} >
      <Modal.Body>
      <div className="mx-4">
          <div className="bg-bg-base rounded-lg border border-bg-subtle/80">
                <ul className=" divide-bg-subtle">
                  { listVariants}
                </ul>
          </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} />
      </Modal.Footer>
    </Modal>
  );

}
