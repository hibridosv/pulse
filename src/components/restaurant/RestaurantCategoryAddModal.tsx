"use client";
import { Button, Preset } from "@/components/button/button";
import Modal from "@/components/modal/Modal";
import { URL } from '@/constants';
import useModalStore from "@/stores/modalStorage";
import manageRestaurantStore from "@/stores/restaurant/manageRestaurantStore";
import useTempStorage from "@/stores/useTempStorage";
import Image from "next/image";
import { useForm } from "react-hook-form";


export interface RestaurantCategoryAddModalI {
  onClose: () => void;
  isShow: boolean;
}




export function RestaurantCategoryAddModal(props: RestaurantCategoryAddModalI) {
  const { onClose, isShow } = props;
  const { register, handleSubmit, resetField, setFocus } = useForm();
  const {  getElement } = useTempStorage();
  const selectedImage = getElement("productImageCategory") || "default.png";
  const { openModal } = useModalStore();
  const { addCategory, sending } = manageRestaurantStore();

  const onSubmit = async (data: any) => {
        data.img = selectedImage;
        const success = await addCategory("restaurant/products/category", data);
        if (success) {
          resetField("name");
          onClose();
        }
  }

  const imageLoader = ({ src, width, quality }: any) => {
      return `${URL}/images/ico/${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Seleccione una imagen" closeOnOverlayClick={true} >
      <Modal.Body>
        <div className="mx-1">
      <form className="max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)} >

            <div className="w-full px-3 mb-4">
              <label htmlFor="name" className="input-label" >Nombre de la categoría</label>
              <input {...register("name", { required: true })} className="input w-full" />
            </div>
            
            <div className="my-4 flex justify-center">
             <div className="input-label">Seleccionar Imagen</div>
            </div>
            <div className="w-full mb-4 px-3 flex justify-center">
                <div className="clickeable" onClick={()=> openModal("showImagesCategoryModal")}>
                    <Image loader={imageLoader} src={selectedImage} alt="Icono de imagen" width={96} height={96} className="drop-shadow-lg rounded-md" />
                </div>
            </div>
            <div className="flex justify-center">
            <Button type="submit" disabled={sending} preset={sending ? Preset.saving : Preset.save} />
            </div>
      </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} disabled={sending} />
      </Modal.Footer>
    </Modal>
  );

}
