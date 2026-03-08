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
 
  const listVariants = optionSelected && optionSelected?.variants?.map((variant: any) => (
    <li key={variant.id} className="flex justify-between items-center px-4 py-2.5 hover:bg-bg-subtle text-text-base text-sm transition-colors">
      <div className="flex items-center gap-2">
        <Image loader={({ src, width, quality }) => `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`} src={variant?.image || "default.png"} alt="Icono de la variante" width={32} height={32} className="rounded mr-2" />
        <span>{variant?.name}</span>
      </div>
      <span className="flex justify-center">
        {deleting || sending
          ? <AiOutlineLoading size={18} className="animate-spin text-text-muted" />
          : <DeleteButton id={variant.id} urlFull={`restaurant/options/${variant.id}/variants`} disabled={deleting || sending || !isDeleting} text="¿Estas seguro de eliminar esta variante?" onDeleteConfirm={deleteOption} onDelete={() => { onClose(); clearElement('optionSelected'); }} />
        }
      </span>
    </li>
  ))


  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle={optionSelected?.name ?? "Variantes"} closeOnOverlayClick={true} >
      <Modal.Body>
      <div className="bg-bg-content rounded-lg border border-bg-subtle overflow-hidden">
        <ul className="divide-y divide-bg-subtle">
          {listVariants}
        </ul>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} />
      </Modal.Footer>
    </Modal>
  );

}
